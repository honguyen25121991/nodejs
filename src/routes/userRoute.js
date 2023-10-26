const express = require("express");
const userRouter = express.Router();

const {
  getUser,
  createUser,
  userLogin,
  userSignup,
} = require("../controllers/userController");

// tạo API
userRouter.get("/get-user", getUser);

userRouter.post("/create-user", createUser);

// API login
userRouter.post("/login", userLogin); // Read find
//API signup
userRouter.post("/signup", userSignup); //===>Create

module.exports = userRouter;
