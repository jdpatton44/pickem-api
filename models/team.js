/* eslint-disable indent */
/**
 * @swagger
 * definitions:
 *   Teams:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       displayName:
 *         type: string
 *       location:
 *         type: string
 *       slug:
 *         type: string
 *       shortDisplayName:
 *         type: string
 *       color:
 *         type: string
 *       alternateColor:
 *         type: string
 *       logo:
 *         type: string
 *       link:
 *         type: string
 *       required:
 *         - id
 *         - displayName
 *         - location
 *         - slug
 */

module.exports = (sequelize, type) => {
  const team = sequelize.define('team', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
    },
    displayName: type.STRING,
    location: type.STRING,
    slug: type.STRING,
    shortDisplayName: type.STRING,
    color: type.STRING,
    alternateColor: type.STRING,
    logo: type.STRING,
    link: type.STRING,
  })
  return team;
};
