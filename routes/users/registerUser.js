/* eslint-disable arrow-parens */
/* eslint-disable no-console */
import passport from 'passport';
import db from '../../sequelize';

/**
 * @swagger
 * /registerUser:
 *   post:
 *     tags:
 *       - Users
 *     name: Register
 *     summary: Register a new user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/User'
 *           type: object
 *           properties:
 *             first_name:
 *               type: string
 *             last_name:
 *               type: string
 *             username:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - username
 *           - email
 *           - password
 *     responses:
 *       '200':
 *         description: User created
 *       '403':
 *         description: Username or email already taken
 */

module.exports = app => {
  app.post('/registerUser', (req, res, next) => {
    console.log('register user - ', req);
    passport.authenticate('register', (err, user, info) => {
      if (err) {
        console.error(err);
      }
      if (info !== undefined) {
        console.error(info.message);
        res.status(403).send(info.message);
      } else {
        // eslint-disable-next-line no-unused-vars
        req.logIn(user, error => {
          console.log(user);
          const data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            username: user.username,
          };
          console.log(data);
          db.User.findOne({
            where: {
              username: data.username,
            },
          }).then(user => {
            console.log(user);
            user
              .update({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                points: 10000,
              })
              .then(() => {
                console.log('user created in db');
                res.status(200).send({ message: 'user created' });
              });
          });
        });
      }
    })(req, res, next);
  });
};
