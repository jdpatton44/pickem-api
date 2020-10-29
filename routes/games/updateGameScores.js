const axios = require('axios');
import db from '../../sequelize';

module.exports = (app) => {
    app.get('/updateGameScores', async (req, res, next) => {
        await axios.get(`http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard`)
        .catch( err => {
            console.log(err.message)
            res.send('Request failed.')
        })
        .then(espnEvents => {
            if(!espnEvents) {
                res.send('Please try again later.')
            }
            const weekNum = espnEvents.data.week.number;
            const events = espnEvents.data.events.map(event => {
                return event;
            })
            const startedEvents = events.filter(event => event.competitions[0].status.type.id === '1');
            const updates = startedEvents.map(event => {
                const update = {
                    id: event.competitions[0].id,
                    homeScore: event.competitions[0].competitors[0].homeAway === "home" ? event.competitions[0].competitors[0].score : event.competitions[0].competitors[1].score,
                    visitorScore: event.competitions[0].competitors[0].homeAway === "home" ? event.competitions[0].competitors[0].score : event.competitions[0].competitors[1].score,
                    status: event.competitions[0].status.type.id,
                };
                return update;

            });
            const dbUpdates = updates.map( async update => {
                const dbUpdate = await db.Game.update({
                    homeScore: update.homeScore, 
                    visitorScore: update.visitorScore, 
                    status: parseInt(update.status)
                },{
                    returning: true,
                    where: {id: parseInt(update.id)},
                });
                return dbUpdate;
            }); 
            return dbUpdates;
        })
        .catch(err => console.log(err))
        .then(() => {
            res.send('Game Scores Updated');
        });
    })
};