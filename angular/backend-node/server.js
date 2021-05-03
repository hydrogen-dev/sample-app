const dotenv = require('dotenv').config();
const express = require('express')
const app = express()
var cors = require('cors')
const HydrogenAppTokenApi = require('app_token_api');
const port = 3005;

app.use(cors())
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.post('/user/login', (req, res) => {
  let user_name = req.body.user_name;
  let password = req.body.password;

  var callback = function(error, data, response) {
    if (error) {
      res.status(400);
      res.json(error);
    } else {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
      res.json(data);
    }
  }

  
  var api = new HydrogenAppTokenApi.AuthApi()
  api.createUsingPostPassword({
    'grant_type': 'password',
    'client_id': process.env.TENANT_NAME,
    'client_secret': process.env.TENANT_PASSWORD,
    'username': user_name,
    'password': password
  }, callback);
})

app.get('/app_token/generate', (req, res) => {
  let app_name = req.query.app_name;
  let userAuthToken = req.query.user_auth_token;

  if(!Array.isArray(app_name)){
    res.status(400);
    res.json({"error" : "invalid format for app_name : should be in array format ?app_name[]=xxx&app_name[]=yyy"});
  }
 
  var callback = function(error, data, response) {
    if (error) {
      res.status(400);
      res.json(error);
    } else {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
      res.json(data);
    }
  }
  let attribMap = [{"name" : "public-key", "value" : process.env.PUBLIC_KEY}]
  let appTokenConfig = {};
  appTokenConfig['appName'] = app_name
  appTokenConfig['userAccessToken'] = userAuthToken
  appTokenConfig['attribMap'] = attribMap
  appTokenConfig['isEmbed'] = true
  appTokenConfig['isCredsPassed'] = false
  appTokenConfig['clientId'] = process.env.TENANT_NAME
  appTokenConfig['clientSecret'] = process.env.TENANT_PASSWORD
  //appTokenConfig['username'] = "xxxx"
  //appTokenConfig['password'] = "xxxx"
  appTokenConfig['basePath'] = process.env.BASE_PATH
  
  
  var api = new HydrogenAppTokenApi.AutoGenerateAppTokenApi()
  api.getAppTokenUsingGET(appTokenConfig = appTokenConfig, callback);
})

let server = app.listen(port, function() {
  console.log(`Server is listening on port ${port}`)
});