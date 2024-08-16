const validTypes= ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
          msg:'Le nom est déjà pris'
        },
        validate:{
          notEmpty:{msg:`Le nom doit contenir au moins une lettre`},
          notNull:{msg:`Le nom est une propriété requise.`}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt:{msg:`Utilisez uniquement des nombres entier pour les points de vie.`},
          notNull:{msg:`Les points de vie sont une propriété requise.`},
          min: {
            args:[0],
            msg:`Le nombre de pv minimum est de 0.`
          },
          max:{
            args:[999],
            msg:`Le nombre de pv maximum est de 999.`
          }

        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt:{msg:`Utilisez uniquement des nombres entier pour les pc.`},
          notNull:{msg:`Les pc sont une propriété requise.`},
          min: {
            args:[0],
            msg:`Le nombre de pc minimum est de 0.`
          },
          max:{
            args:[99],
            msg:`Le nombre de pc maximum est de 99.`
          }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          isUrl:{msg:`Utilisez une URL valide pour l'image du pokemon.`},
          notNull:{msg:`L'image est une propriété requise.`}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
            return this.getDataValue('types').split(',')
        },
        set(types){
            this.setDataValue('types', types.join())
        },
        validate:{
          isTypesValid(value){
            if(!value){
              throw new Error('Un pokemon doit avoir au moins un type.')
            }
            if(value.split(',').length > 3){
              throw new Error('Un pokemon ne peut pas avoir plus de 3 types')
            }
            value.split(',').forEach(type => {
              if(!validTypes.includes(type)){
                throw new Error (`Le type d'un pokémon doit appartenir à la liste suivante: ${validTypes}`)
              }
            });
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }