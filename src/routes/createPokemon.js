const { Pokemon } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");

module.exports = (app) => {
    /**
     * @swagger
     * /api/pokemons:
     *    post:
     *      summary: Create pokemon
     *      tags: [Pokemons]
     *      requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                name:
     *                  type: string
     *                hp:
     *                  type: number
     *                cp:
     *                  type: number
     *                picture:
     *                  type: string
     *                types:
     *                  type: array
     *                  items:
     *                    type: string
     *      responses:
     *        200:
     *          description: Pokemon created successfully
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  message:
     *                    type: string
     *                  data:
     *                    type: object
     *        400:
     *          description: Validation error
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  message:
     *                    type: string
     *                  data:
     *                    type: object
     *        500:
     *          description: Server error
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  message:
     *                    type: string
     *                  data:
     */
    app.post("/api/pokemons", (req, res) => {
        Pokemon.create(req.body)
            .then(pokemon => {
                const message = "Un nouveau pokemon a bien été créé";
                res.json({ message, data: pokemon });
            })
            .catch(e => {
                if (e instanceof ValidationError || e instanceof UniqueConstraintError) {
                    return res.status(400).json({ message: e.message, data: e });
                }
                const message = "Le pokemon n'a pas pu être créé. Veuillez réessayer plus tard, s'il vous plaît.";
                res.status(500).json({ message, data: e });
            });
    });
};