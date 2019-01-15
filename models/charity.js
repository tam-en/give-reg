'use strict';
module.exports = (sequelize, DataTypes) => {
  const charity = sequelize.define('charity', {
    ein: DataTypes.STRING,
    charityName: DataTypes.STRING,
    category: DataTypes.STRING,
    cause: DataTypes.STRING,
    tagLine: DataTypes.STRING,
    mission: DataTypes.TEXT,
    websiteURL: DataTypes.TEXT,
    charityNavigatorURL: DataTypes.TEXT,
    irsSubsection: DataTypes.STRING,
    streetAddress1: DataTypes.STRING,
    streetAddress2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    country: DataTypes.STRING,
    rating: DataTypes.STRING,
    starsLarge: DataTypes.STRING
  }, {});
  charity.associate = function(models) {
    models.charity.hasMany(models.ask);
  };
  return charity;
};