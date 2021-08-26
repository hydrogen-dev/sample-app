package com.hydrogenplatform.cards

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.hydrogenplatform.card_modules.Balance

class MainActivity : AppCompatActivity() {
    private lateinit var cardIssuance: Balance

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        cardIssuance = findViewById(R.id.issuance)

        val publicKey="your publicKey"
        val appKey="your appKey"

        cardIssuance.showComponent(publicKey,appKey)
    }
}