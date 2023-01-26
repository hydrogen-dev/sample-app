# Xamarin - Android Sample App

## Configuration

You can change the environment and credentials at `xamarin(Android)/hydrogen/Constants.cs`

```cs
public const string ENV = "api"; // set to `api` (production) or `sandbox`
public const string client_id = ""; // OAuth `client_id` found on the API Credentials page of the account portal
public const string client_secret = ""; // OAuth `client_secret` found on the API Credentials page of the account portal
public const string publicKey = ""; // Public Key found on the API Credentials page of the account portal

public const string OAuth = 'client-token'; // set to `client-token` to authorize via a custom <a href="https://www.hydrogenplatform.com/docs/nucleus/v1/#Custom-Client-Token" target="_blank">Client-Token</a>; if set to `password` or empty default is OAuth Password grant
public const string privateKey = ''; // if using a custom Client-Token, private key from public/private key pair that will be used for JWT creation
```

## Installation (using existing .aar file)

1. In Visual Studio -> open -> Hydrogen.binding -> Hydrogen.binding.csproj

2. Right-click on hydrogen -> Build Hydrogen.binding

3. Right-click on hydrogen -> Run Project

## Installation (from scratch, bind your own .aar file)

1. Open Visual Studio for Mac and create a new Xamarin.Android Binding Library project, give it a name, in this case`Hydrogen.Binding` and complete the wizard. The Xamarin.Android binding template is located by the following path: Android -> Library -> Binding Library.
2. Add .aar file to the created project into Jars folder (drag and drop the archive into the Jars folder).
3. Change the build action of the .aar file. Right click on `.aar` -> Click Properties -> Change Build Action from `None` to `LibraryProjectZip`.
4. Add a reference to the `Xamarin.Kotlin.StdLib`. Right click on `Packages -> Manage NuGet Packages > Search for Xamarin.Kotlin.StdLib`. Click the checkbox and press the "Add Package" button.
5. Right click on `Hydrogen.Binding` -> `Build Hydrogen.binding` or press the "Build" icon on the top navigation
6. Create an empty Android App. With a right click `Hydrogen.Binding -> Add -> New project -> Android -> App`. Name your new app `Hydrogen` and create it.
7. In the new project right click on `References -> Add Reference`. There you need to choose `Hydrogen.Binding` library.
8. Add a reference to the `Xamarin.Kotlin.StdLib`. Right click on `Packages -> Manage NuGet Packages -> Search for Xamarin.Kotlin.StdLib`. Click the checkbox and press the "Add Package" button.
9. Now you need to initialize Hydrogen components: Go to `Hydrogen -> Resources -> layout -> activity_main.xml` and initialize any widget that you wish.
As an example we initialize the Card Issuance widget :
`<com.hydrogenplatform.card_modules.Issuance android:id="@+id/issuance" android:layout_width="match_parent" android:layout_height="wrap_content" android:layout_marginHorizontal="20dp" android:layout_marginTop="16dp" android:nestedScrollingEnabled="true" />`
10. Update the minimum Android Version from Android 5.0 (API level 21) to Android 6.0 (API Level 23) in `Hydrogen -> Properties -> AndroidManifest.xml`
11. Build project : Right click on `Hydrogen` -> `Build Hydrogen`
12. Run project : Right click on `Hydrogen` -> `Run Project`
