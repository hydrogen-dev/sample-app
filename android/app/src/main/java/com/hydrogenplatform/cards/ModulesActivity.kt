package com.hydrogenplatform.cards

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

import android.util.Log
import android.widget.Toast
import com.github.kittinunf.fuel.Fuel
import com.github.kittinunf.fuel.core.Headers
import com.github.kittinunf.fuel.gson.responseObject
import com.github.kittinunf.result.Result
import com.hydrogenplatform.card_modules.Balance

data class AppResponse(var app_token:String = "")

class ModulesActivity : AppCompatActivity() {

    private lateinit var cardIssuance: Balance

    companion object {
        const val TOKEN = "token"
    }

    private fun sendGet(appName: String, token: String, cb: (appToken: String) -> Unit): String {

        val token =
            "Bearer $token"

        Log.i("BEA", token)

        Fuel.get("https://sandbox.hydrogenplatform.com/admin/v1/app_token?app_name=$appName")
            .header(
                Headers.AUTHORIZATION,
                token
            ).responseObject<Array<AppResponse>> { _, _, result ->

                when (result) {
                    is Result.Failure -> {
                        val ex = result.getException()
                        println(ex)
                        Log.i("RES", "err")

                        Toast.makeText(this, "fail", Toast.LENGTH_LONG).show()

                    }
                    is Result.Success -> {
                        Log.i("RR", "dsad")
                        val data = result.get()[0]
                        cb(data.app_token)

                    }
                }
            }

        return ""


    }


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.modules_main)

        cardIssuance = findViewById(R.id.issuance)

        val userToken = intent.getStringExtra(TOKEN);
        val publicKey = "lmdo8mwkd3kurgc8otos1ykz6a"

        Log.i("CHECK", userToken.toString())


        if (userToken != null) {
            sendGet(
                "card_balance",
                userToken
            ) { appToken ->
                cardIssuance.showComponent(
                    publicKey,
                    appToken,
                )
            }
        }

    }
}

