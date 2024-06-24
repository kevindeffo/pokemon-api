const validTypes = ["plante", "poisson", "feu", "eau", "insecte", "vol", "normal", "electrik"]

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("pokemon", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Ce nom est deja pris"
            },
            validate: {
                notEmpty: {
                    msg: "Le champ name ne doit pas etre vide"
                },
                notNull: {
                    msg: "Le champ name est obligatoire"
                }
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    msg: "Rien que les nombre entier sont autorise dans le champ hp"
                },
                notNull: {
                    msg: "Le champ hp un obligatoire"
                },
                min: {
                    args: [0],
                    msg: "La valeur minimale du champ hp est 0"
                },
                max: {
                    args: [999],
                    msg: "La valeur maximale du champ hp est 999"
                }
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    msg: "Rien que les nombre entier sont autorise dans le champ cp"
                },
                notNull: {
                    msg: "Le champ cp un obligatoire"
                },
                min: {
                    args: [0],
                    msg: "La valeur minimale du champ hp est 0"
                },
                max: {
                    args: [999],
                    msg: "La valeur maximale du champ hp est 999"
                }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: {
                    msg: "Cette URL n'est pas valide"
                },
                notNull: {
                    msg: "Le champ picture un obligatoire"
                }
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get (){
                return this.getDataValue("types").split(",")
            },
            set(types) {
                this.setDataValue("types", types.join())
            },
            validate: {
                isTypeValid(value) {
                    if (!value) {
                        throw new Error("Un pokemon doit avoir au moins un type")
                    }
                    if (value.split(",").length > 3) {
                        throw new Error("Un pokemon ne peut pas avoir plus de 3 types")
                    }

                    value.split(",").forEach(type => {
                        if (!validTypes.includes(type)) {
                            // throw new Error(`La chaine de caractere ${type} n'est pas autorise comme type. Les types autorise sont: ${validTypes}`)
                        }
                    });
                }
            }
        },
    }, {
        timestamps: true,
        createdAt: "created",
        updatedAt: false
    })
}