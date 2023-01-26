package com.hydrogenplatform.cards

import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.*
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
        dropDownActions()

        val userToken = intent.getStringExtra(TOKEN);

        sendGet(
            "card_balance",
            userToken.toString(),
            publicKey
        )
    }

    private fun dropDownActions () {
        val modulesList = resources.getStringArray(R.array.modules_names)
        val adapter: ArrayAdapter<String> = ArrayAdapter<String>(this, R.layout.dropdown_items, modulesList)
        val dropdown = findViewById<Spinner>(R.id.spinner)

        dropdown.adapter = adapter;

        var selectedWidget = modulesList[0];

        dropdown.setOnItemSelectedListener(object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(
                parent: AdapterView<*>?,
                itemSelected: View, position: Int, selectedId: Long
            ) {
                val selectedItem = parent?.getItemAtPosition(position).toString()

                if (selectedItem !== selectedWidget) {
                    val prevModule = getWebview(selectedWidget)
                    if (prevModule !== null) {
                        prevModule.visibility = View.GONE
                    }

                    val nowModule = getWebview(selectedItem)
                    if (nowModule !== null) {
                        nowModule.visibility = View.VISIBLE
                        selectedWidget = selectedItem

                        val userToken = intent.getStringExtra(TOKEN);
                        val moduleName = getWebviewAlias(selectedItem)

                        if (ADMIN_MODULES.contains(moduleName.toString())) {
                            getAdminCredentials() { adminToken ->
                                sendGet(moduleName.toString(), adminToken, publicKey)
                            }
                        } else {
                            sendGet(
                                moduleName.toString(),
                                userToken.toString(),
                                publicKey
                            )
                        }
                    }
                }
            }

            override fun onNothingSelected(parent: AdapterView<*>?) {}
        })
    }
}

