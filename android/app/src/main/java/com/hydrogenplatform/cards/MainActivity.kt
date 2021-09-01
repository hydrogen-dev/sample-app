package com.hydrogenplatform.cards

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.Toast

import com.github.kittinunf.fuel.Fuel
import com.github.kittinunf.fuel.core.Headers
import com.github.kittinunf.result.Result
import com.github.kittinunf.fuel.gson.responseObject
import android.content.Intent


data class TokenResponse(var access_token:String = "")

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_main)

        val email = findViewById<EditText>(R.id.email)
        val password = findViewById<EditText>(R.id.password)
        val loginButton = findViewById<Button>(R.id.loginButton)

        loginButton.setOnClickListener {

            val emailValue = email.text.toString()
            val passwordValue = password.text.toString()
            val publicKey = "lmdo8mwkd3kurgc8otos1ykz6a"
            val aggregationAccountId = "a6a762d0-77cf-48a3-9cb4-9df94023dbe6"

            val creds = okhttp3.Credentials.basic("TestUser", "tugxwe6irx9hjjln8wr1hgm6x7")



            Fuel.post("https://sandbox.hydrogenplatform.com/authorization/v1/oauth/token?grant_type=password&username=${emailValue}&password=${passwordValue}")
                .header(Headers.AUTHORIZATION, creds)
                .responseObject<TokenResponse> { _, _, res ->
                    when (res) {
                        is Result.Failure -> {
                            val ex = res.getException()
                            Toast.makeText(this, "fail3, ${ex}", Toast.LENGTH_LONG).show()
                        }
                        is Result.Success -> {
                            val userToken = res.get().access_token

                            Log.i("TOKEN", userToken)

                            val intent = Intent(this, ModulesActivity::class.java)

                            intent.putExtra(ModulesActivity.TOKEN, userToken);
//
                            startActivity(intent)

                        }
                    }
                }
        }

    }
}