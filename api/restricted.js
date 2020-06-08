const jwt=require('jsonwebtoken');
const secrets=require('./secret');




module.exports=(req,res,next)=>{
    console.log(req.headers);
    try{
        const token=req.headers.authorization;
        if(token){
            jwt.verify(token,secrets.jwtSecret, (err,decodedToken)=>{
                if(err){
                    res.status(401).json(`Invalid Token`)
                }else{
                    req.decodedJWT=decodedToken;
                    console.log(req.decodedJWT)
                    next();
                }
            })
        }else{
            throw new Error('invalid authorization data');
        }
    
    } catch(error){
        res.status(401).json(error);
    }
};

