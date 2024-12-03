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
    // port: 5432,
    connectionString: "postgresql://keyword_search_user:V0DLXa5nKqWEsDMePXflgaR68UxPlFn8@dpg-ct6d683qf0us738ecu60-a.singapore-postgres.render.com/keyword_search",
    ssl: {
        rejectUnauthorized: false // Important for Render's SSL requirement
    }
});

export default pool;