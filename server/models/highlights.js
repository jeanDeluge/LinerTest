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
      Highlights.Page= Highlights.belongsTo(models.Page,{foreignKey:'pageId', as:'page', targetKey: 'id', constraints:false});
      Highlights.User= Highlights.belongsTo(models.User,{foreignKey:'userId', as:'user', targetKey:'id', constraints:false})
    }
  };
  Highlights.init({
    text: DataTypes.STRING,
    colorHex: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Highlights'
  });
  return Highlights;
};