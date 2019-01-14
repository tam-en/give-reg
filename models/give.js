'use strict';
module.exports = (sequelize, DataTypes) => {
  const give = sequelize.define('give', {
    amount: DataTypes.DECIMAL,
    message: DataTypes.TEXT,
    askId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  give.associate = function(models) {
    // associations can be defined here
    models.give.belongsTo(models.ask);
    models.give.belongsTo(models.user);
  };
  return give;
};