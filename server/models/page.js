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
      Page.Highlights = Page.hasMany(models.Highlights,{foreignKey:'pageId', sourceKey: 'id', as:'highlights'})
      Page.User=Page.belongsTo(models.User , {foreignKey:'userId',targetKey:'id', as: 'user', constraints:false})

    }
  };
  Page.init({
    page_Url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Page',
  });
  return Page;
};