"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
Router.get('/', (req, res) => {
    return res.send('hello world by api');
});
function verifyAdminRole(req, res, next) {
    const { id } = req.params;
    if (+id % 2 === 0) {
        next();
    }
    else {
        res.status(403).send('only admin can access');
    }
}
function handleMiddlewere(req, res, next) {
    console.log('segundo middlewere');
    next();
}
const controller = {
    get: (req, res) => {
        try {
            throw 'teste';
            res.send(`Welcome user ${req.params.id}`);
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
};
Router.get('/admin/:id', verifyAdminRole, handleMiddlewere, controller.get);
exports.default = Router;
