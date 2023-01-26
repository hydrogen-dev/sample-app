# iOS Sample App

## Technical Requirements

XCode 12.4+

## Configuration

You can change the environment and credentials at `CardsModules/Config.swift`

```
public let ENV = "api" // set to `api` (production) or `sandbox`
public let publicKey = "" / Public Key found on the API Credentials page of the account portal
public let client_id = "" // OAuth `client_id` found on the API Credentials page of the account portal
public let client_secret = "" // OAuth `client_secret` found on the API Credentials page of the account portal

public let authType = "" // set to `client-token` to authorize via a custom <a href="https://www.hydrogenplatform.com/docs/nucleus/v1/#Custom-Client-Token" target="_blank">Client-Token</a>; if set to `password` or empty default is OAuth Password grant

public let privateKey = "" // if using a custom Client-Token, private key from public/private key pair that will be used for JWT creation
```

## Installation

1. Download the `sample-app` repo and navigate to the iOS folder.
2. In the terminal Run the command `pod install`
3. Open the file `CardsModules.xcworkspace` in Xcode.
4. Run the project.

### NOTE

- For running at simulator you should add to `Excluded Architectures` `arm64` in Project/Target > `Build Settings`, but for device you shouldn't add this!
- For `M1 chip` you can have an issue in launching application. In that case you need to do the following:
  1. In the file `Podfile` replace `use_frameworks!` to `use_frameworks! :linkage => :static`
  2. In Xcode go to `Product -> Clean Build Folder`
  3. In Simulator go to `Device - Erase All Content and Settings`
