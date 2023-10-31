import express from 'express'
import Router from './router'
import cors from 'cors'
import path from 'path'
require('dotenv').config()

const app = express();
const PORT = process.env.PORT;

app.use('/api', Router);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use('*', express.static(path.join(__dirname, '../index.html')));

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}!`);
})

