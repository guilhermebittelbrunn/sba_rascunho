import express, { Request, Response } from "express";

const Router = express.Router();

Router.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

export default Router;
