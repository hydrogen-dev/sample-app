# React Native Sample App

## Basic Requirements

Follow instructions for setting up the development environment from official documentation
https://reactnative.dev/docs/environment-setup

## Technical Requirements

- [Node.js](https://nodejs.org/): v14.0 and above
- Android: API 28/Version 9 and above
- IOS: Xcode Command Line Tools, Cocoapods v1.10.1 and above

## Configuration

You can change the environment and credentials at `src/constants.js`

```js
export const ENV = 'api'; // set to `api` (production) or `sandbox`
export const client_id = ''; // OAuth `client_id` found on the API Credentials page of the account portal
export const client_secret = ''; // OAuth `client_secret` found on the API Credentials page of the account portal
export const publicKey = ''; // Public Key found on the API Credentials page of the account portal
export const authType = ''; // set to `client-token` to authorize via a custom <a href="https://www.hydrogenplatform.com/docs/nucleus/v1/#Custom-Client-Token" target="_blank">Client-Token</a>; if set to `password` or empty default is OAuth Password grant
export const privateKey = ``; // if using a custom Client-Token, private key from public/private key pair that will be used for JWT creation

export const BASE_URL = `https://${ENV}.hydrogenplatform.com/`;
```

Also you **must** reinstall the `card-modules` package for needed environment.

## Installation

1. Download the `sample-app` repo
2. Navigate to `react-native` folder
3. Run `npm install` in the terminal to install required dependencies. If you receive errors, please make sure you have Node.js v14.0+ installed.
4. Stay in the `react-native` folder and run `npm start` to start metro server

### Android

1. Open Android Studio -> File -> Open -> "sample-app/react-native" and choose the `android` folder
2. Wait until Android Studio initializes gradle build and other dependencies
3. Run -> Run 'app'

### iOS

1. In a new terminal tab, navigate to the `ios` folder and run `pod install`. If you receive errors, please make sure you have both Command Line tools installed in XCode, and the latest version of Cocoapods `sudo gem install cocoapods`
2. In the `ios` folder, open the file `AwesomeProject.xcworkspace` in Xcode.
3. Run the project in an iOS Simulator and wait for the project to build successfully
