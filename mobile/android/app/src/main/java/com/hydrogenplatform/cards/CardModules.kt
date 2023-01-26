package com.hydrogenplatform.cards

import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.github.kittinunf.fuel.Fuel
import com.github.kittinunf.fuel.core.Headers
import com.github.kittinunf.fuel.gson.responseObject
import com.github.kittinunf.result.Result
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
    private lateinit var cardBudget: Budget
    private lateinit var cardCashFlow: CashFlow
    private lateinit var cardRewards: Rewards


    private var constants = Constants()
    private val envLink = constants.envLink
    private val creds = constants.creds
    private val env = constants.env

    val MODULES_NAMES: Array<String> = arrayOf(
        "card_activation",
        "card_balance",
        "card_controls",
        "card_funding",
        "card_image",
        "card_issuance",
        "card_spending",
        "card_statements",
        "card_transactions"
    )

    val ADMIN_MODULES: Array<String> = arrayOf(
        "card_admin",
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
        cardBudget = findViewById(R.id.budget)
        cardCashFlow = findViewById(R.id.cashFlow)
        cardRewards = findViewById(R.id.rewards)
    }

    fun getWebview(moduleName: String) =
        when (moduleName) {
            "Activation" -> cardActivation
            "Balance" -> cardBalance
            "Admin" -> cardAdmin
            "Issuance" -> cardIssuance
            "Statements" -> cardStatements
            "Spending" -> cardSpending
            "Funding" -> cardFunding
            "Controls" -> cardControls
            "Transactions" -> cardTransactions
            "Image" -> cardImage
            "Budget" -> cardBudget
            "Cash Flow" -> cardCashFlow
            "Rewards" -> cardRewards
            else -> null
        }

    fun getWebviewAlias(moduleName: String) =
        when (moduleName) {
            "Activation" -> "card_activation"
            "Balance" -> "card_balance"
            "Admin" -> "card_admin"
            "Issuance" -> "card_issuance"
            "Statements" -> "card_statements"
            "Spending" -> "card_spending"
            "Funding" -> "card_funding"
            "Controls" -> "card_controls"
            "Transactions" -> "card_transactions"
            "Image" -> "card_image"
            "Budget" -> "card_budget"
            "Cash Flow" -> "card_cash_flow"
            "Rewards" -> "card_rewards"
            else -> null
        }

    fun showComponent(appName: String, publicKey: String,
                              appToken: String, cardId: String = "") =
        when (appName) {
            "card_activation" -> cardActivation.showComponent(env, publicKey, appToken, cardId)
            "card_admin" -> cardAdmin.showComponent(env, publicKey, appToken)
            "card_balance" -> cardBalance.showComponent(env, publicKey, appToken, cardId)
            "card_controls" -> cardControls.showComponent(env, publicKey, appToken, cardId)
            "card_funding" -> cardFunding.showComponent(env, publicKey, appToken, cardId)
            "card_image" -> cardImage.showComponent(env, publicKey, appToken, cardId)
            "card_issuance" -> cardIssuance.showComponent(env, publicKey, appToken, cardId)
            "card_spending" -> cardSpending.showComponent(env, publicKey, appToken, cardId)
            "card_statements" -> cardStatements.showComponent(env, publicKey, appToken, cardId)
            "card_transactions" ->  cardTransactions.showComponent(env, publicKey, appToken, cardId)
            "card_budget" -> cardBudget.showComponent(env, publicKey, appToken)
            "card_cash_flow" -> cardCashFlow.showComponent(env, publicKey, appToken)
            "card_rewards" -> cardRewards.showComponent(env, publicKey, appToken)
            else -> null
        }

    fun getAdminCredentials(cb: (userToken: String) -> Unit) {

        Fuel.post("${envLink}/authorization/v1/oauth/token?grant_type=client_credentials")
            .header(Headers.AUTHORIZATION, creds)
            .responseObject<TokenResponse> { _, _, res ->
                when (res) {
                    is Result.Failure -> {
                        val ex = res.getException()

                        Toast.makeText(this, "fail3, ${ex}", Toast.LENGTH_LONG).show()
                    }
                    is Result.Success -> {
                        val userToken = res.get().access_token

                        cb(userToken)
                    }
                }
            }
    }
}