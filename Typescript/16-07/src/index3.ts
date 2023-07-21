// class Car {
//     private model: string = '';
//     private id: number = 0;
//     private year: number = 0;
//     private brand: string = "";

//     function getModel(this:any):string {
//         return this.model
//     }
//     function getId(this: any):string {
//         return this.id
//     }
//     function getModel():string {
//         return this.model
//     }
//     function getModel():string {
//         return this.model
//     }

//     constructor(id: number, mdl: string, yr: number, brand: string) {
//         this.id = id;
//         this.model = mdl;
//         this.year = yr;
//         this.brand = brand;
//     }
// }

// const carG = new Car(1, "Cerato", 2011, "Kia");
// console.log(carG);

// function createCar(model: string, id: number, year: number, brand: string): object {
//     return {
//         model,
//         id,
//         year,
//         brand,
//         sayAbouThis: function () {
//             console.log(this);
//         },
//     };
// }

// const Car: object = createCar("Cerato", 1, 2011, "Kia");

// console.log(Car.model);

type setup = {
    id: number;
    year: number;
    model: string;
    brand: string;
    sayAboutThis(): Object;
};

const Car: setup = {
    id: 1,
    model: "Cerato",
    year: 2011,
    brand: "Kia",
    sayAboutThis() {
        return this;
    },
};

console.log(Car.sayAboutThis());

const x: object = { ok: true };
console.log(x);
