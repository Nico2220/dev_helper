const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next)=>{

    //GET TOKEN FROM HEADER
    const token = req.header('x-auth-token');

    // CHECK IS NOT TOKEN
    if(!token){
        return res.status(401).json({msg: "No token, authotization is denied"})
    }

    //VERIFY TOKEN
    try{
        const decodedToken = jwt.verify(token, config.get('secretKey'));
        req.user = decodedToken.user;
        console.log(req.user);
        next();

    }catch(err){
        return res.status(400).json({msg: "Token is not valid"})

    }

    
    

}