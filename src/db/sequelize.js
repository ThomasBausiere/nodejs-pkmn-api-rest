const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')

let sequelize

if(process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize('l2gay867tz0y6uq0', 'fykiy9zf9w2we1iq', 'k9pz2jv1rckpvp0r', {
    host: 'eporqep6b4b8ql12.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: true
  })
} else {
  sequelize = new Sequelize('pokedex', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: false
  })
  
}

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
  return sequelize.sync().then(_ => {
    pokemons.map(pokemon => {
      Pokemon.findOne({ where: { name: pokemon.name } })
        .then(existingPokemon => {
          if (!existingPokemon) {
            return Pokemon.create({
              name: pokemon.name,
              hp: pokemon.hp,
              cp: pokemon.cp,
              picture: pokemon.picture,
              types: pokemon.types
            }).then(pokemon => console.log(pokemon.toJSON()));
          } else {
            console.log(`${pokemon.name} existe déjà.`);
          }
        });
    });

    bcrypt.hash('pikachu', 10)
      .then(hash => User.findOrCreate({
        where: { username: 'pikachu' },
        defaults: { password: hash }
      }))
      .then(([user, created]) => {
        if (created) {
          console.log(user.toJSON());
        } else {
          console.log('Utilisateur "pikachu" existe déjà.');
        }
      });

    console.log('La base de donnée a bien été initialisée !');
  });
}

module.exports = { 
  initDb, Pokemon, User
}