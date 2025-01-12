import { query } from "../db.js";

export const getClients = async () => {
    const res = await query("SELECT * FROM clients_tb");
    return res.rows;
};

export const createClient = async (clientData) => {
    const { name, email, job, rate, isactive } = clientData;
    const res = await query(
        "INSERT INTO clients_tb (name, email, job, rate, isactive) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, email, job, rate, isactive]
    );
    return res.rows[0];
};

export const updateClient = async (clientData, clientId) => {
    const { name, email, job, rate, isactive } = clientData;
    const res = await query(
        "UPDATE clients_tb SET name = $1, email = $2, job = $3, rate = $4, isactive = $5 WHERE id = $6 RETURNING *",
        [name, email, job, rate, isactive, clientId]
    );
    return res.rows[0];
};

export const deleteClient = async (clientId) => {
    const res = await query("DELETE FROM clients_tb WHERE id = $1", [clientId]);
    return res.rowCount > 0;
};

export const searchClients = async (searchTerm) => {
    const res = await query(
        "SELECT * FROM clients_tb WHERE name ILIKE $1 OR email ILIKE $1 OR job ILIKE $1",
        [`%${searchTerm}%`]
    );
    return res.rows;
};
