const request = require('supertest');
const app = require('../../app');
const { User } = require('../../db/sequelize');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

describe('Password Reset', () => {
    let user;

    beforeAll(async () => {
        user = await User.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: bcrypt.hashSync('password', 10)
        });
    });

    afterAll(async () => {
        await User.destroy({ where: { id: user.id } });
    });

    test('Request password reset', async () => {
        const res = await request(app)
            .post('/api/request-password-reset')
            .send({ email: 'testuser@example.com' });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Un e-mail a été envoyé à testuser@example.com avec des instructions supplémentaires.');
    });

    test('Reset password with valid token', async () => {
        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const res = await request(app)
            .post(`/api/reset-password/${token}`)
            .send({ password: 'newpassword' });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Votre mot de passe a été réinitialisé avec succès.');

        const updatedUser = await User.findByPk(user.id);
        const isPasswordValid = await bcrypt.compare('newpassword', updatedUser.password);
        expect(isPasswordValid).toBe(true);
    });

    test('Reset password with invalid or expired token', async () => {
        const res = await request(app)
            .post('/api/reset-password/invalidtoken')
            .send({ password: 'newpassword' });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Le jeton de réinitialisation de mot de passe est invalide ou a expiré.');
    });
});