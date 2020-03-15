
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('manager', {
      managerid:{
        type:DataTypes.STRING(45),
        allowNull:false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    }, {
      tableName: 'manager',
      timestamps:false,
    });
  };
  