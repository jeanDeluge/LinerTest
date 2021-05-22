'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Theme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     Theme.belongsTo(models.User, {foreignKey:"theme_Id",sourceKey:"id"})
    }
  };
  Theme.init({
    color1: DataTypes.STRING,
    color2: DataTypes.STRING,
    color3: DataTypes.STRING,
    user_Id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Theme',
  });
  return Theme;
};