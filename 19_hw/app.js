"use strict";
// Задание 1
// Напишите стрелочную функцию `sumEvenNumbers`, которая принимает массив
// чисел и возвращает сумму всех четных чисел.
const sumEvenNumbers = (arr) => {
    return arr.reduce((sum, el) => {
        if (el % 2 === 0)
            sum += el;
        return sum;
    }, 0);
};
const stringToBoolean = (str) => {
    return str.length > 0;
};
const compareStrings = (str1, str2) => {
    return str1 === str2;
};
// console.log(compareStrings('hello', 'hello'));
// console.log(compareStrings('ascs', 'aaa'));
// ---------------------------------------------------------------
// Задание 4
// Напишите обобщенную функцию `getLastElement`, которая принимает массив любого типа и
// возвращает последний элемент этого массива.
function getLastElement(arr) {
    return arr[arr.length - 1];
}
// console.log(getLastElement(['a', 'b', 'c']));
// console.log(getLastElement(['1', '2', '3']));
// ---------------------------------------------------------------
// Задание 5
// Создайте обобщенную функцию `make Triple`, которая принимает три аргумента одного типа и
// возвращает массив из этих трёх элементов.
function makeTriple(a, b, c) {
    return [a, b, c];
}
console.log(makeTriple(1, 2, 3));
