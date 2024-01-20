const jwt = require("jsonwebtoken");

const genAuthToken = (user) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  const token = jwt.sign(
    {
      userID: user.id,
      name: user.name,
      email: user.email,
      img: user.img,
    },
    secretKey
  );

  return token;
};

module.exports = genAuthToken;