
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('member', {
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      b_day: {
        type: DataTypes.DATEONLY,
      },
      pasture: {
        type: DataTypes.STRING(45),
      },
      farm: {
        type: DataTypes.STRING(45),
      },
      school: {
        type: DataTypes.STRING(45),
      },
      year: {
        type: DataTypes.INTEGER,
      },
      area: {
        type: DataTypes.STRING(45),
      },
      phone: {
        type: DataTypes.STRING(13),
      },
      parents_phone: {
        type: DataTypes.STRING(13),
      },
      gender: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isStudent: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      expelled:{
          type: DataTypes.BOOLEAN,
          defaultValue: false,
      }
    }, {
      tableName: 'member',
      charset: 'utf8',
      collate: 'utf8_general_ci', 
      timestamps:false,
    });
  };
  