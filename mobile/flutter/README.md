# Flutter Sample App

## Technical Requirements

- [Flutter](https://docs.flutter.dev/get-started/install)

## Configuration

You can change the environment and credentials at `lib/constants.dart`

```js
const String clientId = ''; // OAuth `client_id` found on the API Credentials page of the account portal
const String clientSecret = ''; // OAuth `client_secret` found on the API Credentials page of the account portal
const String publicKey = ''; // Public Key found on the API Credentials page of the account portal

String url() {
  return '${env['api']}.hydrogenplatform.com'; // set to `sandbox` or `api` (production) in [] brackets
}

const bool isClientTokenOAuth = true; // set to 'false' to authorize via OAuth Password grant or 'true' to authorize via a custom <a href="https://www.hydrogenplatform.com/docs/nucleus/v1/#Custom-Client-Token" target="_blank">Client-Token</a>
const String privateKey = ''; // if using a custom Client-Token, private key from public/private key pair that will be used for JWT creation
```

Change the environment at `lib/main.dart`

```js
routes: {
      '/cards': (context) =>
          DropDown(publicKey, clientId, clientSecret, env['api']), //use `sandbox` or `api` (production) in [] brackets
    },
```

## Installation

1. Download the `sample-app` repo and navigate to the Flutter folder.
2. Run `flutter doctor` to check environment and display a report of the status of your Flutter installation.
3. Run `flutter pub get` to install packages.
4. Run simulator in IOS (Xcode > Open Developer Tool > Simulator) or Android (Android Studio > More Actions Ellipsis > AVD Manager), or connect a real device.
5. Start the application with `flutter run`
