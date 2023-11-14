import express, { Request, Response } from 'express';
import cors from 'cors';
import colors from 'colors'
import Router from './router';

const PORT = process.env.PORT || 4040;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', Router)

app.get('*', (req:Request, res:Response) => {
    res.status(404).send('404')
})

app.listen(PORT, ()=>{
    console.log(colors.green(`listening on ${PORT}`));
})