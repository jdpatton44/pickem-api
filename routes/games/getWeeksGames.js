const axios = require('axios');
import db from '../../sequelize';

module.exports = (app) => {
    app.get('/getWeeksGames/:week', async (req, res, next) => {
        const teams =  db.Team.findAll()
            .catch(err => {
                console.log(err);
                return err;
            })
            .then(teams => {
                return teams;
            })
        
        const games = db.Game.findAll({
            where: {
                week: req.params.week,
            }
            }).catch(err => {
                console.log(err);
                return err;
            }).then(games => {
                return games;
            })
        const promises = Promise.all([games, teams])
            .catch(err => {
                res.status(400).send(err);
            })
            .then(data => {
                res.status(200).send(data);
            });
        })
        
};