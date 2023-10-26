const { Op } = require("sequelize");
// import hàm quản lý các đối tượng model
const iniModels = require("../models/init-models");
// import chuỗi kết nối CSDL
const sequelize = require("../models/index");
// import create token

const { createToken } = require("../config/jwt");
const { successCode, errorCode, failCode } = require("../config/response");
// đối tượng chứa các model trong database
const model = iniModels(sequelize);
const bcrypt = require("bcrypt");
const getUser = (req, res) => {
  res.send("Get user");
};

const createUser = (req, res) => {
  res.send("Create user");
};

const userLogin = async (req, res) => {
  try {
    //username and password
    let { email, password } = req.body;
    // find email = email && user.pass_word = password
    let checkUser = await model.user.findOne({
      where: {
        email: email,
      },
    });
    // user tồn tại > kiểm tra tiếp mật khẩus
    if (checkUser) {
      let checkPass = bcrypt.compareSync(password, checkUser.pass_word);
      if (checkPass) {
        let token = createToken(checkPass);
        successCode(res, token, "Signup sucess");
        return;
      }
      errorCode(res, "token", "Fail pass");
    } else {
      errorCode(res, "token", "Fail email");
    }
  } catch (err) {
    failCode(res, "Lỗi BE");
  }
};

const userSignup = async (req, res) => {
  try {
    let { full_name, email, pass_word } = req.body;
    let data = { full_name, email, pass_word: bcrypt.hashSync(pass_word, 10) };
    await model.user.create(data);
    // res.send("Token");
    successCode(res, data, "Signup sucess");
    return;
  } catch (err) {
    failCode(res, "Lỗi BE");
  }
};

//commonjs
module.exports = {
  getUser,
  createUser,
  userLogin,
  userSignup,
};
