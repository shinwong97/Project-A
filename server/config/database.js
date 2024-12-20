import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    // user: process.env.DB_USER,
    // host: process.env.DB_HOST,
    // database: process.env.DB_NAME,
    // password: process.env.DB_PASSWORD,
    // port: process.env.DB_PORT,
    // user: "keyword_search_user",
    // host: "dpg-ct6d683qf0us738ecu60-a",
    // database: "keyword_search",
    // password: "V0DLXa5nKqWEsDMePXflgaR68UxPlFn8",
    // port: 10000,
    connectionString: "postgresql://keyword_search_user:V0DLXa5nKqWEsDMePXflgaR68UxPlFn8@dpg-ct6d683qf0us738ecu60-a.singapore-postgres.render.com/keyword_search",
    // connectionString: "postgresql://keyword_search_user:V0DLXa5nKqWEsDMePXflgaR68UxPlFn8@dpg-ct6d683qf0us738ecu60-a/keyword_search",
    ssl: {
        rejectUnauthorized: false // Important for Render's SSL requirement
    }
});

async function createSchema() {
    const createTableQuery = `
  CREATE TABLE keyword_search (
    id SERIAL PRIMARY KEY,
    search_keyword VARCHAR(255) NOT NULL,
    embedding REAL[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
  `;

    try {
        await pool.query(createTableQuery);
        console.log('Table created successfully');
    } catch (error) {
        console.error('Error creating table', error);
    }
}

createSchema();

export default pool;