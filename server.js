import express from 'express';
import Cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import helmet from 'helmet';

const app = express();

const API_PORT = process.env.API_PORT || 3003;

const swaggerDefinition = {
  info: {
    title: `Freddy's Football Pick'em`,
    version: '1.0.0',
    description: `Endpoints to the pick'em`,
  },
  host: 'localhost:3003',
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

require('./config/passport');

const whitelist = [
  'http://localhost:3031',
  'http://localhost:3000',
  'http://localhost:3003',
  'http://localhost:4000',
];

//
// TODO: FIX CORS FOR PRODUCTION!
//
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) === -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(Cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(helmet());
app.use(passport.initialize());

require('./routes/users/loginUser')(app);
require('./routes/users/registerUser')(app);
require('./routes/users/forgotPassword')(app);
require('./routes/users/resetPassword')(app);
require('./routes/users/updatePassword')(app);
require('./routes/users/updatePasswordViaEmail')(app);
require('./routes/users/findUsers')(app);
require('./routes/users/deleteUser')(app);
require('./routes/users/updateUser')(app);
require('./routes/teams/getTeam')(app);
require('./routes/games/getGames')(app);
require('./routes/games/updateGameScores')(app);

// eslint-disable-next-line no-console
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

module.exports = app;
