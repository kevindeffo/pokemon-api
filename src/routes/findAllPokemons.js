const {Pokemon} = require("../db/sequelize");
const {Op} = require("sequelize");
const auth = require("../auth/auth")

module.exports = (app) => {
    /**
   * @swagger
   * /api/pokemons:
   *   get:
   *     summary: Get all pokemons in the system
   *     tags: [Pokemons]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: query
   *         name: name
   *         schema:
   *           type: string
   *         description: Name of the Pokemon to search for
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           default: 5
   *         description: Maximum number of results to return
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Pokemon'
   *       400:
   *         description: Bad Request
   *       500:
   *         description: Internal Server Error
   */
    app.get("/api/pokemons", auth, (req, res) => {
        if (req.query.name) {
            const name = req.query.name;
            const limit = parseInt(req.query.limit) || 5;

            if (name.length > 1) {
                return Pokemon.findAndCountAll({
                    where: {
                        name: {
                            [Op.like]: `%${name}%`
                        }
                    },
                    order: ["name"],
                    limit: limit
                })
                .then(({count, rows}) => {
                    const message = `Il y a ${count} pokemons correspondant a la recherche ${name}.`;
    
                    res.json({message, data: rows});
                });
            } else {
                return res.status(400).json({message: "Le terme de recherche doit contenir au moins 2 caractere."});
            }


        } else {
            Pokemon.findAll({order: ["name"]})
            .then(pokemons => {
                const message = "la liste des pokemons a bien ete recupere.";
    
                res.json({message, data: pokemons});
            })
            .catch(e => {
                const message = "Le liste des pokemon n'a pas pu etre recupere.Veuillez reesayer plutard svp.";
    
                res.status(500).json({
                    message,
                    data: e
                })
            })
        }
    });
}