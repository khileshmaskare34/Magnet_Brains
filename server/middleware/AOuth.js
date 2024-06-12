const jwt = require('jsonwebtoken');

exports.checkTokenExp =  async(req, res, next)=>{
    const token = req.cookies.JWT_Token;
    console.log("token", token);

    if(!token){
        return res.status(400).json({error: "No token provided"})
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_Token)
        console.log("decoded", decode);
        next();
    } catch (error) {
        res.status(400).json({error:error})        
    }

}