const { User } = require('../db/sequelize');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

module.exports = (app) => {
    app.post('/api/request-password-reset', (req, res) => {
        User.findOne({ where: { email: req.body.email } })
            .then(user => {
                if (!user) {
                    const message = "Utilisateur introuvable avec cet e-mail.";
                    return res.status(404).json({ message });
                }

                const token = crypto.randomBytes(20).toString('hex');
                const expires = Date.now() + 3600000; // 1 hour

                user.resetPasswordToken = token;
                user.resetPasswordExpires = expires;
                return user.save().then(() => {
                    const transporter = nodemailer.createTransport({
                        service: 'Gmail',
                        auth: { user: 'your-email@gmail.com', pass: 'your-email-password' }
                    });

                    const mailOptions = {
                        to: user.email,
                        from: 'passwordreset@demo.com',
                        subject: 'Réinitialisation de mot de passe',
                        text: `Vous recevez cet e-mail car vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte. Veuillez cliquer sur le lien suivant ou le coller dans votre navigateur pour compléter le processus :

http://localhost:3000/reset/${token}

Si vous n'avez pas demandé cela, veuillez ignorer cet e-mail et votre mot de passe restera inchangé.
`
                    };

                    transporter.sendMail(mailOptions, (err) => {
                        if (err) {
                            return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email.' });
                        }
                        res.status(200).json({ message: 'Un e-mail a été envoyé à ' + user.email + ' avec des instructions supplémentaires.' });
                    });
                });
            })
            .catch(error => {
                const message = "Une erreur est survenue, veuillez réessayer plus tard.";
                return res.status(500).json({ message, error });
            });
    });
};