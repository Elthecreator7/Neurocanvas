import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
    const {token} = req.headers;
    if(!token){
        return res.json({success: false, message: "Whoa there, VIP access only. Looks like you don't have the magic ticket. Try Logining Again"});
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if(!req.body) req.body = {};

        if(tokenDecode.id){
            req.body.userId = tokenDecode.id
        }else{
            return res.json({success: false, message: "Whoa there, VIP access only. Looks like you don't have the magic ticket. Try Logining Again"})
        };
        next();
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}


export default userAuth