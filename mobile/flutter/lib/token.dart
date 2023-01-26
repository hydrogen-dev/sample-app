import 'package:http/http.dart' as http;
import 'dart:convert';

import 'constants.dart';

class Token {
  String appToken;
  String cardName;
  String clientId;
  String clientSecret;
  Map data;
  Map accessToken;

  Token({this.clientId, this.clientSecret, this.data, this.cardName});

  Future<void> getUserToken() async {
    String credentials = '$clientId:$clientSecret';
    Codec<String, String> stringToBase64 = utf8.fuse(base64);
    String authHeader = stringToBase64.encode(credentials);
    Uri targetURL;
    Uri clientTokenURL;

    if (isClientTokenOAuth) {
      clientTokenURL =
          Uri.parse('https://${url()}/authorization/v1/client-token');
    } else {
      String username = data['username'];
      String password = data['password'];

      var nonAdminURL = Uri.parse(
          'https://${url()}/authorization/v1/oauth/token?grant_type=password&username=$username&password=$password');

      var adminURL = Uri.parse(
          'https://${url()}/authorization/v1/oauth/token?grant_type=client_credentials');

      if (cardName == 'card_admin') {
        targetURL = adminURL;
      } else {
        targetURL = nonAdminURL;
      }
    }

    try {
      String clientToken = data["clientToken"];
      var userTokenData = isClientTokenOAuth
          ? await http.post(clientTokenURL, headers: {
              'Authorization': 'Basic $authHeader',
              'client-token': 'Bearer $clientToken'
            })
          : await http
              .post(targetURL, headers: {'Authorization': 'Basic $authHeader'});

      accessToken = json.decode(userTokenData.body);
      getAppToken(cardName, accessToken['access_token']);
    } on Exception catch (e) {
      print('Something gone wrong with HTTP Request: $e');
    }
  }

  Future<void> getAppToken(cardName, userToken) async {
    try {
      var appTokenUrl =
          Uri.parse('https://${url()}/admin/v1/app_token?app_name=$cardName');

      var appTokenDate = await http
          .get(appTokenUrl, headers: {'Authorization': 'Bearer ${userToken}'});

      Map tokenResponse = (json.decode(appTokenDate.body))[0];
      appToken = tokenResponse['app_token'].toString();
    } on Exception catch (e) {
      print('Something gone wrong with HTTP Request: $e');
    }
  }
}
