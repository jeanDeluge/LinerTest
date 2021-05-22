'use strict';

const user = require("../models/user");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      page_Url: {
        type: Sequelize.STRING
      },userId:{
        type: Sequelize.INTEGER,
        references:{
          model: 'users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(function(){
      queryInterface.createTable('P', {
        users_id:{
          type: Sequelize.INTEGER,
          references:{model: 'users', key: 'id'}
        }
      })
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pages');
  }
};