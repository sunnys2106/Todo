import * as db from "../services/clientServices.js";
import { validationResult } from "express-validator";

export const getClients = async (req, res) => {
    try {
        const clients = await db.getClients();
        res.status(200).json(clients);
    } catch (err) {
        console.error("Error fetching clients: ", err);
        res.status(500).json({ message: "internal server error" });
    }
};

export const createClient = async (req, res) => {
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
        const clientData = req.body;
        const newClient = await db.createClient(clientData);
        res.status(200).json(newClient);
    } catch (err) {
        console.error("Error creating client: ", err);
        res.status(500).json({ message: "internal server error" });
    }
};

export const updateClient = async (req, res) => {
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
        const clientId = req.params.id;
        const clientData = req.body;
        const updatedClient = await db.updateClient(clientData, clientId);
        if (!updatedClient) {
            return res.status(404).json({ message: "client not found" });
        }
        res.status(200).json(updatedClient);
    } catch (err) {
        console.error("Error updating client: ", err);
        res.status(500).json({ message: "internal server error" });
    }
};

export const deleteClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        const deleted = await db.deleteClient(clientId);
        if (!deleted) {
            return res.status(404).json({ message: "client not found" });
        }
        res.status(200).send();
    } catch (err) {
        console.error("Error deleting client: ", err);
        res.status(500).json({ message: "internal server error" });
    }
};

export const searchClients = async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const clients = await db.searchClients(searchTerm);
        res.status(200).json(clients);
    } catch (err) {
        console.error("Error searching clients: ", err);
        res.status(500).json({ message: "internal server error" });
    }
};
