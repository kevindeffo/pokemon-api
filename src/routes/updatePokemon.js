const {Pokemon} = require("../db/sequelize");
const {ValidationError, UniqueConstraintError} = require("sequelize")

module.exports = (app) => {
    app.put("/api/pokemons/:id", (req, res) => {
        const id = req.params.id;
        Pokemon.update(req.body, {
            where: {id: id}
        })
        .then(() => {
            const message = "Un pokemon a bien ete modifier";

            res.json({message});
        })
        .catch(e => {
            if (e instanceof ValidationError) {
                return res.status(400).json({message: e.message, data: e})
            }

            if (e instanceof UniqueConstraintError) {
                return res.status(400).json({message: e.message, data: e})
            }
            const message = "Le  pokemon n'a pas pu etre modifie.Veuillez reesayer plutard svp";

            res.status(500).json({
                message,
                data: e
            })
        })
    });
}