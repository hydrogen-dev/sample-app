using System;
using System.Collections.Generic;
using System.Security.Claims;
using Xamarin.Forms;



namespace HydrogenCards
{
    public partial class MainPage : ContentPage
    {
        public string sub;
        public MainPage()
        {
            InitializeComponent();
        }

        async void OnButtonClicked(object sender, EventArgs args)
        {


            if (String.IsNullOrEmpty(User.Text))
            {
                await DisplayAlert("Login is required", "", "Try again");
                sub = "";
            }
            else
            {
                sub = User.Text.ToLower();
            }

            var token = new Token();
            var issuedAt = DateTimeOffset.Now.ToUnixTimeMilliseconds().ToString();
            var expiredAt = DateTimeOffset.Now.AddHours(1).ToUnixTimeMilliseconds().ToString();

            var claims = new List<Claim>();
            claims.Add(new Claim("sub", sub));
            claims.Add(new Claim("iss", Constants.client_id));
            claims.Add(new Claim("exp", expiredAt));
            claims.Add(new Claim("iat", issuedAt));

            string userToken = Constants.isClientTokenOAuth ? token.ClientTokenWebRequest(token.CreateToken(claims, Constants.privateKey)) : token.WebRequest( User.Text,Password.Text);
            string adminToken = token.AdminWebRequest();

            if (String.IsNullOrEmpty(userToken))
            {
                await DisplayAlert("Wrong credentials", "", "Try again");
            }
            else
            {
                await Navigation.PushModalAsync(new CardsPage(userToken, adminToken));
            }
        }
    }
}