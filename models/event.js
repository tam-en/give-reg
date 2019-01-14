'use strict';
module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    date: DataTypes.DATE,
    url: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  event.associate = function(models) {
    models.event.hasMany(models.ask);
    models.event.belongsTo(models.user);
  };
  return event;
};