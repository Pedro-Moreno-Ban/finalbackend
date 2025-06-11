const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const clientesController = require('../controllers/clientes');
const ubicacionesController = require('../controllers/ubicaciones');
const planesController = require('../controllers/planes');
const estadisticasController = require('../controllers/estadisticas');
const avisosController = require('../controllers/avisos');

// Rutas públicas
router.post('/clientes/registro', clientesController.registrarCliente);
router.post('/clientes/login', clientesController.iniciarSesion);

// Rutas protegidas (requieren autenticación)
router.use(authMiddleware);

// Rutas de clientes
router.get('/clientes', clientesController.obtenerClientes);
router.get('/clientes/:id', clientesController.obtenerCliente);
router.put('/clientes/:id', clientesController.actualizarCliente);
router.delete('/clientes/:id', clientesController.eliminarCliente);

// Rutas de ubicaciones
router.post('/ubicaciones', ubicacionesController.crearUbicacion);
router.get('/ubicaciones/cliente/:clienteId', ubicacionesController.obtenerUbicacionesPorCliente);
router.put('/ubicaciones/:id', ubicacionesController.actualizarUbicacion);
router.delete('/ubicaciones/:id', ubicacionesController.eliminarUbicacion);

// Rutas de planes
router.post('/planes', planesController.crearPlan);
router.get('/planes', planesController.obtenerPlanes);
router.get('/planes/:id', planesController.obtenerPlan);
router.put('/planes/:id', planesController.actualizarPlan);
router.delete('/planes/:id', planesController.eliminarPlan);

// Rutas de estadísticas
router.post('/estadisticas', estadisticasController.crearEstadistica);
router.get('/estadisticas/cliente/:clienteId', estadisticasController.obtenerEstadisticasPorCliente);
router.put('/estadisticas/:id', estadisticasController.actualizarEstadistica);
router.delete('/estadisticas/:id', estadisticasController.eliminarEstadistica);

// Rutas de avisos
router.post('/avisos', avisosController.crearAviso);
router.get('/avisos/cliente/:clienteId', avisosController.obtenerAvisosPorCliente);
router.put('/avisos/:id', avisosController.actualizarAviso);
router.delete('/avisos/:id', avisosController.eliminarAviso);

module.exports = router;