const db = require('./db/database');
const Employee = require('./module/employee');

async function createEmployee(name, age, salary) {
    await Employee.create({ name, age, salary });
    console.log('Funcionário ' + name + ' criado com sucesso!');
}

async function readEmployees() {
    console.log(await Employee.findAll());
}

async function updateSalaryEmployee(name, salary) {
    const employee = await Employee.findOne({
        where: {
            name: name,
        },
    });
    employee.salary = salary;
    await employee.save();
}

async function deleteEmployee(id) {
    await Employee.destroy({
        where: {
            id: id,
        },
    });
    console.log('Funcionário deletado com sucesso!');
}

db.sync()
    .then((res) => {
        console.log('Banco conectado');
    })
    .catch((err) => {
        console.log(err);
    });

createEmployee('Cláudio', 19, 5000.99);
updateSalaryEmployee('Gustavo', 10000);
deleteEmployee(3)
    .then((res) => {
        readEmployees();
    })
    .catch((err) => {
        console.log(err);
    });

console.log('Fim da aplicação');

// let old_salary_employee = false;
// let new_salary_employee = old_salary_employee ?? 3000;
// console.log(new_salary_employee);
