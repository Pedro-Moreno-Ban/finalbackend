const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Ubicacion = db.define('Ubicacion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  departamento: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ciudad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  barrio: {
    type: DataTypes.STRING
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = Ubicacion;