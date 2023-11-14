import express from "express";
import controller from "./controller";

const Router = express.Router();

Router.get('/', controller.get);
Router.get('/all', controller.getAll);
Router.post('/', controller.post);
Router.put('/:id', controller.put);
Router.delete('/:id', controller.delete);

export default Router;