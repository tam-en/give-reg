'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('charities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ein: {
        type: Sequelize.STRING
      },
      charityName: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      cause: {
        type: Sequelize.STRING
      },
      tagLine: {
        type: Sequelize.STRING
      },
      mission: {
        type: Sequelize.TEXT
      },
      websiteURL: {
        type: Sequelize.TEXT
      },
      charityNavigatorURL: {
        type: Sequelize.TEXT
      },
      irsSubsection: {
        type: Sequelize.STRING
      },
      streetAddress1: {
        type: Sequelize.STRING
      },
      streetAddress2: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      postalCode: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.STRING
      },
      starsLarge: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('charities');
  }
};