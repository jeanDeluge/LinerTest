'use strict';
const { text } = require('express');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Highlights extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //Highlights.belongsTo(models.Page)
    }
  };
  Highlights.init({
    text: DataTypes.STRING,
    colorHex: DataTypes.STRING,
    page_Id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Highlights',
  });
  return Highlights;
};