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
    max: 10, // Maximum number of connections in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 2000, // Timeout for connecting to the database
});

// Export a query function that uses the pool
export const query = async (text, params) => {
    try {
        const result = await pool.query(text, params);
        return result;
    } catch (error) {
        console.error("Database query error:", error);
        throw new Error("Error executing query");
    }
};
// Handle pool shutdown on app termination
process.on("SIGINT", async () => {
    console.log("Closing connection pool...");
    await pool.end();
    console.log("Pool closed.");
    process.exit(0);
});

//alternate method using client instead of pool:
// const { Client } = pg;
// const client = new Client({
//     user: process.env.PG_USER,
//     host: process.env.PG_HOST,
//     database: process.env.PG_DATABASE,
//     password: process.env.PG_PASSWORDC,
//     port: process.env.PG_PORT,
// });

// (async () => {
//     try {
//         await client.connect();
//         console.log("Database connected successfully");
//     } catch (error) {
//         console.error("Failed to connect to the database", error);
//         process.exit(-1);
//     }
// })();

// client.on("error", (err) => {
//     console.error("Unexpected error on idle client", err);
//     process.exit(-1);
// });

// export const query = (text, params) => {
//     client.query(text, params);
// };
