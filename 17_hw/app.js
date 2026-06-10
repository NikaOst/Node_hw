"use strict";
// Задание 1
// Типизация функции с несколькими параметрами
// Напишите функцию `calculateTotal`, которая принимает три параметра:
// `price` (число)
// `quantity` (число)
// `discount` (число, по умолчанию равен 0)
// Функция должна возвращать общую стоимость товаров с учетом скидки. Если скидка не указана, она считается равной нулю.
function calculateTotal(price, quantity, discount = 0) {
    return price * quantity * (1 - discount);
}
// console.log(calculateTotal(100, 2, 0.2));
// ---------------------------------------------------------
// Задание 2
// Использование Union типов
// Создайте переменную `id`, которая может быть либо строкой, либо числом.
// Напишите функцию `displayId`, которая принимает эту переменную и выводит сообщение,
// содержащее значение ID. Если `id` — строка, выведите её в верхнем регистре.
// Если `id` — число, умножьте его на 10 перед выводом.
let id;
function displayId(id) {
    if (typeof id === 'string') {
        console.log(id.toUpperCase());
    }
    else if (typeof id === 'number') {
        console.log(id * 100);
    }
}
// displayId('hello');
// displayId(100);
// ---------------------------------------------------------
// Задание 3
// Объявление и типизация массивов объектов
// Создайте массив объектов `orders`, где каждый объект описывает заказ и содержит следующие свойства:
// `orderId` (строка)
// `amount` (число)
// `status` (строка, может принимать значения "pending", "shipped" или "delivered")
// Напишите функцию `filterOrdersByStatus`, которая принимает этот массив и строку `status`,
// и возвращает массив заказов, соответствующих указанному статусу.
const orders = [];
function filterOrdersByStatus(orders = [], status) {
    return orders.filter((el) => el.status === status);
}
// console.log(
//   filterOrdersByStatus(
//     [
//       { orderId: '1', amount: 2, status: 'pending' },
//       { orderId: '2', amount: 3, status: 'delivered' },
//       { orderId: '3', amount: 1, status: 'shipped' },
//     ],
//     'pending',
//   ),
// );
// ---------------------------------------------------------
// Задание 4
// Работа с кортежами и объектами
// Создайте кортеж `productInfo`, который содержит:
// название товара (строка)
// его цену (число)
// количество на складе (число)
// Напишите функцию `updateStock`, которая принимает объект `inventory`
// (где ключ — это название товара, а значение — количество на складе) и кортеж `productInfo`.
// Функция должна прибавить изменение количества из кортежа
// к текущему значению в inventory (если товара ещё нет,
// добавить его с этим количеством) и вернуть обновлённый объект.
const productInfo = ['apple', 20, 20];
function updateStock(inventory, productInfo) {
    const [name] = productInfo;
    const amount = productInfo[2];
    inventory[name] += amount;
    return inventory;
}
console.log(updateStock({ apple: 3 }, productInfo));
