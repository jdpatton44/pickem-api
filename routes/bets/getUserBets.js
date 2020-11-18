import passport from 'passport'
import db from '../../sequelize';

module.exports = (app) => {
    app.post('/getUserBets', (req, res, next) => {
      console.log(req.body)
      passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
          console.error(err);
        }
        if (info !== undefined) {
          console.error(info.message);
          res.status(403).send(info.message);
        } else {
          db.Bet.findAll({
              where: {
                  user: req.body.user
                } 
          })
          .then((bets) => {
            if (bets != null) {
              
              res.status(200).send({ auth: true, bets});
              
            } else {
              console.error('error retrieving bets');
              res.status(401).send('error retrieving bets');
            }
          });
        }
      })(req, res, next);
    });
  };