const {Pokemon} = require("../db/sequelize");

module.exports = (app) => {
    app.delete("/api/pokemons/:id", (req, res) => {
        Pokemon.findByPk(req.params.id)
        .then(pokemon => {
            if (pokemon === null) {
                const message = "le pokemon que vous essaye de supprimer n'existe pas";

                res.status(404).json({message});
            }
            const pokemonDeleted = pokemon;
            return Pokemon.destroy({
                where: {
                    id: pokemon.id
                }
            }).then(_=> {
                const message = "Le pokemon a bien ete supprime";

                res.json({message, data: pokemonDeleted});
            })
            .catch(e => {
                const message = "Le  pokemon n'a pas pu etre supprime. Veuillez reesayer plutard svp";
    
                res.status(500).json({
                    message,
                    data: e
                })
            })
        })
    });
}