'use strict';
module.exports = (sequelize, DataTypes) => {
  const ask = sequelize.define('ask', {
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    charityEIN: DataTypes.STRING,
    eventId: DataTypes.INTEGER,
    userEventId: DataTypes.INTEGER
  }, {});
  ask.associate = function(models) {
    models.ask.hasMany(models.give);
    models.ask.belongsTo(models.charity);
    models.ask.belongsTo(models.event);
  };
  return ask;
};