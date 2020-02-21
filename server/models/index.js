const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.Member=require('./member')(sequelize,Sequelize);
db.Days=require('./days')(sequelize,Sequelize);

db.Member.belongsToMany(db.Days, {through: 'Attendance'});
db.Days.belongsToMany(db.Member, {through: 'Attendance'});


module.exports = db;