/* eslint-disable indent */
/**
 * @swagger
 * definitions:
 *   Games:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       week:
 *         type: integer
 *       homeTeam:
 *         type: integer
 *       visitingTeam:
 *         type: integer
 *       date:
 *         type: date
 *       venue:
 *         type: string
 *       homeScore:
 *         type: integer
 *       visitScore:
 *         type: integer
 *       status:
 *         type: integer
 *       required:
 *         - id
 *         - week
 *         - homeTeam
 *         - visitingTeam
 *         - venue
 *         - status
 */

module.exports = (sequelize, type) => sequelize.define('game', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    week: type.INTEGER,
    homeTeam: type.INTEGER,
    visitingTeam: type.INTEGER,
    date: type.DATE,
    venue: type.STRING,
    homeScore: type.INTEGER,
    visitorScore: type.INTEGER,
    status: type.INTEGER,

  });
