const axios = require('axios');
import db from '../../sequelize';

module.exports = (app) => {
    app.post('/setSingleLine/', (req, res, next) => {
        console.log(req.body);
        console.log('==============================================');
        if( req.body.gameId === null || req.body.newLine === null ) {
            res.status(400).send('please try again');
        };
        const updatedLine = db.Game.update({ 
                line: req.body.newLine, 
            }, { 
                where: {id: req.body.gameId} 
            })
            .then(() => {
                res.send('Updated Line.')
            })
            .catch( err => {
                console.log(err)
                res.send(err);
            });
    });
    
}