import express, {NextFunction, Request, Response} from "express";

const Router = express.Router();

Router.get('/', (req:Request,res:Response)=>{
    return res.send('hello world by api');
})

function verifyAdminRole(req:Request,res:Response, next:NextFunction){
    const {id} = req.params
    if(+id % 2 === 0){
        next();
    }
    else{
        res.status(403).send('only admin can access')
    }
}

function handleMiddlewere(req:Request, res:Response, next:NextFunction){
    console.log('segundo middlewere');
    next();
}

const controller = { 
    get: (req:Request,res:Response<string>)=>{
        try{
            throw 'teste'
            res.send(`Welcome user ${req.params.id}`);    
        }catch(err:any){
            res.status(500).send(err);
        }
    }
} 

Router.get('/admin/:id', verifyAdminRole, handleMiddlewere, controller.get);


export default Router
