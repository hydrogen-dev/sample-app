using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace HydrogenCards
{
 class PickerItems
    {
        public IList<Cards> CardsList { get; set; }

        public PickerItems()
        {
            try
            {
                CardsList = new ObservableCollection<Cards>();
                CardsList.Add(new Cards { CardName = "Activation", CardValue = "card_activation" });
                CardsList.Add(new Cards { CardName = "Admin", CardValue = "card_admin" });
                CardsList.Add(new Cards { CardName = "Balance", CardValue = "card_balance" });
                CardsList.Add(new Cards { CardName = "Controls", CardValue = "card_controls" });
                CardsList.Add(new Cards { CardName = "Funding", CardValue = "card_funding" });
                CardsList.Add(new Cards { CardName = "Image", CardValue = "card_image" });
                CardsList.Add(new Cards { CardName = "Issuance", CardValue = "card_issuance" });
                CardsList.Add(new Cards { CardName = "Spending", CardValue = "card_spending" });
                CardsList.Add(new Cards { CardName = "Statements", CardValue = "card_statements" });
                CardsList.Add(new Cards { CardName = "Transactions", CardValue = "card_transactions" });
                CardsList.Add(new Cards { CardName = "Budget", CardValue = "card_budget" });
                CardsList.Add(new Cards { CardName = "Cash Flow", CardValue = "card_cash_flow" });
                CardsList.Add(new Cards { CardName = "Rewards", CardValue = "card_rewards" });
            }
            catch(Exception ex)
            {

            }
        }
    }
}
