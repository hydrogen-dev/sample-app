import Foundation

struct Post {
    
    var access_token: String
    
    init?(json: [String: Any]) {
        guard
            let access_token = json["access_token"] as? String
        else {
            return nil
        }
        self.access_token = access_token
    }
}

