
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('attendance', {
      newFriend: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    }, {
      tableName: 'attendance',
      timestamps:false,
    });
  };
  