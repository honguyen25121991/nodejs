const jwt = require("jsonwebtoken");
//generate token : tạo token
const createToken = (data) => {
  // token expiren 5m
  let token = jwt.sign({ data }, "node", {
    expiresIn: "5m",
  });
  return token;
};
// verify token : kiểm tra token
const checkToken = (token) => {
  return jwt.verify(token, "node");
};
// decode token : giải mã token
const decriptToken = (token) => {
  return jwt.decode(token);
};
module.exports = {
  createToken,
  checkToken,
  decriptToken,
};
