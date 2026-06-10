"use strict";
const user = {
    name: 'Anna',
    permissions: ['a', 'b', 'c'],
    email: 'anna@gmail.com',
};
function carInfo(car) {
    if (car.year) {
        console.log(`make: ${car.make}, modle:${car.model}, year:${car.year}, engine type: ${car.engine.type}, engine horsepower: ${car.engine.horsepower} `);
    }
    else
        console.log(`make: ${car.make}, modle:${car.model}, engine type: ${car.engine.type}, engine horsepower: ${car.engine.horsepower} `);
}
const calculateDiscount = (prod, discount) => {
    return prod.price * (1 - discount);
};
const employees = [
    { name: 'Anna', salary: 2000 },
    { name: 'Max', salary: 2500 },
    { name: 'Gale', salary: 5000 },
];
function salarys(arr) {
    return arr.map((el) => el.salary);
}
const student = {
    firstName: 'Anna',
    lastName: 'Smyth',
    grade: 100,
};
function studentInfo(student) {
    console.log(`name: ${student.firstName} ${student.lastName}, grade: ${student.grade}`);
}
const concatStrings = (str1, str2) => {
    return `${str1} ${str2}`;
};
console.log(concatStrings('abc', 'dej'));
