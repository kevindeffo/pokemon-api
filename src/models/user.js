module.exports = (sequelize, DataTypes) => {
    return sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            unique: {
                msg: "Ce nom est deja pris"
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Cet e-mail est déjà utilisé"
            },
            validate: {
                isEmail: {
                    msg: "L'e-mail doit être valide"
                }
            }
        },
        password: {
            type: DataTypes.STRING
        },
        resetPasswordToken: {
            type: DataTypes.STRING
        },
        resetPasswordExpires: {
            type: DataTypes.DATE
        }
    });
}