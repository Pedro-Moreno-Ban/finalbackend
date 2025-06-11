const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Estadistica = db.define('Estadistica', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  consumo_promedio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  consumo_mes_anterior: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  valor_kilovatio_hora: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  fecha_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true
});

module.exports = Estadistica;