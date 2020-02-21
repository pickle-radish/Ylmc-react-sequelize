
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('manager', {
      password: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    }, {
      tableName: 'manager',
      timestamps:false,
    });
  };
  