import jwt  from "jsonwebtoken";
import Register from "../Models/User.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await Register.findById(decoded._id).select("-password");
      

      next();
    } catch (error) {
      res.status(401);
      console.log(error);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

export default protect;