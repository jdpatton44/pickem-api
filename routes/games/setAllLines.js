const axios = require('axios');
import db from '../../sequelize';

module.exports = (app) => {
    app.post('/setAllLines/', (req, res, next) => {
        const { games } = req.body;
        if( !req.body.games ) {
            res.status(400).send('please try again');
        };
        const updatedGames = games.map(game => {
            console.log(game.id, ' - ', game.line);
            const lineFloat = parseFloat(game.line);
            const updatedGame = db.Game.update({ 
                line: lineFloat, 
            }, { 
                where: {id: game.id} 
            })
            .catch(err => {
                console.log(err);
                res.status(400).send(err);
            })
            return updatedGame;
        });
        res.status(200).send(updatedGames);
    });
}