const Cliente = require('../models/cliente');
const Ubicacion = require('../models/ubicacion');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

// Registrar nuevo cliente
exports.registrarCliente = async (req, res) => {
  try {
    const { nombre, documento, tipo_cliente, email, password, ubicacion } = req.body;
    
    // Verificar si el email ya existe
    const existeEmail = await Cliente.findOne({ where: { email } });
    if (existeEmail) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Crear cliente
    const cliente = await Cliente.create({
      nombre,
      documento,
      tipo_cliente,
      email,
      password
    });

    // Crear ubicación si se proporciona
    if (ubicacion) {
      await Ubicacion.create({
        ...ubicacion,
        ClienteId: cliente.id
      });
    }

    // Generar token JWT
    const token = jwt.sign({ id: cliente.id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    res.status(201).json({
      cliente,
      token,
      mensaje: 'Cliente registrado exitosamente'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Iniciar sesión
exports.iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const cliente = await Cliente.findOne({ where: { email } });
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    const passwordValido = await cliente.validarPassword(password);
    if (!passwordValido) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: cliente.id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    res.json({
      cliente,
      token,
      mensaje: 'Inicio de sesión exitoso'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los clientes (solo admin)
exports.obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll({
      attributes: { exclude: ['password'] },
      include: [Ubicacion]
    });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un cliente por ID
exports.obtenerCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [Ubicacion, Plan, Estadistica, Aviso]
    });
    
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar cliente
exports.actualizarCliente = async (req, res) => {
  try {
    const [updated] = await Cliente.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (updated) {
      const clienteActualizado = await Cliente.findByPk(req.params.id, {
        attributes: { exclude: ['password'] }
      });
      return res.json(clienteActualizado);
    }
    
    throw new Error('Cliente no encontrado');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar cliente
exports.eliminarCliente = async (req, res) => {
  try {
    const deleted = await Cliente.destroy({
      where: { id: req.params.id }
    });
    
    if (deleted) {
      return res.json({ mensaje: 'Cliente eliminado exitosamente' });
    }
    
    throw new Error('Cliente no encontrado');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};