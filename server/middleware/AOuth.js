const jwt = require('jsonwebtoken');

exports.checkTokenExp =  async(req, res, next)=>{
    console.log("chala chala")
    const token = req.cookies.JWT_Token;
    console.log("token", token);

    if(!token){
        console.log("nahi hai")
        return res.status(400).json({error: "No token provided"})
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log("decoded", decode);
        req.user = decode;
        next();
    } catch (error) {
        res.status(402).json({error:error})        
    }

}