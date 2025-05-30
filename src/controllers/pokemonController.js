const { Pokemon, Trainer, PokemonType, Ability } = require('../db/sequelize');
const validatePokemonData = require('../helpers/validate-pokemon-data');

// Ensure associations are defined in models/pokemon.js
// Assuming associations are defined as follows:
// Pokemon.belongsTo(Trainer, { as: 'trainer', foreignKey: 'trainerId' });
// Pokemon.belongsTo(PokemonType, { as: 'type', foreignKey: 'typeId' });
// Pokemon.belongsToMany(Ability, { through: 'PokemonAbilities', as: 'abilities' });

module.exports = {
    createPokemon: async (req, res) => {
        try {
            const { trainerId, typeId, abilities } = req.body;

            // Validate trainerId and typeId
            const isTrainerValid = await validatePokemonData.validateTrainer(trainerId);
            const isTypeValid = await validatePokemonData.validateType(typeId);
            if (!isTrainerValid || !isTypeValid) {
                return res.status(400).json({ message: "Invalid trainerId or typeId." });
            }

            // Validate abilities
            const areAbilitiesValid = await validatePokemonData.validateAbilities(abilities);
            if (!areAbilitiesValid) {
                return res.status(400).json({ message: "One or more abilities are invalid." });
            }

            const pokemon = await Pokemon.create(req.body);
            res.status(201).json({ message: "Pokemon created successfully.", data: pokemon });
        } catch (error) {
            res.status(500).json({ message: "Pokemon could not be created. Please try again later.", data: error });
        }
    },
    updatePokemon: async (req, res) => {
        try {
            const { trainerId, typeId, abilities } = req.body;
            const id = req.params.id;

            // Validate trainerId and typeId
            const isTrainerValid = await validatePokemonData.validateTrainer(trainerId);
            const isTypeValid = await validatePokemonData.validateType(typeId);
            if (!isTrainerValid || !isTypeValid) {
                return res.status(400).json({ message: "Invalid trainerId or typeId." });
            }

            // Validate abilities
            const areAbilitiesValid = await validatePokemonData.validateAbilities(abilities);
            if (!areAbilitiesValid) {
                return res.status(400).json({ message: "One or more abilities are invalid." });
            }

            await Pokemon.update(req.body, { where: { id } });
            const pokemon = await Pokemon.findByPk(id);
            if (!pokemon) {
                return res.status(404).json({ message: "Pokemon not found." });
            }
            res.status(200).json({ message: "Pokemon updated successfully.", data: pokemon });
        } catch (error) {
            res.status(500).json({ message: "Pokemon could not be updated. Please try again later.", data: error });
        }
    },
    findAllPokemons: async (req, res) => {
        try {
            const user = req.user; // Assuming user is attached to the request
            const allowedFields = user.role === 'trainer' ? ['name', 'typeId', 'abilities'] : ['name', 'typeId', 'abilities', 'trainerId'];

            const pokemons = await Pokemon.findAll({
                attributes: allowedFields,
                include: [
                    { model: Trainer, as: 'trainer', attributes: ['name'] },
                    { model: PokemonType, as: 'type', attributes: ['name'] },
                    { model: Ability, as: 'abilities', attributes: ['name'] }
                ]
            });
            res.status(200).json({ message: "Pokemons retrieved successfully.", data: pokemons });
        } catch (error) {
            res.status(500).json({ message: "Could not retrieve pokemons. Please try again later.", data: error });
        }
    }
};