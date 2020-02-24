
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('days', {
      attendance_day: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        unique: true
      }
    }, {
      tableName: 'days',
      timestamps:false,
    });
  };
  