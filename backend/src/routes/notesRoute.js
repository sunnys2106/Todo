import express from "express";
import * as notesController from "../controllers/notesController.js";
import validateNoteData from "../util/notesValidator.js";

const noteRoutes = express.Router();

noteRoutes.get("/notes", notesController.getNotes);
noteRoutes.post("/notes", validateNoteData, notesController.createNote);
noteRoutes.put("/notes/:id", validateNoteData, notesController.updateNote);
noteRoutes.delete("/notes/:id", notesController.deleteNote);
noteRoutes.get("/notes/search", notesController.searchNotes);

export default noteRoutes;
