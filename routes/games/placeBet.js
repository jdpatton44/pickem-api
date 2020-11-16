import passport from 'passport'
import db from '../../sequelize';

module.exports = (app) => {
    app.post('/placeBet', (req, res, next) => {
      passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
          console.error(err);
        }
        if (info !== undefined) {
          console.error(info.message);
          res.status(403).send(info.message);
        } else {
          db.User.findOne({
            where: {
              username: req.body.user,
            },
          }).then((userInfo) => {
            if (userInfo != null) {
              console.log('user found in db');
              db.Bet.create({
                  game: req.body.game,
                  team: req.body.team,
                  amount: req.body.amount,
                  user: userInfo.id,
              })
                .then(() => {
                  console.log('bet placed!');
                  res.status(200).send({ auth: true, message: 'Bet Placed' });
                });
            } else {
              console.error('no user exists in db to update');
              res.status(401).send('no user exists in db to update');
            }
          });
        }
      })(req, res, next);
    });
  };