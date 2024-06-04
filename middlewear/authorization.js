const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.Authi = async(req,res,next)=>{
    try {
        const token = req.cookies.token || req.header('Authorization').replace("Bearer ","");
        console.log(token);
        if(!token){
            return res.status(404).json(
                {
                    success : false,
                    message : "Token is not present"
                }
            )
        }
        try{
            console.log("Verfication k liye gaya")
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode)
            req.user = decode ; 
        }catch(error){
            return res.status(401).json(
                {
                    success : false,
                    message : "token is invalid"
                }
            )
        }
        next();
    }
    catch{
        res.status(500).json(
            {
                success : false,
                message : "No token found"
            }
        )
        
    }
}