const axios = require('axios');
import db from '../../sequelize';

module.exports = (app) => {
    app.get('/getUserBets/:userId', async (req, res, next) => {
        const bets =  db.Bet.findAll({
          where: {
            user: req.params.userId,
          }
        })
        .catch(err => {
            console.log(err);
            return err;
        })
        .then(bets => {
          res.status(200).send(bets);
        });
    })
        
};