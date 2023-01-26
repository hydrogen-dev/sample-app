using System;
using Xamarin.Forms;

namespace HydrogenCards
{
    public class Cards
    {
        public string CardName { get; set; }
        public string CardValue { get; set; }
    }

    public partial class CardsPage : ContentPage
    {
        public string globalUserToken;
        public string globalAdminToken;
        public Token token = new Token();

        public CardsPage(string userToken, string adminToken)
        {
            globalUserToken = userToken;
            globalAdminToken = adminToken;

            InitializeComponent();
            hydroitem.showWidget("card-balance", token.GetAppToken("card_balance", globalUserToken), Constants.publicKey, Constants.ENV, Constants.cardId, Constants.client_id);

        }

        public void onCardNameChange(object sender, EventArgs e)
        {
            var cardName = ((Cards)CardsPicker.SelectedItem).CardValue;
            hydroitem.showWidget(cardName.Replace("_", "-"), token.GetAppToken(cardName, cardName == "card_admin" ? globalAdminToken : globalUserToken), Constants.publicKey, Constants.ENV, Constants.cardId, Constants.client_id);
        }
    }
}
