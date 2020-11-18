import Sequelize from 'sequelize';

require('dotenv').config({ path: 'process.env' });

const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: true,
  define: {
    timestamps: true,
}
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./models/user')(sequelize, Sequelize);
db.Team = require('./models/team')(sequelize, Sequelize);
db.Game = require('./models/game')(sequelize, Sequelize);
db.Bet = require('./models/bet')(sequelize, Sequelize);

sequelize.sync().then(() => {
  // eslint-disable-next-line no-console
  console.log('Tables have been created');
});


module.exports = db;