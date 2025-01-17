const express = require('express')
const favicon =require('serve-favicon')
const bodyParser =require('body-parser')
const sequelize = require('./src/db/sequelize')
const cors = require('cors')

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const app =express()
const port = process.env.PORT || 3000

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json())
    .use(cors())
 

sequelize.initDb()

app.get('/', (req, res)=>{
    res.json('Hello Heroku')
})

//ici, nous placerons nos futures points de terminaisons.
require('./src/routes/findAllPokemons')(app) 
require('./src/routes/findPokemonByPk')(app) 
require('./src/routes/createPokemon')(app) 
require('./src/routes/updatePokemon')(app) 
require('./src/routes/deletePokemon')(app) 
require('./src/routes/login')(app)

//On ajoute la gestion des erreurs 404
app.use(({res}) => {
    const message = 'impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})


app.listen(port, ()=> console.log(`Notre application Node est démarrée sur :http://localhost:${port}`))