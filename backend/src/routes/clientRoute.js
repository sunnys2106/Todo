import express from "express";
import * as clientController from "../controllers/clientController.js";
import validateClientData from "../util/clientValidator.js";

const clientRoutes = express.Router();

clientRoutes.get("/clients", clientController.getClients);
clientRoutes.post(
    "/clients",
    validateClientData,
    clientController.createClient
);
clientRoutes.put(
    "/clients/:id",
    validateClientData,
    clientController.updateClient
);
clientRoutes.delete("/clients/:id", clientController.deleteClient);
clientRoutes.get("/clients/search", clientController.searchClients);

export default clientRoutes;
