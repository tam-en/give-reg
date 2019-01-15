// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const user = sequelize.define('user', {
//     firstname: DataTypes.STRING,
//     lastname: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//     bio: DataTypes.TEXT
//   }, {});
//   user.associate = function(models) {
//     models.user.hasMany(models.event);
//     models.user.hasMany(models.give);
//   };
//   return user;
// };

/////////

'use strict';
var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Please enter a valid e-mail address.'
        }  
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 20],
          msg: 'Your password must be between 8 and 20 characters long.'
        }
      }
    },
    bio: DataTypes.TEXT 
  }, {
    hooks: {
      beforeCreate: function(pendingUser){
        if(pendingUser) {
          var hash = bcrypt.hashSync(pendingUser.password, 12); // second arg = salt length. default is ten
          pendingUser.password = hash;
        }
      }
    }
  });
  user.associate = function(models) {
    models.user.hasMany(models.event);
    models.user.hasMany(models.give);
  };
  user.prototype.validPassword = function(typedPassword){
    return bcrypt.compareSync(typedPassword, this.password);
  }
  return user;
};
