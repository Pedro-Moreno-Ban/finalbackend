const Ubicacion = require('../models/ubicacion');
const Cliente = require('../models/cliente');

// Crear ubicación
exports.crearUbicacion = async (req, res) => {
  try {
    const { ClienteId, ...datosUbicacion } = req.body;
    
    // Verificar si el cliente existe
    const cliente = await Cliente.findByPk(ClienteId);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    
    const ubicacion = await Ubicacion.create({
      ...datosUbicacion,
      ClienteId
    });
    
    res.status(201).json(ubicacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener ubicaciones por cliente
exports.obtenerUbicacionesPorCliente = async (req, res) => {
  try {
    const ubicaciones = await Ubicacion.findAll({
      where: { ClienteId: req.params.clienteId }
    });
    
    res.json(ubicaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar ubicación
exports.actualizarUbicacion = async (req, res) => {
  try {
    const [updated] = await Ubicacion.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (updated) {
      const ubicacionActualizada = await Ubicacion.findByPk(req.params.id);
      return res.json(ubicacionActualizada);
    }
    
    throw new Error('Ubicación no encontrada');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar ubicación
exports.eliminarUbicacion = async (req, res) => {
  try {
    const deleted = await Ubicacion.destroy({
      where: { id: req.params.id }
    });
    
    if (deleted) {
      return res.json({ mensaje: 'Ubicación eliminada exitosamente' });
    }
    
    throw new Error('Ubicación no encontrada');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};