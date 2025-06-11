const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Aviso = db.define('Aviso', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  limite_diario: {
    type: DataTypes.DECIMAL(10, 2)
  },
  limite_semanal: {
    type: DataTypes.DECIMAL(10, 2)
  },
  limite_mensual: {
    type: DataTypes.DECIMAL(10, 2)
  },
  limite_anual: {
    type: DataTypes.DECIMAL(10, 2)
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true
});

module.exports = Aviso;