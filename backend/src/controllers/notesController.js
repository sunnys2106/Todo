import * as db from "../services/notesServices.js";
import { validationResult } from "express-validator";

export const getNotes = async (req, res) => {
    try {
        const notes = await db.getNotes();
        res.status(200).json(notes);
    } catch (err) {
        console.error("Error fetching notes: ", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createNote = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array().map((err) => ({
                field: err.param,
                message: err.msg,
            })),
        });
    }
    try {
        const noteData = req.body;
        const newNote = await db.createNote(noteData);
        res.status(200).json(newNote);
    } catch (err) {
        console.error("Error creating note: ", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateNote = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array().map((err) => ({
                field: err.param,
                message: err.msg,
            })),
        });
    }

    try {
        const noteId = req.params.id;
        const noteData = req.body;
        const updatedNote = await db.updateNote(noteData, noteId);
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(updatedNote);
    } catch (err) {
        console.error("Error updating note: ", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const deleted = await db.deleteNote(noteId);
        if (!deleted) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).send();
    } catch (err) {
        console.error("Error deleting note: ", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const searchNotes = async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const notes = await db.searchNotes(searchTerm);
        res.status(200).json(notes);
    } catch (err) {
        console.error("Error searching notes: ", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
