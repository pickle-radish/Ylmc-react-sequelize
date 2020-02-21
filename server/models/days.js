
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('days', {
      attendance_day: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      }
    }, {
      tableName: 'days',
      timestamps:false,
    });
  };
  