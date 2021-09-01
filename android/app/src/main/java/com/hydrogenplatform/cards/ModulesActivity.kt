package com.hydrogenplatform.cards

import android.os.Bundle
import android.util.Log
import android.widget.Toast
import com.github.kittinunf.fuel.Fuel
import com.github.kittinunf.fuel.core.Headers
import com.github.kittinunf.fuel.gson.responseObject
import com.github.kittinunf.result.Result

data class AppResponse(var app_token:String = "")

class ModulesActivity : CardModules() {
    companion object {
        const val TOKEN = "token"
    }

    private var constants = Constants()
    private val envLink = constants.envLink
    private val publicKey = constants.publicKey

    private fun sendGet(appName: String, token: String, publicKey: String): String {

        val token = "Bearer $token"

        Fuel.get("${envLink}/admin/v1/app_token?app_name=$appName")
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
                        makeVisible(appName);
                        showComponent(appName, publicKey, data.app_token)
                    }
                }
            }

        return ""
    }


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.modules_main)

        initializeModules()

        val userToken = intent.getStringExtra(TOKEN);

        for(moduleName in MODULES_NAMES){
            if (userToken != null) {
                sendGet(
                    moduleName,
                    userToken,
                    publicKey
                )
            }
        }
    }
}

