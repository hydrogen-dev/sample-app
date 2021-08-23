# Android Sample App Installation

1. Download the repo
2. Open Android Studio - File - Open - "sample-app" and choose the Android folder 
3. Wait until Android Studio initialises gradle build and other dependencies 
4. Run - Run 'app'
5. In file MainActivity (app - java - com.hydrogenplatform.cards - MainActivity) paste valid
```
val publicKey="your publicKey"
val appKey="your appKey"
```
To change modules
1. In file `MainActivity` (app - java - com.hydrogenplatform.cards - MainActivity) change import `import com.hydrogenplatform.card_modules.Balance` to e.g. `import com.hydrogenplatform.card_modules.Admin` and also change type of `private lateinit var cardIssuance:Balance` to `private lateinit var cardIssuance:Admin`
2. In file `activity_main.xml` (app - res - layout - activity_main.xml) change module e.g. from `com.hydrogenplatform.card_modules.Issuance` to `com.hydrogenplatform.card_modules.Admin`
