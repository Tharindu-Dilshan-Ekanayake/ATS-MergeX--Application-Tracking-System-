const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (userEmail, userId, userFname, res) => {

  const token = jwt.sign({ email: userEmail, userId: userId, name: userFname }, process.env.JWT_SECRET, { expiresIn:'15d'}) // payload - userId
  // The jwt.sign() function generates a JWT with the provided payload, signs it using the secret key, and sets an expiration time for the token
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // Milisecond Format
    httpOnly: true, // to prevent from cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development"
  })
  console.log("Token Generated : "+token);
}

module.exports = generateTokenAndSetCookie;