const axios = require('axios');
import db from '../../sequelize';

module.exports = (app) => {
    app.get('/getWeeksGames/:week', async (req, res, next) => {
        db.Game.findAll({
            Where: {
                week: req.params.week,
            }
            }).catch(err => {
                console.log(err);
                res.status(400).send(err);
            }).then(games => {
                res.status(200).send(games);
            });
        })
};