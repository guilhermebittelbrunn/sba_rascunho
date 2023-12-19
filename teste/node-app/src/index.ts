import express, { Request, Response, NextFunction } from "express";

const app = express();
const PORT = 5151;

const Middleware = (req: Request, res: Response, next: NextFunction) => {
    console.log("Execute middleware...");
    console.log(req);
    next();
};

app.use(Middleware);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.listen(PORT || 3000, () => {
    console.log(`Server running at port ${PORT || 3000}`);
});
