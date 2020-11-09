const axios = require('axios');
import db from '../../sequelize';

module.exports = (app) => {
    app.post('/setLine/', async (req, res, next) => {
        // if( req.body.gameId === null ) {
        //     res.status(400).send('please try again');
        // };
        // const game = await db.Game.findOne( {id: req.body.gameId}).catch(err => console.log(err) 
            
            
        // const updatedLine = await db.Game.update({ line: req.body.line, }, { where: {id: req.body.gameId} });
        res.status(200).send()
    });
}