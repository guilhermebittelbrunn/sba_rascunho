// class Car {
//     private model: string = '';
//     private id: number = 0;
//     private year: number = 0;
//     private brand: string = "";
var Car = {
    id: 1,
    model: "Cerato",
    year: 2011,
    brand: "Kia",
    sayAboutThis: function () {
        return this;
    },
};
console.log(Car.sayAboutThis());
var x = { ok: true };
console.log(x);
