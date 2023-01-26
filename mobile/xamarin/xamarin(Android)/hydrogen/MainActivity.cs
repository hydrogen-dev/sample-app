using System;
using Android.App;
using Android.OS;
using AndroidX.AppCompat.App;
using Com.Hydrogenplatform.Card_modules;
using System.Text;
using Newtonsoft.Json;
using Android.Widget;

namespace hydrogen.android
{
    public class AccessToken
    {
        [JsonProperty("access_token")]
        public string access_token { get; set; }
    }

    public class AppToken
    {
        [JsonProperty("app_token")]
        public string app_token { get; set; }
    }

    [Activity(Label = "@string/app_name", Theme = "@style/AppTheme.NoActionBar", MainLauncher = true)]
    public class MainActivity : AppCompatActivity
    {
        private Activation activationView;
        private Admin adminView;
        private Balance balanceView;
        private Controls controlsView;
        private Funding fundingView;
        private Image imageView;
        private Issuance issuanceView;
        private Spending spendingView;
        private Statements statementsView;
        private Transactions transactionsView;

        private EditText editEmail;
        private EditText editPass;
        private Button button;

        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            Xamarin.Essentials.Platform.Init(this, savedInstanceState);

            if (Constants.OAuth == "client-token")
            {
                SetContentView(Resource.Layout.activity_main);

                activationView = FindViewById(Resource.Id.activation) as Activation;
                adminView = FindViewById(Resource.Id.admin) as Admin;
                balanceView = FindViewById(Resource.Id.balance) as Balance;
                controlsView = FindViewById(Resource.Id.controls) as Controls;
                fundingView = FindViewById(Resource.Id.funding) as Funding;
                imageView = FindViewById(Resource.Id.image) as Image;
                issuanceView = FindViewById(Resource.Id.issuance) as Issuance;
                spendingView = FindViewById(Resource.Id.spending) as Spending;
                statementsView = FindViewById(Resource.Id.statements) as Statements;
                transactionsView = FindViewById(Resource.Id.transactions) as Transactions;

                ClientWebRequest();
            }
            else
            {
                SetContentView(Resource.Layout.content_main);

                editEmail = FindViewById<EditText>(Resource.Id.EmailText);
                editPass = FindViewById<EditText>(Resource.Id.PasswordText);
                button = (Button)FindViewById(Resource.Id.button1);

                button.Click += (sender, e) =>
                {
                    SetContentView(Resource.Layout.activity_main);

                    activationView = FindViewById(Resource.Id.activation) as Activation;
                    adminView = FindViewById(Resource.Id.admin) as Admin;
                    balanceView = FindViewById(Resource.Id.balance) as Balance;
                    controlsView = FindViewById(Resource.Id.controls) as Controls;
                    fundingView = FindViewById(Resource.Id.funding) as Funding;
                    imageView = FindViewById(Resource.Id.image) as Image;
                    issuanceView = FindViewById(Resource.Id.issuance) as Issuance;
                    spendingView = FindViewById(Resource.Id.spending) as Spending;
                    statementsView = FindViewById(Resource.Id.statements) as Statements;
                    transactionsView = FindViewById(Resource.Id.transactions) as Transactions;

                    WebRequest(editEmail.Text, editPass.Text);
                };
            }

        }


