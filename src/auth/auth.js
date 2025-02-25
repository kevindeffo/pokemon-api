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

module.exports.verifyResetToken = (req, res, next) => {
    const resetToken = req.params.token;

    if (!resetToken) {
        const message = "Aucun jeton de réinitialisation fourni."
        return res.status(400).json({ message });
    }

    User.findOne({
        where: {
            resetPasswordToken: resetToken,
            resetPasswordExpires: { [Op.gt]: Date.now() }
        }
    }).then(user => {
        if (!user) {
            const message = "Le jeton de réinitialisation de mot de passe est invalide ou a expiré."
            return res.status(400).json({ message });
        }
        req.user = user;
        next();
    }).catch(error => {
        const message = "Une erreur est survenue, veuillez réessayer plus tard."
        res.status(500).json({ message, error });
    });
};