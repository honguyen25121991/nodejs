const express = require("express");
const foodRouter = express.Router();
const fs = require("fs");
const {
  getFood,
  createFood,
  updateFood,
  removeFood,
} = require("../controllers/foodController");
const multer = require("multer");
const { checkToken } = require("../config/jwt");

const storage = multer.diskStorage({
  destination: (req, file, callback) =>
    callback(null, process.cwd() + "/public/images"),
  filename: (req, file, callback) => {
    let newName = Date.now() + "_" + file.originalname;
    callback(null, newName);
  },
});
const upload = multer({
  storage: storage,
  //   dest: process.cwd() + "/public/images",
});
//API POST method update
foodRouter.post("/upload", upload.single("file"), (req, res) => {
  //lưu image : file.filename
  let file = req.file; // => base64
  fs.readFile(
    process.cwd() + "/public/images/" + file.filename,
    (err, data) => {
      let fileBase = `data:${file.mimetype};base64,${Buffer.from(data).toString(
        "base64"
      )}`;
      fs.unlink(process.cwd() + "/public/images/" + file.filename, (err) => {});
      //   console.log(data);
      res.send(fileBase);
    }
  );
  //   fs.readFile(process.cwd() + "./public/file/data.txt", "utf8", (err, data) => {
  //     res.send(data);
  //   });
  //   res.send(file);
});

// tạo API
// API get food
foodRouter.get(
  "/get-food",
  (req, res, next) => {
    try {
      //kierm tra token
      let { token } = req.headers;
      checkToken(token);
      //neu hop le
      next();
      // res.send("error");
    } catch (err) {
      console.log(err);
    }
  },
  getFood
);

// API create food
foodRouter.post("/create-food", createFood);

// API update food
foodRouter.put("/update-food/:food_id", updateFood);

// API delete food
foodRouter.put("/remove-food/:food_id", removeFood);

module.exports = foodRouter;
