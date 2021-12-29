const user = require("./user")
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      barang.belongsTo(models.user,{
        foreignKey : {
          name : "idUser"
        }
      })
    }
  };
  barang.init({
    photo: DataTypes.STRING,
    name: DataTypes.STRING,
    harga_jual: DataTypes.INTEGER,
    harga_beli: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'barang',
  });
  return barang;
};