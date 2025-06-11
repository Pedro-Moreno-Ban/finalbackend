const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Plan = db.define('Plan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  nivel: {
    type: DataTypes.ENUM('basico', 'plata', 'oro', 'diamante'),
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = Plan;