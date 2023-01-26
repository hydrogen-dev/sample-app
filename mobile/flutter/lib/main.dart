import 'dart:async';
import 'package:flutter/material.dart';

import 'localHostServer.dart';
import 'constants.dart';
import 'login/login.dart';
import 'dropdown.dart';

LocalhostServer localhostServer = new LocalhostServer();
Future main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await localhostServer.start();
  runApp(MaterialApp(
    title: "Hydrogen Cards",
    initialRoute: '/',
    routes: {
      '/': (context) => Login(),
      '/cards': (context) =>
          DropDown(publicKey, clientId, clientSecret, env['api'], cardId),
    },
  ));
}

MyGlobals myGlobals = MyGlobals();

class MyGlobals {
  GlobalKey _scaffoldKey;
  MyGlobals() {
    _scaffoldKey = GlobalKey();
  }
  GlobalKey get scaffoldKey => _scaffoldKey;
}
