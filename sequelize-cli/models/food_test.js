'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food_test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Food_test.init({
    food_id: DataTypes.INTEGER,
    food_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Food_test',
  });
  return Food_test;
};