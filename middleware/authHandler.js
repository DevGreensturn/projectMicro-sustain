
const jwt =require('jsonwebtoken')
require('dotenv').config();
// const allUsers = require("../model/endUserModel");
const jwt_secretKey  = process.env.jwt_secretKey;

const authenticateToken=async(req, res, next) =>{
  try {
    const token = req.headers.authorization;
    const verified = jwt.verify(token, jwt_secretKey);
    if (verified) {
      next();
    }else if (!token) {
      return res.status(400).send({ message: "You are not authorized", status: false, isSessionExist: 0 });
    } else {
      return res.status(400).send({ message: "Invalid token.", status: false, isSessionExist: 0 });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Please login again.", status:false, isSessionExist: 0 });
  }
}
  
  
  module.exports={
    authenticateToken
  }