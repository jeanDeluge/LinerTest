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
     User.Page= User.hasMany(models.Page, {foreignKey:'userId', sourceKey:'id', as:'pages'});//sourcekey : Page의 Primarykey
     // User.belongsToMany(models.Theme, { foreignKey: "id", sourceKey:"id", through: "UserThemes"});
    }
  };
  User.init({
    username : DataTypes.STRING,
    theme_Id: DataTypes.INTEGER,
    currentTheme: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User'
    
  });
  return User;
};