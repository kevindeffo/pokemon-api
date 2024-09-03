const { User } = require('../db/sequelize');
const bcrypt = require('bcrypt');

module.exports = (app) => {
    app.post('/api/reset-password/:token', (req, res) => {
        User.findOne({
            where: {
                resetPasswordToken: req.params.token,
                resetPasswordExpires: { [Op.gt]: Date.now() }
            }
        }).then(user => {
            if (!user) {
                const message = "Le jeton de réinitialisation de mot de passe est invalide ou a expiré.";
                return res.status(400).json({ message });
            }

            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    const message = "Erreur lors du hachage du mot de passe.";
                    return res.status(500).json({ message, error: err });
                }

                user.password = hash;
                user.resetPasswordToken = null;
                user.resetPasswordExpires = null;
                user.save().then(() => {
                    const message = "Votre mot de passe a été réinitialisé avec succès.";
                    res.status(200).json({ message });
                }).catch(error => {
                    const message = "Une erreur est survenue lors de la réinitialisation du mot de passe.";
                    res.status(500).json({ message, error });
                });
            });
        }).catch(error => {
            const message = "Une erreur est survenue, veuillez réessayer plus tard.";
            res.status(500).json({ message, error });
        });
    });
};