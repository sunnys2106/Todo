import express from "express";
import cors from "cors";
import notesRoute from "./routes/notesRoute.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", notesRoute);

app.listen(port, () => {
    console.log("Listening on port 3000");
});
