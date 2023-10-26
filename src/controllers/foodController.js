const { Op } = require("sequelize");
// import hàm quản lý các đối tượng model
const iniModels = require("../models/init-models");
// import chuỗi kết nối CSDL
const sequelize = require("../models/index");

const { successCode, errorCode, failCode } = require("../config/response");
const { decriptToken } = require("../config/jwt");
// đối tượng chứa các model trong database
const model = iniModels(sequelize);

const getFood = async (req, res) => {
  let { token } = req.headers;
  let decodeToken = decriptToken(token);
  // try {
  // sequelize.query("SELECT * FROM user")

  // JOIN
  let data = await model.food.findAll();

  successCode(res, data, "get food success");
  // }
  // catch (err) {
  //     failCode(res, "Lỗi BE");
  // }
};

const createFood = async (req, res) => {
  try {
    const { food_name, image, price, desc, type_id } = req.body;

    // INSERT INTO VALUES
    let newModel = {
      food_name,
      image,
      price,
      desc,
      type_id,
    };

    let data = await model.food.create(newModel);

    // console.log(data);

    successCode(res, newModel, "Food created");
  } catch (err) {
    failCode(res, "Lỗi BE");
  }
};

// UPDATE
const updateFood = async (req, res) => {
  try {
    let { food_id } = req.params;
    const { food_name, image, price, desc, type_id } = req.body;

    let modelUpdate = { food_name, image, price, desc, type_id };

    //UPDATE SET WHERE
    await model.food.update(modelUpdate, { where: { food_id } });

    // res.status(200).send("Food Updated");
    successCode(res, modelUpdate, "Food Updated");
  } catch (err) {
    failCode(res, "Lỗi BE");
  }
};

const removeFood = async (req, res) => {
  try {
    // DELETE FROM WHERE

    let { food_id } = req.params;
    await model.food.destroy({ where: { food_id } });
    // res.status(200).send("Food Removed");
    successCode(res, "Food Removed");
  } catch (err) {
    failCode(res, "Lỗi BE");
  }
};

module.exports = { getFood, createFood, updateFood, removeFood };
