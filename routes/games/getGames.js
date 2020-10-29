const axios = require('axios');
import db from '../../sequelize';

module.exports = (app) => {
    app.get('/getGames', async (req, res, next) => {
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
            const games = events.map(event => {
                const game = {    
                  id: event.id,
                  week: weekNum,
                  homeTeam: event.competitions[0].competitors[0].homeAway ? event.competitions[0].competitors[0].id : event.competitions[0].competitors[1].id,
                  visitingTeam: event.competitions[0].competitors[0].homeAway ? event.competitions[0].competitors[1].id : event.competitions[0].competitors[0].id,
                  date: event.competitions[0].date,
                  venue: event.competitions[0].venue.fullName,
                  homeScore: event.competitions[0].competitors[0].homeAway ? event.competitions[0].competitors[0].score : event.competitions[0].competitors[1].score,
                  visitorScore: event.competitions[0].competitors[0].homeAway ? event.competitions[0].competitors[1].score : event.competitions[0].competitors[0].score,
                  status: event.competitions[0].status.type.id,
                };
                return game;
            })
            let insertError = false;
            db.Game.bulkCreate(games).catch(err => {
                console.log(err.parent);
                insertError = true;
            }).then(err => {
                console.table(games);
                res.send(insertError ? 'Failed to insert games into the database.' : games);
            });
        })
    })
};