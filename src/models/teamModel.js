const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const Pokemon = require('./pokemon'); // Assuming there's a Pokemon model to associate with

const Team = sequelize.define('Team', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: 'Le nom de l\'équipe est déjà pris'
        },
        validate: {
            notEmpty: {
                msg: 'Le champ name ne doit pas être vide'
            }
        }
    }
}, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'updated'
});

Team.hasMany(Pokemon, { as: 'pokemons' });
Pokemon.belongsTo(Team, {
    foreignKey: 'teamId',
    as: 'team'
});

module.exports = Team;