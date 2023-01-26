# Xamarin - .NET Sample App

## Configuration

You can change the environment and credentials at `xamarin(.Net)/HydrogenCards/Constants.cs`

```cs
public const string ENV = "sandbox"; // set to `api` (production) or `sandbox`
public const string client_id = ""; // OAuth `client_id` found on the API Credentials page of the account portal
public const string client_secret = ""; // OAuth `client_secret` found on the API Credentials page of the account portal
public const string publicKey = ""; // Public Key found on the API Credentials page of the account portal

public const bool isClientTokenOAuth = true; // set to 'false' to authorize via OAuth Password grant or 'true' to authorize via a custom <a href="https://www.hydrogenplatform.com/docs/nucleus/v1/#Custom-Client-Token" target="_blank">Client-Token</a>
public const string privateKey = ''; // if using a custom Client-Token, private key from public/private key pair that will be used for JWT creation

```

## Installation

1. In Visual Studio -> open -> `xamarin(.Net)` -> `HydrogenCards.sln`
2. Add a reference to the `HydrogenCards`. Right click on `Dependencies -> Add a reference... -> .Net Assembly`. Click the `browse` and chose `CardNet.dll` in `bindingLibrary(.Net)` folder. Press `OK`.
3. Run project `Run -> Run without debugging`
