var jwt = require("jsonwebtoken");
const jwt_secret = "Hello World , My life is js"

const AuthToken = (req,res,next)=>{
    try {
        let token = req.header('auth-token');
        console.log(token);
        if (!token) {
            return res.status(401).json({message:"Invalid token"});
        }
            let data = jwt.verify(token,jwt_secret);
            console.log(data);
            req.Email = data.Email
            next();
    }  catch (err) {
        res.status(500).json({ err: err.message });
        console.log(err);
      }
}

module.exports = AuthToken;