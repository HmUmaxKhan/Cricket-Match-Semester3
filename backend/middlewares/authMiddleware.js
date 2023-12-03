var jwt = require("jsonwebtoken");
const jwt_secret = "Hello World , My life is js"

const AuthToken = (req,res,next)=>{
    try {
        let token = req.header('auth-token');

        if (!token) {
            return res.status(401).json({message:"Invalid token"});
        }
            let data = jwt.verify(token,jwt_secret);
<<<<<<< HEAD
            req.Email = data.Email
            console.log(req.Email);
=======
            console.log(data);
            req.userId = data.userId
>>>>>>> 88e579114222586c4af39ae3b2a935b6af01327b
            next();
    }  catch (err) {
        res.status(500).json({ err: err.message });
        console.log(err);
      }
}

module.exports = AuthToken;