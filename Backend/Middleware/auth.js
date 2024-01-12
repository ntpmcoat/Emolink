const jwt=require("jsonwebtoken")
import Register from "../Models/User";


export const auth=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        const verify=jwt.verify(token,process.env.SECRET_KEY);
        next();

    } catch (error) {
        res.redirect("/login?LoginError=Please Log in To continue")
    }
}


