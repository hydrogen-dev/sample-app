package com.hydrogenplatform.cards


import android.annotation.SuppressLint
import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.util.Base64
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.github.kittinunf.fuel.Fuel
import com.github.kittinunf.fuel.core.Headers
import com.github.kittinunf.fuel.gson.responseObject
import com.github.kittinunf.result.Result
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import java.security.KeyFactory
import java.security.NoSuchAlgorithmException
import java.security.PrivateKey
import java.security.spec.InvalidKeySpecException
import java.security.spec.PKCS8EncodedKeySpec
import java.util.*


data class TokenResponse(var access_token:String = "")

class MainActivity : AppCompatActivity() {

    private val envLink = Constants().envLink
    private val creds = Constants().creds
    private val authType = Constants().authType
    private val clientId = Constants().clientId
    private val myPrivateKey = Constants().privateKey
    private val hour = 60*60*1000

    fun JWTGenerator(sub: String): String? {
        var retStr: String? = null
        val encodedKey: ByteArray = Base64.decode(myPrivateKey, Base64.DEFAULT)
        val keySpec = PKCS8EncodedKeySpec(encodedKey)
        try {
            val kf: KeyFactory = KeyFactory.getInstance("RSA")
            val privKey: PrivateKey = kf.generatePrivate(keySpec)
            retStr = Jwts.builder()
                .claim("iss", clientId)
                .claim("sub", sub)
                .claim("exp", Date().time + hour)
                .claim("iat", Date().time)
                .signWith(privKey, SignatureAlgorithm.RS512)
                .compact()
        } catch (e: NoSuchAlgorithmException) {
            e.printStackTrace()
        } catch (e: InvalidKeySpecException) {
            e.printStackTrace()
        }
        return retStr
    }

    fun authRequest(
        authLink: String,
        Headers: Map<String, String>,
        startRequestCallback: () -> Unit = fun() {},
        onError: (message: String) -> Unit = fun(_) {}
    ) {
        Fuel.post("${envLink}/authorization/v1/${authLink}")
            .header(Headers)
            .responseObject<TokenResponse> { _, _, res ->
                startRequestCallback()
                when (res) {
                    is Result.Failure -> {
                        val ex = res.getException()
                        val message = ex.message.toString()
                        Log.i("Errror", message)

                        onError(message)
                    }
                    is Result.Success -> {
                        val userToken = res.get().access_token
                        val intent = Intent(this, ModulesActivity::class.java)

                        intent.putExtra(ModulesActivity.TOKEN, userToken);
                        startActivity(intent)
                    }
                }
            }
    }

    @SuppressLint("SetTextI18n")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val email = findViewById<EditText>(R.id.email)
        val password = findViewById<EditText>(R.id.password)
        val loginButton = findViewById<Button>(R.id.loginButton)
        val errorDescription = findViewById<TextView>(R.id.error_description)

        errorDescription.visibility = View.INVISIBLE
        errorDescription.text = ""

            loginButton.setOnClickListener {
                var authLink: String;
                var MapHeaders: Map<String, String>;
                val emailValue = email.text.toString()
                val passwordValue = password.text.toString()


                email.setBackgroundResource(R.drawable.edit_text_border)
                email.setTextColor(Color.BLACK)

                password.setBackgroundResource(R.drawable.edit_text_border)
                password.setTextColor(Color.BLACK)

                errorDescription.visibility = View.INVISIBLE
                errorDescription.text = ""

                loginButton.text = "Loading..."

                if (authType === "client-token") {
                    authLink = "client-token"
                    val clientToken = JWTGenerator(emailValue)
                    MapHeaders = mapOf(Headers.AUTHORIZATION to creds, "client-token" to "Bearer ${clientToken}")
                } else {
                    authLink = "oauth/token?grant_type=password&username=${emailValue}&password=${passwordValue}"
                    MapHeaders = mapOf(Headers.AUTHORIZATION to creds)
                }

                authRequest(
                    authLink,
                    MapHeaders,
                    fun() { loginButton.text = "Login" },
                    fun(message) {
                        email.setBackgroundResource(R.drawable.error_text_border)
                        email.setTextColor(Color.RED)

                        password.setBackgroundResource(R.drawable.error_text_border)
                        password.setTextColor(Color.RED)

                        errorDescription.visibility = View.VISIBLE
                        errorDescription.text = "Something went wrong: $message"
                    }
                )
        }

    }
}
