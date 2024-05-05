const express = require("express")
const morgan = require("morgan")
const favicon = require("serve-favicon")
const bodyParser = require("body-parser")
let pokemons = require("./mock-pockemon")
const {success, getUniqueId} = require("./helper")

const app = express()
const port = 3000

app
.use(favicon(__dirname + "/favicon.ico"))
.use(morgan('dev'))
.use(bodyParser.json())

app.get("/", (req, res) => res.send("Hello, Express new!"))

app.get("/api/pokemon/:id", (req, res) => {
    id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = "Un pokemon a bien ete trouve."

    res.json(success(message, pokemon))
})

app.get("/api/pokemons", (req, res) => {
    const message = "La liste des pokemons a bien ete recupere"
    res.json(success(message, pokemons))
})

app.post("/api/pokemons", (req, res) => {
    const id = getUniqueId(pokemons)
    console.log(req);
    const  pokemonCreated = {...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `le pokemom ${pokemonCreated.name} a bien ete cree.`

    res.json(success(message, pokemonCreated))
})

app.put("/api/pokemon/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonUpdated = {...req.body, id}
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    })
    const message = `Le pokemon ${pokemonUpdated.name} a ete modifie`

    res.json(success(message, pokemonUpdated))
})

app.delete("/api/pokemon/:id", (req, res) => {
    const id = parseInt(req.params.id)
    pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons = pokemons.filter(pokemon => pokemon.id != id)

    const message = `Le pokemon ${pokemonDeleted.name} a bien ete suppime`
    res.json(success(message, pokemonDeleted))
})

app.listen(port, () => console.log(`Notre application node est demare sur: http://localhost:${port}`))