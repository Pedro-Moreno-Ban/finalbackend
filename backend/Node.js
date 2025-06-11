const { Pool } = require('pg');

// Conexión usando la variable de entorno
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Necesario para conexiones SSL en Render
  }
});