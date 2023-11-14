import { Request, Response } from "express"
import { City, Brands} from './interface'

function shuffleArray(arr:any){
        // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i--) {
            // Escolhendo elemento aleatório
        const j = Math.floor(Math.random() * (i + 1));
        // Reposicionando elemento
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    return arr;
}

const controller = {
    get: async(req:Request,res:Response)=>{
        const {id} = req.params;
        res.send(`Cidade com id: ${id}`);

    },
    getAll: async(req:Request,res:Response)=>{
        const idRep = req.params.id;

        const cities:City[] = [
            {
                id: 1,
                name: 'Rio de Janeiro',
                brands: [Brands.sba]
            },
            {
                id: 2,
                name: 'São Paulo',
                brands: [Brands.yellow]
            },
            {
                id: 3,
                name: 'Campo Grande',
                brands: [Brands.sba, Brands.alvha]
            },
            {
                id: 4,
                name: 'Florianópolis',
                brands: [Brands.sba, Brands.alvha, Brands.yellow]
            },
            {
                id: 5,
                name: 'Brusque',
                brands: [Brands.sba, Brands.alvha, Brands.yellow]
            },
            {
                id: 6,
                name: 'Goiás',
                brands: [Brands.sba, Brands.alvha]
            },
            {
                id: 7,
                name: 'Bahia',
                brands: [Brands.yellow]
            }
        ]
        console.log('id', idRep);
        res.status(200).send(shuffleArray(cities));

    },
    post: async(req:Request, res:Response)=>{
        const {name, brands} = req.body

        const newCity:City = {
            id: Math.random(),
            name,
            brands
        }

        res.status(201).send(newCity);
    },
    put: async(req:Request, res:Response)=>{
        const {id} = req.params;
        const {name, brands} = req.body

        const city:City = {
            id,
            name,
            brands
        }

        res.status(200).send(city);
    },
    delete: async(req:Request, res:Response)=>{
        const {id} = req.params;

        res.send(`city ${id} removed`);
    }
}

export default controller;