package com.hydrogenplatform.cards

import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.hydrogenplatform.card_modules.*

open class CardModules: AppCompatActivity() {
    private lateinit var cardActivation: Activation
    private lateinit var cardAdmin: Admin
    private lateinit var cardBalance: Balance
    private lateinit var cardControls: Controls
    private lateinit var cardFunding: Funding
    private lateinit var cardImage: Image
    private lateinit var cardIssuance: Issuance
    private lateinit var cardSpending: Spending
    private lateinit var cardStatements: Statements
    private lateinit var cardTransactions: Transactions

    val MODULES_NAMES: Array<String> = arrayOf(
        "card_activation",
        "card_admin",
        "card_balance",
        "card_controls",
        "card_funding",
        "card_image",
        "card_issuance",
        "card_spending",
        "card_statements",
        "card_transactions"
    )

    companion object {}

    fun initializeModules() {
        cardActivation = findViewById(R.id.activation)
        cardAdmin = findViewById(R.id.admin)
        cardBalance = findViewById(R.id.balance)
        cardControls = findViewById(R.id.controls)
        cardFunding = findViewById(R.id.funding)
        cardImage = findViewById(R.id.image)
        cardIssuance = findViewById(R.id.issuance)
        cardSpending = findViewById(R.id.spending)
        cardStatements = findViewById(R.id.statements)
        cardTransactions = findViewById(R.id.transactions)
    }

    fun showComponent(appName: String, publicKey: String,
                              appToken: String, cardId: String = "") =
        when (appName) {
            "card_activation" -> cardActivation.showComponent(publicKey, appToken, cardId)
            "card_admin" -> cardAdmin.showComponent(publicKey, appToken)
            "card_balance" -> cardBalance.showComponent(publicKey, appToken, cardId)
            "card_controls" -> cardControls.showComponent(publicKey, appToken, cardId)
            "card_funding" -> cardFunding.showComponent(publicKey, appToken, cardId)
            "card_image" -> cardImage.showComponent(publicKey, appToken, cardId)
            "card_issuance" -> cardIssuance.showComponent(publicKey, appToken)
            "card_spending" -> cardSpending.showComponent(publicKey, appToken, cardId)
            "card_statements" -> cardStatements.showComponent(publicKey, appToken, cardId)
            "card_transactions" ->  cardTransactions.showComponent(publicKey, appToken, cardId)
            else -> null
        }

    fun makeVisible(appName: String) =
        when (appName) {
            "card_activation" -> cardActivation.visibility = View.VISIBLE
            "card_admin" -> cardAdmin.visibility = View.VISIBLE
            "card_balance" -> cardBalance.visibility = View.VISIBLE
            "card_controls" -> cardControls.visibility = View.VISIBLE
            "card_funding" -> cardFunding.visibility = View.VISIBLE
            "card_image" -> cardImage.visibility = View.VISIBLE
            "card_issuance" -> cardIssuance.visibility = View.VISIBLE
            "card_spending" -> cardSpending.visibility = View.VISIBLE
            "card_statements" -> cardStatements.visibility = View.VISIBLE
            "card_transactions" -> cardTransactions.visibility = View.VISIBLE
            else -> null
        }
}