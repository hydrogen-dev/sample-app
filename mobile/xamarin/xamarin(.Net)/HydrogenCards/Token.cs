using System;
using System.IO;
using System.Text;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.OpenSsl;
using Org.BouncyCastle.Security;

namespace HydrogenCards
{
    public class AppToken
    {
        [JsonProperty("app_token")]
        public string app_token { get; set; }
    }

    public class AccessToken
    {
        [JsonProperty("access_token")]
        public string access_token { get; set; }
    }

    public class Token
    {
        public string CreateToken(List<Claim> claims, string privateRsaKey)
        {
            RSAParameters rsaParams;
            using (var tr = new StringReader(privateRsaKey))
            {
                var pemReader = new PemReader(tr);

                var keyPair = pemReader.ReadObject() as RsaPrivateCrtKeyParameters;
                if (keyPair == null)
                {
                    throw new Exception("Could not read RSA private key");
                }
                var privateRsaParams = keyPair;
                rsaParams = DotNetUtilities.ToRSAParameters(privateRsaParams);
            }
            using (RSACryptoServiceProvider rsa = new RSACryptoServiceProvider())
            {
                rsa.ImportParameters(rsaParams);
                Dictionary<string, object> payload = claims.ToDictionary(k => k.Type, v => (object)v.Value);
                return Jose.JWT.Encode(payload, rsa, Jose.JwsAlgorithm.RS512);
            }
        }


        public string GetAppToken(string appName, string token)
        {
            string WEBSERVICE_URL = $"https://{Constants.ENV}.hydrogenplatform.com/admin/v1/app_token?app_name={appName}";
            try
            {
                var webRequest = System.Net.WebRequest.Create(WEBSERVICE_URL);
                var appToken = "";
                if (webRequest != null)
                {
                    webRequest.Method = "GET";
                    webRequest.Timeout = 12000;
                    webRequest.ContentType = "application/json";
                    webRequest.Headers.Add("Authorization", "Bearer " + token);

                    using (System.IO.Stream s = webRequest.GetResponse().GetResponseStream())
                    {
                        using (System.IO.StreamReader sr = new System.IO.StreamReader(s))
                        {
                            var jsonResponse = sr.ReadToEnd();
                            var deserialized = JsonConvert.DeserializeObject<AppToken[]>(jsonResponse);
                            appToken = deserialized[0].app_token;
       
                            return appToken;
                        }
                    }
                }
                return appToken;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return "";
        }



        public string WebRequest(string username, string password)
        {
            string WEBSERVICE_URL = $"https://{Constants.ENV}.hydrogenplatform.com/authorization/v1/oauth/token?grant_type=password&username={username}&password={password}";
            string svcCredentials = Convert.ToBase64String(ASCIIEncoding.ASCII.GetBytes(Constants.client_id + ":" + Constants.client_secret));

            try
            {
                var webRequest = System.Net.WebRequest.Create(WEBSERVICE_URL);
                var userToken = "";

                if (webRequest != null)
                {
                    webRequest.Method = "POST";
                    webRequest.Timeout = 12000;
                    webRequest.ContentType = "application/json";
                    webRequest.Headers.Add("Authorization", "Basic " + svcCredentials);

                    using (Stream s = webRequest.GetResponse().GetResponseStream())
                    {
                        using (StreamReader sr = new StreamReader(s))
                        {
                            var jsonResponse = sr.ReadToEnd();
                            var deserialized = JsonConvert.DeserializeObject<AccessToken>(jsonResponse);

                            userToken = deserialized.access_token;
                            return userToken;
                        }
                    }
                }
                return userToken;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return "";
        }

        public string AdminWebRequest()
        {
            string WEBSERVICE_URL = $"https://{Constants.ENV}.hydrogenplatform.com/authorization/v1/oauth/token?grant_type=client_credentials";
            string svcCredentials = Convert.ToBase64String(ASCIIEncoding.ASCII.GetBytes(Constants.client_id + ":" + Constants.client_secret));

            try
            {
                var webRequest = System.Net.WebRequest.Create(WEBSERVICE_URL);
                var userToken = "";

                if (webRequest != null)
                {
                    webRequest.Method = "POST";
                    webRequest.Timeout = 12000;
                    webRequest.ContentType = "application/json";
                    webRequest.Headers.Add("Authorization", "Basic " + svcCredentials);

                    using (Stream s = webRequest.GetResponse().GetResponseStream())
                    {
                        using (StreamReader sr = new StreamReader(s))
                        {
                            var jsonResponse = sr.ReadToEnd();
                            var deserialized = JsonConvert.DeserializeObject<AccessToken>(jsonResponse);

                            userToken = deserialized.access_token;
                            return userToken;
                        }
                    }
                }
                return userToken;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return "";
        }


        public string ClientTokenWebRequest(string clientToken)
        {
            string WEBSERVICE_URL = $"https://{Constants.ENV}.hydrogenplatform.com/authorization/v1/client-token";
            string svcCredentials = Convert.ToBase64String(ASCIIEncoding.ASCII.GetBytes(Constants.client_id + ":" + Constants.client_secret));

            try
            {
                var webRequest = System.Net.WebRequest.Create(WEBSERVICE_URL);
                var userToken = "";

                if (webRequest != null)
                {
                    webRequest.Method = "POST";
                    webRequest.Timeout = 12000;
                    webRequest.ContentType = "application/json";
                    webRequest.Headers.Add("Authorization", "Basic " + svcCredentials);
                    webRequest.Headers.Add("Client-Token", "Bearer " + clientToken);

                    using (Stream s = webRequest.GetResponse().GetResponseStream())
                    {
                        using (StreamReader sr = new StreamReader(s))
                        {
                            var jsonResponse = sr.ReadToEnd();
                            var deserialized = JsonConvert.DeserializeObject<AccessToken>(jsonResponse);

                            userToken = deserialized.access_token;
                            return userToken;
                        }
                    }
                }
                return userToken;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return "";
        }
    }
}