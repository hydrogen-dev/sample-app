const String clientId = '';
const String clientSecret = '';
const String publicKey = '';
const String cardId = '';
Map<String, String> env = {'sandbox': 'sandbox', 'api': 'api'};
String url() {
  return '${env['api']}.hydrogenplatform.com'; //use 'sandbox' | 'api' in [] brackets
}

const bool isClientTokenOAuth =
    false; // use 'false' to authorized via username and password or 'true' to authorized via Client Token

const String privateKey = '';
