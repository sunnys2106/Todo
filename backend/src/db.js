import pg from "pg";
import env from "dotenv";

env.config();

const { Pool } = pg;

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

export const query = async (text, params) => {
    try {
        const result = await pool.query(text, params);
        return result;
    } catch (error) {
        console.error("Database query error:", error);
        throw new Error("Error executing query");
    }
};

process.on("SIGINT", async () => {
    console.log("Closing connection pool...");
    await pool.end();
    console.log("Pool closed.");
    process.exit(0);
});
