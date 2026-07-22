import jwt from "jsonwebtoken";

const checkToken = async(req, res, next)=>{
    try {
        const authHeaders = req.headers.authorization || req.headers.Authorization;

        if(!authHeaders || !authHeaders.startsWith("Bearer ")){
           return res.status(401).json({message:"Unauthorized Access"});
        };

        const token = authHeaders.split(" ")[1];

        if(!token){
            return res.status(401).json({message:"Unauthorized Access"});
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY);

        req.user = decode;
        next();

    } catch (error) {
        // console.log(error);
       if(error.name === 'TokenExpiredError'){
        return res.status(401).json({
            success:false,
            message:"Token expired"
        });
    }

    return res.status(401).json({
        success:false,
        message:"Invalid token"
    });
    }
}

export {checkToken};