        private void WebRequest(string userNameCred, string userPasswordCred)
        {

            string WEBSERVICE_URL = $"https://{Constants.ENV}.hydrogenplatform.com/authorization/v1/oauth/token?grant_type=password&username={userNameCred}&password={userPasswordCred}";
            string WEBSERVICE_URL_ADMIN = $"https://{Constants.ENV}.hydrogenplatform.com/authorization/v1/oauth/token?grant_type=client_credentials";
            string svcCredentials = Convert.ToBase64String(ASCIIEncoding.ASCII.GetBytes(Constants.client_id + ":" + Constants.client_secret));

            try
            {
                var webRequest = System.Net.WebRequest.Create(WEBSERVICE_URL);
                var webRequestAdmin = System.Net.WebRequest.Create(WEBSERVICE_URL_ADMIN);

                if (webRequest != null)
                {
                    webRequest.Method = "POST";
                    webRequest.Timeout = 12000;
                    webRequest.ContentType = "application/json";
                    webRequest.Headers.Add("Authorization", "Basic " + svcCredentials);

                    using (System.IO.Stream s = webRequest.GetResponse().GetResponseStream())
                    {
                        using (System.IO.StreamReader sr = new System.IO.StreamReader(s))
                        {
                            var jsonResponse = sr.ReadToEnd();
                            var deserialized = JsonConvert.DeserializeObject<AccessToken>(jsonResponse);

                            this.activationView.ShowComponent(Constants.publicKey, SendGet("card_activation", deserialized.access_token), "");
                            this.balanceView.ShowComponent(Constants.publicKey, SendGet("card_balance", deserialized.access_token), "");
                            this.controlsView.ShowComponent(Constants.publicKey, SendGet("card_controls", deserialized.access_token), "");
                            this.fundingView.ShowComponent(Constants.publicKey, SendGet("card_funding", deserialized.access_token), "");
                            this.imageView.ShowComponent(Constants.publicKey, SendGet("card_image", deserialized.access_token), "");
                            this.issuanceView.ShowComponent(Constants.publicKey, SendGet("card_issuance", deserialized.access_token));
                            this.spendingView.ShowComponent(Constants.publicKey, SendGet("card_spending", deserialized.access_token), "");
                            this.statementsView.ShowComponent(Constants.publicKey, SendGet("card_statements", deserialized.access_token), "");
                            this.transactionsView.ShowComponent(Constants.publicKey, SendGet("card_transactions", deserialized.access_token), "");

                        }
                    }
                }

                if (webRequestAdmin != null)
                {
                    webRequestAdmin.Method = "POST";
                    webRequestAdmin.Timeout = 12000;
                    webRequestAdmin.ContentType = "application/json";
                    webRequestAdmin.Headers.Add("Authorization", "Basic " + svcCredentials);

                    using (System.IO.Stream s = webRequestAdmin.GetResponse().GetResponseStream())
                    {
                        using (System.IO.StreamReader sr = new System.IO.StreamReader(s))
                        {
                            var jsonResponse = sr.ReadToEnd();
                            var deserialized = JsonConvert.DeserializeObject<AccessToken>(jsonResponse);
                            this.adminView.ShowComponent(Constants.publicKey, SendGet("card_admin", deserialized.access_token));
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());

            }
        }

        private void ClientWebRequest()
        {

            string WEBSERVICE_URL = $"https://{Constants.ENV}.hydrogenplatform.com/authorization/v1/client-token";
            string WEBSERVICE_URL_ADMIN = $"https://{Constants.ENV}.hydrogenplatform.com/authorization/v1/oauth/token?grant_type=client_credentials";
            string svcCredentials = Convert.ToBase64String(ASCIIEncoding.ASCII.GetBytes(Constants.client_id + ":" + Constants.client_secret));

            try
            {
                var webRequest = System.Net.WebRequest.Create(WEBSERVICE_URL);
                var webRequestAdmin = System.Net.WebRequest.Create(WEBSERVICE_URL_ADMIN);

                if (webRequest != null)
                {
                    webRequest.Method = "POST";
                    webRequest.Timeout = 12000;
                    webRequest.ContentType = "application/json";
                    webRequest.Headers.Add("Authorization", "Basic " + svcCredentials);
                    webRequest.Headers.Add("Client-Token", "Bearer " + Constants.clientToken);

                    using (System.IO.Stream s = webRequest.GetResponse().GetResponseStream())
                    {
                        using (System.IO.StreamReader sr = new System.IO.StreamReader(s))
                        {
                            var jsonResponse = sr.ReadToEnd();
                            var deserialized = JsonConvert.DeserializeObject<AccessToken>(jsonResponse);

                            this.activationView.ShowComponent(Constants.publicKey, SendGet("card_activation", deserialized.access_token), "");
                            this.balanceView.ShowComponent(Constants.publicKey, SendGet("card_balance", deserialized.access_token), "");
                            this.controlsView.ShowComponent(Constants.publicKey, SendGet("card_controls", deserialized.access_token), "");
                            this.fundingView.ShowComponent(Constants.publicKey, SendGet("card_funding", deserialized.access_token), "");
                            this.imageView.ShowComponent(Constants.publicKey, SendGet("card_image", deserialized.access_token), "");
                            this.issuanceView.ShowComponent(Constants.publicKey, SendGet("card_issuance", deserialized.access_token));
                            this.spendingView.ShowComponent(Constants.publicKey, SendGet("card_spending", deserialized.access_token), "");
                            this.statementsView.ShowComponent(Constants.publicKey, SendGet("card_statements", deserialized.access_token), "");
                            this.transactionsView.ShowComponent(Constants.publicKey, SendGet("card_transactions", deserialized.access_token), "");

                        }
                    }
                }

                if (webRequestAdmin != null)
                {
                    webRequestAdmin.Method = "POST";
                    webRequestAdmin.Timeout = 12000;
                    webRequestAdmin.ContentType = "application/json";
                    webRequestAdmin.Headers.Add("Authorization", "Basic " + svcCredentials);

                    using (System.IO.Stream s = webRequestAdmin.GetResponse().GetResponseStream())
                    {
                        using (System.IO.StreamReader sr = new System.IO.StreamReader(s))
                        {
                            var jsonResponse = sr.ReadToEnd();
                            var deserialized = JsonConvert.DeserializeObject<AccessToken>(jsonResponse);
                            this.adminView.ShowComponent(Constants.publicKey, SendGet("card_admin", deserialized.access_token));
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());

            }
        }


        private string SendGet(string appName, string userToken)
        {
            string WEBSERVICE_URL = $"https://sandbox.hydrogenplatform.com/admin/v1/app_token?app_name={appName}";
            try
            {
                var webRequest = System.Net.WebRequest.Create(WEBSERVICE_URL);
                var appToken = "";
                if (webRequest != null)
                {
                    webRequest.Method = "GET";
                    webRequest.Timeout = 12000;
                    webRequest.ContentType = "application/json";
                    webRequest.Headers.Add("Authorization", "Bearer " + userToken);

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
    }
}