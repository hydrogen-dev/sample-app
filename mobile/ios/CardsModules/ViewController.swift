import UIKit
import HydrogenCards
import Alamofire
import iOSDropDown


class ViewController: UIViewController {
    
    var userName = ""
    var userPassword = ""
    
    @IBOutlet weak var balance: BalanceView!
    @IBOutlet weak var funding: FundingView!
    @IBOutlet weak var transactions: TransactionsView!
    @IBOutlet weak var statements: StatementsView!
    @IBOutlet weak var spending: SpendingView!
    @IBOutlet weak var issuance: IssuanceView!
    @IBOutlet weak var image: ImageView!
    @IBOutlet weak var controls: ControlsView!
    @IBOutlet weak var activation: ActivationView!
    @IBOutlet weak var admin: AdminView!
    @IBOutlet weak var budget: BudgetView!
    @IBOutlet weak var cashFlow: CashFlowView!
    @IBOutlet weak var rewards: RewardsView!
    @IBOutlet weak var closeButton: UIButton!
    @IBOutlet weak var dropDown: DropDown!
    
    
    func sendGet(token : String, appName: String, ENV: String, completion:@escaping((String) -> ())) {
        
        let headers : HTTPHeaders = [
            "Authorization": "Bearer \(token)",
            "Content-Type": "application/x-www-form-urlencoded"
        ]
        
        AF.request("https://\(ENV).hydrogenplatform.com/admin/v1/app_token?app_name=\(appName)", headers: headers).responseJSON { responseJSON in
            switch responseJSON.result {
            case .success(let value):
                guard
                    let post = (value as? [[String:Any]])!.first!["app_token"]
                else { return }
                completion(post as! String)
                
            case .failure(let error):
                print(error)
            }
        }
        return
    }
    
    func getRequestParams(appName: String) -> (request: String, headers: HTTPHeaders) {
        let config = Config.init()
        let ENV = config.ENV
        let client_id = config.client_id
        let client_secret = config.client_secret

        
        let loginString = String(format: "%@:%@", client_id, client_secret)
        let loginData = loginString.data(using: String.Encoding.utf8)!
        let base64LoginString = loginData.base64EncodedString()
        
        
        let signedJWT = TokenHelper.init(sub: userName.lowercased()).signedJWT;
        let OAuthHeaders: HTTPHeaders = [
            "Authorization": "Basic \(base64LoginString)",
            "Content-Type": "application/x-www-form-urlencoded",
            "Client-Token": "Bearer \(signedJWT)"
        ]
        
        
        let headers: HTTPHeaders = [
            "Authorization": "Basic \(base64LoginString)",
            "Content-Type": "application/x-www-form-urlencoded"
        ]
        
        let nonAdminRequest = "https://\(ENV).hydrogenplatform.com/authorization/v1/oauth/token?grant_type=password&username=\(userName)&password=\(userPassword)"
        let adminRequest = "https://\(ENV).hydrogenplatform.com/authorization/v1/oauth/token?grant_type=client_credentials"
        
        let oauthUrl = "https://\(ENV).hydrogenplatform.com/authorization/v1/client-token"
        
        
        let isClientToken = config.authType == "client-token"
        
        let request = isClientToken ? oauthUrl : appName != "card_admin" ? nonAdminRequest : adminRequest
        
        return (request, isClientToken ? OAuthHeaders : headers)
    }
    
