var someObject = {
    id: 1,
    status: false,
    name: 'any',
    getName: function () { return this.name; }
};
// console.log(someObject)
console.log(someObject.getName());
