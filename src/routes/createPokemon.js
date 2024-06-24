const {Pokemon} = require("../db/sequelize");
const {ValidationError, UniqueConstraintError} = require("sequelize")

module.exports = (app) => {
    app.post("/api/pokemons", (req, res) => {
        Pokemon.create(req.body)
        .then(pokemons => {
            const message = "Un nouveau pokemon a bien ete cree";

            res.json({message, data: pokemons});
        })
        .catch(e => {
            if (e instanceof ValidationError) {
                return res.status(400).json({message: e.message, data: e})
            }

            if (e instanceof UniqueConstraintError) {
                return res.status(400).json({message: e.message, data: e})
            }
            const message = "Le  pokemon n'a pas pu etre cree.Veuillez reesayer plutard svp";

            res.status(500).json({
                message,
                data: e
            })
        })
    });
}