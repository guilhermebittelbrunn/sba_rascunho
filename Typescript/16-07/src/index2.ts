type name = string

interface genericObjetc{
    id: number
    status: boolean | object
    name: name
    getName():Object
}



const someObject:genericObjetc = {
    id: 1,
    status:false,
    name: 'any',
    getName(){return this.name}
}

// console.log(someObject)
console.log(someObject.getName());