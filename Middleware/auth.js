const jwt = require("jsonwebtoken")

exports.auth = async (req, res, next) => {
    try {
        const token = req.headers["authtoken"]
        if (!token) {
            return res.status(401).send("No token!!!")
        }
        const decode = jwt.verify(token, 'jwtsecret')
        req.user = decode.user
        console.log(decode)
        next();
    } catch(err){
        console.log(err)
        res.status(500).send("Token invalid!!!")
    }
}