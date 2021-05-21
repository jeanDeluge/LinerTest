'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Page extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //Page.hasMany(models.Highlights)
      //Page.belongsTo(models.User)//자신의 primarykey
    }
  };
  Page.init({
    page_Url: DataTypes.STRING,
    user_Id : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Page',
  });
  return Page;
};