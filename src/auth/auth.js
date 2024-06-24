const jwt = require("jsonwebtoken")
const privateKey = require("../auth/private_key")

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader) {
        const message = "veuillez fournir un jeton d'authentification dans l'entete de votre requete"

        return res.status(401).json({message})
    }

    const token = authorizationHeader.split(" ")[1]
    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
        if (error) {
            const message = "Vous n'ete pas authorise a acceder a cette ressource"

            return res.status(401).json({message})
        }

        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            const message = "L'identifiant de l'utilisateur est invalide"

            return res.status(401).json({message})
        } else {
            next()
        }
    })
}