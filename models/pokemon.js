const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const Trainer = require('./trainer'); // Assuming there's a Trainer model
const PokemonType = require('./pokemonType'); // Assuming there's a PokemonType model

const Pokemon = sequelize.define('Pokemon', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'updated'
});

// Define associations
Pokemon.belongsTo(Trainer, {
    foreignKey: 'trainerId',
    as: 'trainer'
});

Pokemon.belongsToMany(PokemonType, {
    through: 'PokemonPokemonTypes', // Junction table
    as: 'types',
    foreignKey: 'pokemonId'
});

PokemonType.belongsToMany(Pokemon, {
    through: 'PokemonPokemonTypes',
    as: 'pokemons',
    foreignKey: 'pokemonTypeId'
});

module.exports = Pokemon;