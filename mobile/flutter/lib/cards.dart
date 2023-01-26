import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';

import 'token.dart';

class CardsState extends StatefulWidget {
  static InAppWebViewController webView;
  final String cardName;
  final String publicKey;
  final String clientSecret;
  final String clientId;
  final String env;
  final String cardId;
  final Map data;

  CardsState(
      {this.cardName,
      this.clientId,
      this.clientSecret,
      this.publicKey,
      this.cardId,
      this.data,
      this.env});
  @override
  _Cards createState() => _Cards();
}

class _Cards extends State<CardsState> {
  @override
  Widget build(BuildContext context) {
    return InAppWebView(
      initialUrlRequest:
          URLRequest(url: Uri.parse("http://localhost:7029/assets/index.html")),
      onWebViewCreated: (InAppWebViewController controller) {
        CardsState.webView = controller;
        controller.addJavaScriptHandler(
            handlerName: 'webViewData',
            callback: (args) async {
              String accessToken = widget.data['accessToken'];
              Token instance = Token(
                  clientId: widget.clientId,
                  clientSecret: widget.clientSecret,
                  data: widget.data,
                  cardName: widget.cardName);
              await instance.getAppToken(widget.cardName, accessToken);
              Map<String, dynamic> toJson() {
                return {
                  "publicKey": widget.publicKey,
                  "appToken": instance.appToken,
                  "cardName": widget.cardName.replaceAll('_', '-'),
                  "env": widget.env,
                  "cardId": widget.cardId,
                  "clientId": widget.clientId
                };
              }

              return toJson();
            });
      },
    );
  }
}
