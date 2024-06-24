const {Sequelize, DataTypes} = require("sequelize")
let pokemons = require("./mock-pockemon")
const pokemonModel = require("../models/pokemon")
const userModel = require("../models/user")
const bcrypt = require("bcrypt")

const sequelize = new Sequelize(
    "pokedex",
    "root",
    "",
    {
        host: "localhost",
        dialect: "mariadb",
        dialectOptions: {
            timezone: "Etc/GMT+2"
        },
        logging: false
    }
)

sequelize.authenticate()
.then(_=> console.log("La connexion a la base de donnee a ete etablie"))
.catch(error => console.error(`Impossible de se connecter a la base de donnees ${error}`))

const Pokemon = pokemonModel(sequelize, DataTypes)
const User = userModel(sequelize, DataTypes)

const initDb = () => {
    return sequelize.sync({force: true})
    .then(_ => {
        console.log("La connexion a la base de donnee 'pokedex' a bien ete synchronisee")
        pokemons.map(pokemon => {
            Pokemon.create({
                name: pokemon.name,
                cp: pokemon.cp,
                hp: pokemon.hp,
                picture: pokemon.picture,
                types:pokemon.types
            })
        })

        bcrypt.hash("password", 10)
        .then(password => {
            User.create({
                username: "username",
                password: password
            })
        })
    })
}

module.exports = {
    initDb, Pokemon, User
}