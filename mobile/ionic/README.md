# Ionic Sample App

## Technical Requirements

- [Node.js](https://nodejs.org/): v14.15 and above
- Android: API 28/Version 9 and above
- IOS: Xcode Command Line Tools, Cocoapods v1.10.1 and above
- Ionic: `sudo npm install -g ionic`
- Ionic Native: `sudo npm install @ionic-native/core --save`
- Cordova: `sudo npm install -g cordova`

## Configuration

You can change the environment and credentials at `src/constants/index.ts`

```js
export const clientId = "";  // OAuth `client_id` found on the API Credentials page of the account portal
export const clientSecret = "";  // OAuth `client_secret` found on the API Credentials page of the account portal
export const publicKey = "";  // Public Key found on the API Credentials page of the account portal
export const env = "api"; // set to `api` (production) or `sandbox`

export const isClientTokenOAuth = true; // set to 'false' to authorize via OAuth Password grant or 'true' to authorize via a custom <a href="https://www.hydrogenplatform.com/docs/nucleus/v1/#Custom-Client-Token" target="_blank">Client-Token</a>
export const privateKey = ""; // if using a custom Client-Token, private key from public/private key pair that will be used for JWT creation
```

## Installation

1. Download the `sample-app` repo and navigate to the Ionic folder.
2. Run `npm install`. If you have errors with package `ionic_cards.tgz` you need to install it with `--force` flag
3. Install Capacitor CLI for devices `npm i @capacitor/ios npm install @capacitor/android`
4. Start the node server `npm start`
5. Build the project by running `ionic build`
   (If You make changes in your project you can build again using `ionic build`)
6. Sync your project and run `npx cap sync android` and then `npx cap sync ios`
7. Now you can run the project through Xcode for iOS or Android Studio