    func getAppWidget(appName: String){
        let config = Config.init()
        let ENV = config.ENV
        let publicKey = config.publicKey
        
        
        let request = getRequestParams(appName: appName)
        
        AF.request(request.request, method: .post, headers: request.headers).validate().responseJSON { responseJSON in
            
            switch responseJSON.result {
            case .success(let value):
                guard
                    let jsonObject = value as? [String: Any],
                    let post = Post(json: jsonObject)
                else { return }
                self.sendGet(token: post.access_token, appName: appName, ENV: ENV) { token in
                    
                    self.balance.isHidden = true
                    self.funding.isHidden = true
                    self.transactions.isHidden = true
                    self.statements.isHidden = true
                    self.spending.isHidden = true
                    self.issuance.isHidden = true
                    self.image.isHidden = true
                    self.controls.isHidden = true
                    self.activation.isHidden = true
                    self.admin.isHidden = true
                    self.cashFlow.isHidden = true
                    self.budget.isHidden = true
                    self.rewards.isHidden = true
                    
                    switch appName{
                    case "card_balance":  do {self.balance.showContent(publicKey: publicKey, appToken: token, cardId: "", env: ENV)
                        self.balance.isHidden = false
                    }
                    case "card_funding":  do {self.funding.showContent(publicKey: publicKey, appToken: token, cardId: "", env: ENV)
                        self.funding.isHidden = false
                    }
                    case "card_transactions":  do {self.transactions.showContent(publicKey: publicKey, appToken: token, cardId: "", env: ENV)
                        self.transactions.isHidden = false
                    }
                    case "card_statements":  do {self.statements.showContent(publicKey: publicKey, appToken: token, cardId: "", env: ENV)
                        self.statements.isHidden = false
                    }
                    case "card_spending":  do {self.spending.showContent(publicKey: publicKey, appToken: token, cardId: "", env: ENV)
                        self.spending.isHidden = false
                    }
                    case "card_issuance":  do {self.issuance.showContent(publicKey: publicKey, appToken: token, cardId: "", clientId: "", env: ENV)

                        self.issuance.isHidden = false
                    }
                    case "card_image":  do {self.image.showContent(publicKey: publicKey, appToken: token, cardId: "", env: ENV)
                        self.image.isHidden = false
                    }
                    case "card_controls":  do {self.controls.showContent(publicKey: publicKey, appToken: token, cardId: "", env: ENV)
                        self.controls.isHidden = false
                    }
                    case "card_activation":  do {self.activation.showContent(publicKey: publicKey, appToken: token, cardId: "", env: ENV)
                        self.activation.isHidden = false
                    }
                    case "card_admin":  do {self.admin.showContent(publicKey: publicKey, appToken: token, env: ENV)
                        self.admin.isHidden = false
                    }
                    case "card_cash_flow":  do {self.cashFlow.showContent(publicKey: publicKey, appToken: token, env: ENV)
                        self.cashFlow.isHidden = false
                    }
                    case "card_budget":  do {self.budget.showContent(publicKey: publicKey, appToken: token, env: ENV)
                        self.budget.isHidden = false
                    }
                    case "card_rewards":  do {self.rewards.showContent(publicKey: publicKey, appToken: token, env: ENV)
                        self.rewards.isHidden = false
                    }
                    default:
                        print("DEF")
                    }
                }
                
            case .failure(let error):
                print(error)
                
                let alert = UIAlertController(title: "Error", message: "Wrong credentials!", preferredStyle: .alert)
                alert.addAction(UIAlertAction(title: "Ok", style: .default, handler: nil))
                self.present(alert, animated: true)
            }
        }
    }
    
    @IBAction func closeModal(_ sender: Any) {
        self.dismiss(animated: true, completion: nil)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        dropDown.optionArray = ["Card Balance", "Card Funding", "Card Transactions", "Card Statements","Card Spending", "Card Issuance", "Card Image","Card Controls", "Card Activation", "Card Admin", "Card Budget", "Card Cash Flow", "Card Rewards" ]
        
        let selectedIndex: Int = 0
        
        dropDown.selectedIndex = selectedIndex
        dropDown.text = dropDown.optionArray[selectedIndex]
        
        let appName = dropDown.optionArray[selectedIndex].replacingOccurrences(of: " ", with: "_", options: .literal, range: nil).lowercased()
    
        self.getAppWidget(appName: appName)

        dropDown.didSelect{(selectedText , index ,id) in
            self.getAppWidget(appName: selectedText.replacingOccurrences(of: " ", with: "_", options: .literal, range: nil).lowercased())}
    }
}
