const {User} = require("../db/sequelize")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const privateKey = require("../auth/private_key")

module.exports = (app) => {
    /**
   * @swagger
   * /api/login:
   *   post:
   *     summary: Log user
   *     tags: [Users]
   *     requestBody:
   *          required: true
   *          content:
   *            application/json:
   *               schema:
   *                type: object
   *                properties:
   *                   username:
   *                     type: string
   *                   password:
   *                      type: string
   *                required:
   *                  - username
   *                  - password
   *     responses:
   *       200:
   *         description: User logged in successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 data:
   *                   $ref: '#/components/schemas/User'
   *                 token:
   *                   type: string
   *       401:
   *         description: Invalid username or password
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *       404:
   *         description: User not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 data:
   *                   type: object
   */
    app.post("/api/login", (req, res) => {
        User.findOne({where: {username: req.body.username}})
        .then(user => {
            if (!user) {
                const message = "Utilisateur non existant";

                return res.status(404).json({message})
            }

            bcrypt.compare(req.body.password, user.password)
            .then(isPasswordValid => {
                if (!isPasswordValid) {
                    const message = "Nom d'utilisateur ou mot de passe incorrect";

                    return res.status(401).json({message})
                }

                const token = jwt.sign({userId: user.id}, privateKey, {expiresIn: "24h"})

                const message = "l'utilisateur a ete connecte avec succes";

                return res.json({message, data: user, token})
            })
        })
        .catch(e => {
            const message = "Une erreur est survenue veillez reesayer plus tard";

            return res.status(500).json({message, data: e});
        })
    })
}