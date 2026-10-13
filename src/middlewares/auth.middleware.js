const jwt=require("jsonwebtoken");

//this is for artist authentication
async function authartist(req,res,next){

    let token=req.cookies.token;
    if(!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        token=req.headers.authorization.split(" ")[1];
    }
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.role!=="artist"){
            return res.status(403).json({message:"Forbidden: Only artists can create music"});
        }
        req.user=decoded; //yeh req.user me decoded token ko store kar raha hai taki aage ke middleware me use kiya ja sake. decoded token me user ka id aur role hota hai jo ki humne login ke time generate kiya tha.
        next(); //yeh next() function ka use karke next middleware ko call kar raha hai taki request ko aage process kiya ja sake. Agar user artist hai to next() function call hoga aur request aage process hogi.


    }
    catch(error){
        return res.status(401).json({message:"Invalid token"});
    }

}


//for user authentication
async function authuser(req,res,next){

    let token=req.cookies.token;
    if(!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        token=req.headers.authorization.split(" ")[1];
    }
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.role!=="user"){
            return res.status(403).json({message:"Forbidden: Only users can access this route"});
        }
        req.user=decoded; //yeh req.user me decoded token ko store kar raha hai taki aage ke middleware me use kiya ja sake. decoded token me user ka id aur role hota hai jo ki humne login ke time generate kiya tha.
        next(); //yeh next() function ka use karke next middleware ko call kar raha hai taki request ko aage process kiya ja sake. Agar user user hai to next() function call hoga aur request aage process hogi.   
    }
    catch(error){
        return res.status(401).json({message:"Invalid token"});
    }
}

module.exports={authartist, authuser};