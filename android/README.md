# Android Sample App Installation

1. Download the sample-app repo
2. Download and install [Android Studio](https://developer.android.com/studio)
3. Open Android Studio -> File -> Open -> "sample-app" and choose the Android folder 
4. Wait until Android Studio initialises gradle build and other dependencies 
5. Run -> Run 'Cards.app'
6. In file MainActivity (app -> java -> com.hydrogenplatform.cards -> MainActivity) replace lines 16-17 with your keys
```
val publicKey="your OAuth public-key"
val appKey="your authenticated app-token"
```
The sample app will display the Card Issuance by default. To change modules
1. In file `MainActivity` (app -> java -> com.hydrogenplatform.cards -> MainActivity) change line 5 import `import com.hydrogenplatform.card_modules.Issuance` to e.g. `import com.hydrogenplatform.card_modules.Balance` and also change line 8 `private lateinit var cardIssuance:Issuance` to `private lateinit var cardIssuance:Balance`
2. In file `activity_main.xml` (app -> res -> layout -> activity_main.xml) change module e.g. from `com.hydrogenplatform.card_modules.Issuance` to `com.hydrogenplatform.card_modules.Balance`
