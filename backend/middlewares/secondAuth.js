const jwt = require('jsonwebtoken')

const removeBgUserAuth = async (req, res, next) => {
    const {token} = req.headers;
    if(!token){
        return res.json({success: false, message: "Whoa there, VIP access only. Looks like you don't have the magic ticket. Try Logining Again"});
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

       if(!tokenDecode.id){
        return res.json({
            success: false,
            message: "Invalid token. please log in again"
        });
       }
       req.userId = tokenDecode.id;

       if(typeof req.body === 'object'){
        req.body.userId = tokenDecode.id;
       }
        next();
    } catch (error) {
        console.log("Auth error:", error)
        res.json({success: false, message: error.message})
    }
}

module.exports = removeBgUserAuth