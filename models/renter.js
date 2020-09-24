'use strict';
const bcryptjs = require('bcryptjs')

const {
  Model
} = require('sequelize');
const { options } = require('../routes');
module.exports = (sequelize, DataTypes) => {
  class Renter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    fullName(){
      return this.firstName+" "+this.lastName
    } 

    static associate(models) {
      // define association here
      Renter.belongsToMany(models.Book, {
        through: models.BookRenter
      })
    }
  };
  Renter.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthDate: DataTypes.DATEONLY,
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email tidak boleh kosong'
        },
        isEmail: {
          args: true,
          msg: 'Email tidak sesuai'
        }
      }
    },
    address: DataTypes.STRING
  }, {

    hooks:{
      beforeCreate: (renter, options) => {
        if (renter.lastName == ''){
          renter.lastName = renter.firstName
        }
      }
    },

    sequelize,
    modelName: 'Renter',
  });

  Renter.beforeCreate(instance => {
    let salt = bcryptjs.genSaltSync(10)
    let hash = bcryptjs.hashSync(instance.password, salt)

    instance.password = hash
  })
  return Renter;
};