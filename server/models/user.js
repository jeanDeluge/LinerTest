'use strict';
const {
  Model
} = require('sequelize');
const highlights = require('./highlights');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Pages, { foreignKey: "page_Id", sourceKey:"id"});
      User.hasMany(models.theme_Id, { foreignKey: "theme_Id", sourceKey:"id"});
    }
  };
  User.init({
    theme_Id: DataTypes.INTEGER,
    page_Id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};