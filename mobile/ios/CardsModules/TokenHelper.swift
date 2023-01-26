import SwiftJWT

extension Date {
 var millisecondsSince1970:Int64 {
        return Int64((self.timeIntervalSince1970 * 1000.0).rounded())
        //RESOLVED CRASH HERE
    }

    init(milliseconds:Int) {
        self = Date(timeIntervalSince1970: TimeInterval(milliseconds / 1000))
    }
}

class TokenHelper {
    var signedJWT: String = ""
    init(sub: String = "") {
        let config = Config.init()
        
        struct MyClaims: Claims {
           var sub: String
           var iss: String
           var iat: Int64
           var exp: Int64
        }
        
        
        let date = Date().millisecondsSince1970
        
        var jwt = JWT(claims: MyClaims(sub: sub, iss: config.client_id, iat: date, exp: date + 3600 * 1000))
        let key = Config.init().privateKey.data(using: .utf8)!
        signedJWT = (try? jwt.sign(using: .rs512(privateKey: key))) ?? ""
    }
}
