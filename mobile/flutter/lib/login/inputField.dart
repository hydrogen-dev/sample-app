import 'package:flutter/material.dart';
import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';

import '../token.dart';
import '../constants.dart';
import '../main.dart';

class InputField extends StatelessWidget {
  final TextEditingController usernameController = new TextEditingController();
  final TextEditingController passwordController = new TextEditingController();

  generateToken(username) {
    var issuedAt = new DateTime.now().millisecondsSinceEpoch;
    var expireTime =
        new DateTime.now().add(new Duration(hours: 1)).millisecondsSinceEpoch;

    final jwt = JWT({
      "sub": username,
      "iss": clientId,
      "exp": expireTime,
      "iat": issuedAt,
    });
    var jwtToken;

    try {
      final key = RSAPrivateKey(privateKey);
      jwtToken = jwt.sign(key, algorithm: JWTAlgorithm.RS512);
    } on JWTExpiredError {
      print('jwt expired');
    } on JWTError catch (ex) {
      print(ex.message); // ex: invalid signature
    }

    return jwtToken;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Container(
          padding: EdgeInsets.all(10),
          decoration: BoxDecoration(
              border: Border(bottom: BorderSide(color: Colors.grey[200]))),
          child: TextField(
            controller: usernameController,
            decoration: InputDecoration(
                hintText: "Enter your email",
                hintStyle: TextStyle(color: Colors.grey),
                border: InputBorder.none),
          ),
        ),
        Container(
          padding: EdgeInsets.all(10),
          decoration: BoxDecoration(
              border: Border(bottom: BorderSide(color: Colors.grey[200]))),
          child: TextField(
            obscureText: true,
            controller: passwordController,
            decoration: InputDecoration(
                hintText: "Enter your password",
                hintStyle: TextStyle(color: Colors.grey),
                border: InputBorder.none),
          ),
        ),
        Container(
          height: 50,
          margin: EdgeInsets.symmetric(horizontal: 50, vertical: 100),
          decoration: BoxDecoration(
            color: Colors.cyan[500],
            borderRadius: BorderRadius.circular(10),
          ),
          child: Center(
              child: Column(
            children: <Widget>[
              TextButton.icon(
                  onPressed: () async {
                    final clientToken =
                        generateToken(usernameController.text.toLowerCase());
                    Token instance = Token(
                        clientId: clientId,
                        clientSecret: clientSecret,
                        data: {
                          "username": usernameController.text,
                          "password": passwordController.text,
                          "clientToken": clientToken
                        },
                        cardName: "card_balance");
                    await instance.getUserToken();
                    String userToken = instance.accessToken['access_token'];
                    if (userToken != null) {
                      Navigator.pushReplacementNamed(context, '/cards',
                          arguments: {
                            "username": usernameController.text,
                            "password": passwordController.text,
                            "clientToken": clientToken,
                            "accessToken": userToken,
                          });
                    } else {
                      showDialog(
                          context: myGlobals.scaffoldKey.currentContext,
                          builder: (BuildContext context) => AlertDialog(
                                content: Text('Wrong credentials!'),
                              ));
                    }
                  },
                  icon: Icon(
                    Icons.login,
                    color: Colors.purple[50],
                  ),
                  label: Text("Log in",
                      style: TextStyle(color: Colors.purple[50])))
            ],
          )),
        )
      ],
    );
  }
}
