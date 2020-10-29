import db from '../../sequelize';
const axios = require('axios');

module.exports = (app) => {
    app.get('/getTeam/:teamId', async (req, res, next) => {
        const teamId = req.params.teamId;
        await axios.get(`http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${teamId}`)
            .catch( err => {
                console.log(err.message)
                res.send('Request failed.')
            })
            .then(requestedTeam => {
                if(!requestedTeam) {
                    res.send('Please try again later.')
                }
                const { team } = requestedTeam.data;
                db.Team.create({
                    id: team.id,
                    displayName: team.displayName,
                    location: team.location,
                    slug: team.slug,
                    shortDisplayName: team.shortDisplayName,
                    color: team.color,
                    alternateColor: team.alternateColor,
                    logo: team.logos[0].href,
                    link: team.links[0].href,
                }).then(team => {
                    console.log('=====>  ', team.dataValues.displayName);
                    const inserted = team.dataValues.displayName;
                    res.send(`Inserted ${inserted} into the database.`);
                }).catch(err => {
                    // handle error;
                   if(err.parent.sqlMessage) {
                       res.send(err.parent.sqlMessage);
                   } else {
                       console.log(err);
                   }
                  });
            })
        })
};