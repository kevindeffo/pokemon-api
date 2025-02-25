const {Pokemon} = require("../db/sequelize");

module.exports = (app) => {
    app.get("/api/pokemons/:id", (req, res) => {
        Pokemon.findByPk(req.params.id)
        .then(pokemon => {
            const message = "Un pokemon a bien ete recupere.";

            res.json({message, data: pokemon});
        })
        .catch(e => {
            const message = "Le  pokemon n'a pas pu etre recupere.Veuillez reesayer plutard svp.";

            res.status(500).json({
                message,
                data: e
            })
        })
    });
}