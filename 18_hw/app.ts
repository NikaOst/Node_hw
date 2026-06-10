// Задание 1
// Объединение и пересечение типов
// Создайте два типа: `Admin` и `User`.
// Тип `Admin` должен включать поля `name` (строка) и `permissions` (массив строк), а тип `User`
// должен включать поля `name` (строка) и `email` (строка).
// Создайте тип `AdminUser`, который объединяет свойства обоих типов, и создайте объект этого типа.
type Admin = {
  name: string;
  permissions: string[];
};
type User = {
  name: string;
  email: string;
};
type AdminUser = Admin & User;
const user: AdminUser = {
  name: 'Anna',
  permissions: ['a', 'b', 'c'],
  email: 'anna@gmail.com',
};
console.log(user);

// Задание 2
// Вложенные объекты и опциональные поля
// Создайте объект `Car` с полями `make` (строка), `model` (строка), и вложенным объектом `engine`,
// который имеет поля `type` (строка) и `horsepower` (число).
// Добавьте опциональное поле `year` (число) для года выпуска машины.
// Напишите функцию, которая выводит информацию о машине.
interface ICar {
  make: string;
  model: string;
  engine: {
    type: string;
    horsepower: number;
  };
  year?: number;
}

function carInfo(car: ICar): void {
  if (car.year) {
    console.log(
      `make: ${car.make}, modle:${car.model}, year:${car.year}, engine type: ${car.engine.type}, engine horsepower: ${car.engine.horsepower} `,
    );
  } else
    console.log(
      `make: ${car.make}, modle:${car.model}, engine type: ${car.engine.type}, engine horsepower: ${car.engine.horsepower} `,
    );
}

carInfo({
  make: 'make1',
  model: 'model1',
  engine: {
    type: 'type1',
    horsepower: 1200,
  },
  year: 2000,
});

carInfo({
  make: 'make2',
  model: 'model2',
  engine: {
    type: 'type2',
    horsepower: 1200,
  },
});

// Задание 3
// Интерфейс для функции с объектом
// Создайте интерфейс для функции `calculateDiscount`, которая принимает объект `Product` с полями `name` (строка)
// и `price` (число), а также параметр `discount` (число).
// Функция должна возвращать новую цену продукта с учетом скидки.

interface Product {
  name: string;
  price: number;
}
interface ICalculateDiscount {
  (prod: Product, discount: number): number;
}
const calculateDiscount: ICalculateDiscount = (prod, discount) => {
  return prod.price * (1 - discount);
};

console.log(calculateDiscount({ name: 'book', price: 200 }, 0.1));

// Задание 4
// Массив объектов и функции
// Создайте интерфейс `Employee`, который включает поля `name` (строка) и `salary` (число).
// Создайте массив объектов `Employee`, затем напишите функцию, которая принимает этот массив и возвращает массив зарплат всех сотрудников.

interface Employee {
  name: string;
  salary: number;
}
const employees: Employee[] = [
  { name: 'Anna', salary: 2000 },
  { name: 'Max', salary: 2500 },
  { name: 'Gale', salary: 5000 },
];

function salarys(arr: Employee[]): number[] {
  return arr.map((el: Employee): number => el.salary);
}
console.log(salarys(employees));

// Задание 5
// Наследование интерфейсов и работа с объектами
// Создайте интерфейс `Person` с полями `firstName` (строка) и `lastName` (строка).
// Создайте интерфейс `Student`, который наследует `Person` и добавляет поле `grade` (число).
// Создайте объект `student` этого типа и напишите функцию, которая выводит полное имя студента и его оценку.

interface IPerson {
  firstName: string;
  lastName: string;
}
interface IStudent extends IPerson {
  grade: number;
}

const student: IStudent = {
  firstName: 'Anna',
  lastName: 'Smyth',
  grade: 100,
};

function studentInfo(student: IStudent): void {
  console.log(`name: ${student.firstName} ${student.lastName}, grade: ${student.grade}`);
}

studentInfo(student);

// Задание 6
// Интерфейс для функции с несколькими параметрами
// Создайте интерфейс для функции `concatStrings`, которая принимает два параметра: `str1` и `str2` (оба строки) и возвращает их объединение.
// Реализуйте эту функцию и протестируйте её.

interface IConcatStrings {
  (str1: string, str2: string): string;
}

const concatStrings: IConcatStrings = (str1, str2) => {
  return `${str1} ${str2}`;
};

console.log(concatStrings('abc', 'dej'));
