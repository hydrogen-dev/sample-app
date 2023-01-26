import UIKit

class LoginViewController: UIViewController {
    
    @IBOutlet weak var loginBtn: UIButton!
    @IBOutlet weak var loginTF: UITextField!
    @IBOutlet weak var passwordTF: UITextField!
    
    @IBAction func onLoginPress(_ sender: Any){
        
        performSegue(withIdentifier: "WidgetSelect", sender: self)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let vc = segue.destination as? ViewController {
            vc.userName = loginTF.text ?? ""
            vc.userPassword = passwordTF.text ?? ""
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
       
    }
}
