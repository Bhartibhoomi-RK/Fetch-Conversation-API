const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

async function listTables() {
  try {
    const result = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `);

    console.log('📦 Tables in your database:');
    result.rows.forEach(row => {
      console.log(`- ${row.table_name}`);
    });

    process.exit();
  } catch (err) {
    console.error('❌ Error connecting or querying the database:', err.message);
    process.exit(1);
  }
}

listTables();
