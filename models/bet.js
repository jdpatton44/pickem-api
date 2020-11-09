/* eslint-disable indent */
/**
 * @swagger
 * definitions:
 *   Teams:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       team:
 *         type: integer
 *       game:
 *         type: integer
 *       amount:
 *         type: integer
 *       user:
 *         type: integer
 *       required:
 *         - id
 *         - team
 *         - game
 *         - user
 *         - amount
 */

module.exports = (sequelize, type) => {
    const bet = sequelize.define('bet', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    team: {
        type: type.INTEGER,
        allowNull: false,
        references: {
            model: 'team',
            key: 'id',
        },
    },
    game: {
        type: type.INTEGER,
        allowNull: false,
        references: {
            model: 'game',
            key: 'id',
        },
    },
    amount: {
        type: type.INTEGER,
        allowNull: false,
    },
    user: {
        type: type.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id',
        },
    },
  }, {});
  return bet;
}
