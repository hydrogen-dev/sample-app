# Android Sample App

## Technical Requirements

API 28/Version 9 and above

## Configuration

You can change the environment and credentials at `app/src/main/java/com/hydrogenplatform/cards/Constants.kt`

```java
class Constants {
  val env = "api" // set to `api` (production) or `sandbox`
  val publicKey = ""  // Public Key found on the API Credentials page of the account portal
  val envLink = "https://${env}.hydrogenplatform.com"
  val clientId = ""  // OAuth `client_id` found on the API Credentials page of the account portal
  val clientSecret = "" // OAuth `client_secret` found on the API Credentials page of the account portal
  val creds = okhttp3.Credentials.basic(clientId, clientSecret)
  val authType = "" // set to `client-token` to authorize via a custom <a href="https://www.hydrogenplatform.com/docs/nucleus/v1/#Custom-Client-Token" target="_blank">Client-Token</a>; if set to `password` or empty default is OAuth Password grant
  val privateKey = "" // if using a custom Client-Token, private key from public/private key pair that will be used for JWT creation
}
```

## Installation

1. Download the `sample-app` repo
2. Download and install [Android Studio](https://developer.android.com/studio)
3. Open Android Studio -> File -> Open -> "sample-app" and choose the Android folder
4. Wait until Android Studio initializes gradle build and other dependencies
5. Run -> Run 'Cards.app'
