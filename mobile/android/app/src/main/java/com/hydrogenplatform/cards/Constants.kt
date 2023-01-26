package com.hydrogenplatform.cards

class Constants {
    val env = "api" // "api", "sandbox"
    val publicKey = ""
    val envLink = "https://${env}.hydrogenplatform.com"
    val clientId = ""
    val clientSecret = ""
    val creds = okhttp3.Credentials.basic(clientId, clientSecret)
    val authType = "" // if set "client-token", then authorization will be by "client-token"-request
    val privateKey = ""
}
