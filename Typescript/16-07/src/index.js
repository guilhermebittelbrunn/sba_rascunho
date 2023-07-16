var Animals;
(function (Animals) {
    Animals[Animals["dog"] = 1] = "dog";
    Animals[Animals["cat"] = 2] = "cat";
    Animals[Animals["rabbit"] = 3] = "rabbit";
    Animals[Animals["bird"] = 4] = "bird";
    Animals[Animals["turtle"] = 5] = "turtle";
})(Animals || (Animals = {}));
var AnimalHome = [];
var Saimon = {
    id: 1,
    age: '10 years',
    specie: Animals.dog
};
var Yuri = {
    id: 2,
    age: '9 years',
    specie: Animals['1']
};
var Fred = {
    id: 3,
    age: '12 years',
    specie: Animals.turtle
};
AnimalHome.push(Saimon);
AnimalHome.push(Yuri);
AnimalHome.push(Fred);
console.log(AnimalHome);
console.log(AnimalHome.filter(function (item) { return item.specie === 0; }));
