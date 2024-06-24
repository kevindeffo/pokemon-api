const express = require("express")
const morgan = require("morgan")
const favicon = require("serve-favicon")
const bodyParser = require("body-parser")
const sequelize = require("./src/db/sequelize")
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerOptions');


const app = express()
const port = 3000

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app
.use(favicon(__dirname + "/favicon.ico"))
.use(morgan('dev'))
.use(bodyParser.json())

sequelize.initDb()

require("./src/routes/findAllPokemons")(app);
require("./src/routes/findPokemonById")(app)
require("./src/routes/createPokemon")(app)
require("./src/routes/updatePokemon")(app)
require("./src/routes/deletePokemon")(app)
require("./src/routes/login")(app)

// Erreur 404
app.use(({res}) => {
    const message = "Impossible de trouver la resource"

    res.status(404).json({message})
})

const server = app.listen(port, () => console.log(`Notre application node est demare sur: http://localhost:${port}`))

module.exports = server;