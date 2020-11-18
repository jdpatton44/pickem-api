import passport from 'passport'
import db from '../../sequelize';

module.exports = (app) => {
    app.post('/placeBet', (req, res, next) => {
      console.log(req.body)
      passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
          console.error(err);
        }
        if (info !== undefined) {
          console.error(info.message);
          res.status(403).send(info.message);
        } else {
          db.Bet.create({
            game: parseInt(req.body.event),
            team: parseInt(req.body.team),
            amount: parseInt(req.body.amount),
            user: parseInt(req.body.user),
          })
          .then((bet) => {
            if (bet != null) {
              console.log('bet placed!');
              res.status(200).send({ auth: true, message: 'Bet Placed' });
              
            } else {
              console.error('error placing bet');
              res.status(401).send('error placing bet');
            }
          });
        }
      })(req, res, next);
    });
  };