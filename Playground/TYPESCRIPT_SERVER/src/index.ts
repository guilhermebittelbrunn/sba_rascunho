import dotenv from "dotenv";
import express from "express";
import Router from "./router";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 4321;
const app = express();

app.use("/api", Router);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
