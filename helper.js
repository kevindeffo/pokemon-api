const { Ability, Trainer, Pokemon } = require('./models');

exports.success = (message, data) => {
    return { message, data };
};

exports.getUniqueId = (pokemons) => {
    const pokemonsIds = pokemons.map((pokemon) => pokemon.id);
    const maxId = pokemonsIds.reduce((a, b) => Math.max(a, b));
    const uniqueId = maxId + 1;

    return uniqueId;
};

exports.isTrainerOwner = async (trainerId, pokemonId) => {
    try {
        const trainer = await Trainer.findByPk(trainerId, {
            include: [{ model: Pokemon, where: { id: pokemonId } }]
        });
        return !!trainer;
    } catch (error) {
        console.error('Error checking trainer ownership:', error);
        return false;
    }
};

exports.hasPokemonAbility = async (pokemonId, abilityName) => {
    try {
        const pokemon = await Pokemon.findByPk(pokemonId, {
            include: [{ model: Ability, where: { name: abilityName } }]
        });
        return !!pokemon;
    } catch (error) {
        console.error('Error checking Pokémon ability:', error);
        return false;
    }
};