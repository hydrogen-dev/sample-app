import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';

import 'localHostServer.dart';
import 'cards.dart';

LocalhostServer localhostServer = new LocalhostServer();

class DropDown extends StatefulWidget {
  final String publicKey;
  final String cardId;
  final String clientId;
  final String clientSecret;
  final String env;

  DropDown(
      this.publicKey, this.clientId, this.clientSecret, this.env, this.cardId);

  @override
  _DropDownState createState() => _DropDownState();
}

class _DropDownState extends State<DropDown> {
  InAppWebViewController webView;
  String cardName = 'card_balance';
  Map data = {};

  @override
  Widget build(BuildContext context) {
    data = ModalRoute.of(context).settings.arguments;

    CardsState instanceCards = CardsState(
        cardName: cardName,
        clientId: widget.clientId,
        clientSecret: widget.clientSecret,
        publicKey: widget.publicKey,
        cardId: widget.cardId,
        data: data,
        env: widget.env);

    return WillPopScope(
      onWillPop: () async {
        if (await CardsState.webView.canGoBack()) {
          CardsState.webView.goBack();
          return false;
        }
        return true;
      },
      child: Scaffold(
        body: Container(
          child: Column(
            children: <Widget>[
              Container(
                  margin: EdgeInsets.only(top: 35),
                  child: DropdownButton(
                    value: cardName,
                    items: [
                      DropdownMenuItem(
                        child: Text("Balance"),
                        value: "card_balance",
                      ),
                      DropdownMenuItem(
                        child: Text("Activation"),
                        value: "card_activation",
                      ),
                      DropdownMenuItem(
                        child: Text("Admin"),
                        value: "card_admin",
                      ),
                      DropdownMenuItem(
                        child: Text("Controls"),
                        value: "card_controls",
                      ),
                      DropdownMenuItem(
                        child: Text("Funding"),
                        value: "card_funding",
                      ),
                      DropdownMenuItem(
                        child: Text("Image"),
                        value: "card_image",
                      ),
                      DropdownMenuItem(
                        child: Text("Issuance"),
                        value: "card_issuance",
                      ),
                      DropdownMenuItem(
                        child: Text("Spending"),
                        value: "card_spending",
                      ),
                      DropdownMenuItem(
                        child: Text("Statements"),
                        value: "card_statements",
                      ),
                      DropdownMenuItem(
                        child: Text("Transactions"),
                        value: "card_transactions",
                      ),
                      DropdownMenuItem(
                        child: Text("Budget"),
                        value: "card_budget",
                      ),
                      DropdownMenuItem(
                        child: Text("Cash Flow"),
                        value: "card_cash_flow",
                      ),
                      DropdownMenuItem(
                        child: Text("Cash Rewards"),
                        value: "card_rewards",
                      ),
                    ],
                    onChanged: (String value) async {
                      setState(() {
                        cardName = value;
                      });
                      await CardsState.webView.reload();
                    },
                    hint: Text("Select component"),
                  )),
              Expanded(
                child: Container(
                  margin: const EdgeInsets.only(top: 0.0),
                  child: instanceCards,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    localhostServer.close();
    super.dispose();
  }
}
