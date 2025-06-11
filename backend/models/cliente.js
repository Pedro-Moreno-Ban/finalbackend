const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcryptjs');

const Cliente = db.define('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  documento: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  tipo_cliente: {
    type: DataTypes.ENUM('hogar', 'empresa'),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  codigo_unico: {
    type: DataTypes.STRING,
    unique: true
  }
}, {
  hooks: {
    beforeCreate: async (cliente) => {
      cliente.password = await bcrypt.hash(cliente.password, 10);
      cliente.codigo_unico = `CLI-${Date.now()}`;
    }
  },
  timestamps: true
});

Cliente.prototype.validarPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = Cliente;