'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {});
  user.associate = function(models) {
    models.user.hasMany(models.event);
    models.author.hasMany(models.give);
  };
  return user;
};