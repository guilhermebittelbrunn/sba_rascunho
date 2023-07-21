var Car = /** @class */ (function () {
    function Car(id, mdl, yr, brand) {
        this.model = '';
        this.id = 0;
        this.year = 0;
        this.brand = "";
        this.id = id;
        this.model = mdl;
        this.year = yr;
        this.brand = brand;
    }
    Car.prototype.getModel = function () {
        return this.model;
    };
    Car.prototype.getId = function () {
        return this.id;
    };
    Car.prototype.getYear = function () {
        return this.year;
    };
    Car.prototype.getBrand = function () {
        return this.brand;
    };
    return Car;
}());
var carG = new Car(1, "Corolla", 2011, "Kia");
console.log(carG.getBrand());
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
// type setup = {
//     id: number;
//     year: number;
//     model: string;
//     brand: string;
//     sayAboutThis(): Object;
// };
// const Car: setup = {
//     id: 1,
//     model: "Cerato",
//     year: 2011,
//     brand: "Kia",
//     sayAboutThis() {
//         return this;
//     },
// };
// console.log(Car.sayAboutThis());
// const x: object = { ok: true };
// console.log(x);
