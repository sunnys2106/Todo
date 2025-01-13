import { query } from "../db.js";

export const getNotes = async () => {
    const res = await query("SELECT * FROM notes_tb");
    return res.rows;
};

export const createNote = async (noteData) => {
    const { name, description, duedate } = noteData;
    const res = await query(
        "INSERT INTO notes_tb (name, description, due_date ) VALUES ($1, $2, $3) RETURNING *",
        [name, description, duedate]
    );
    return res.rows[0];
};

export const updateNote = async (noteData, noteId) => {
    const { name, description, duedate } = noteData;
    const res = await query(
        "UPDATE notes_tb SET name = $1, description = $2, due_date = $3 WHERE id = $4 RETURNING *",
        [name, description, duedate, noteId]
    );
    return res.rows[0];
};

export const deleteNote = async (noteId) => {
    const res = await query("DELETE FROM notes_tb WHERE id = $1", [noteId]);
    return res.rowCount > 0;
};

export const searchNotes = async (searchTerm) => {
    const res = await query(
        "SELECT * FROM notes_tb WHERE name ILIKE $1 OR description ILIKE $1",
        [`%${searchTerm}%`]
    );
    return res.rows;
};
