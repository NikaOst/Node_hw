// Задание 1
// Напишите функцию `greetUser`, которая принимает имя пользователя (строка) и выводит приветственное сообщение в консоль:
// `"Привет, <name>!"`. Используйте строгую типизацию.

function greetUser(name: string): void {
  console.log(`Привет, ${name}!`);
}

greetUser('Anna');

// Задание 2
// Типизация функции с объектом в качестве параметра
// Создайте интерфейс `Person`, который описывает человека с полями `name`, `age`, и `city`.
// Напишите функцию `printPersonInfo`, которая принимает объект типа `Person` и выводит информацию о
// человеке в формате: `"Имя: <name>, Возраст: <age>, Город: <city>"`.
interface Person {
  name: string;
  age: number;
  city: string;
}

function printPersonInfo(person: Person): void {
  console.log('Name:', person.name);
  console.log('Age:', person.age);
  console.log('City:', person.city);
}

printPersonInfo({ name: 'Anna', age: 20, city: 'Tokio' });

// Задание 3
// Простая типизация для числового параметра
// Напишите функцию `squareNumber`, которая принимает число и возвращает его квадрат. Используйте строгую типизацию.
function squareNumber(num: number): number {
  return Math.pow(num, 2);
}

console.log(squareNumber(3));

// Задание 4
// Типизация функции с boolean
// Напишите функцию `isEven`, которая принимает число и возвращает `true`, если число четное, и `false`, если нечетное. Используйте строгую типизацию.
function isEven(num: number): boolean {
  return num % 2 === 0;
}

console.log(isEven(19));

// Задание 5
// Создание интерфейса для объекта
// Создайте интерфейс `Student`, который описывает студента с полями `name` (строка) и `grade` (число).
// Напишите функцию `printStudentInfo`, которая принимает объект типа `Student` и выводит информацию о студенте в формате: `"Студент: <name>, Оценка: <grade>"`.
interface Student {
  name: string;
  grade: number;
}

function printStudentInfo(student: Student): void {
  console.log('Name:', student.name);
  console.log('Grade:', student.grade);
}

printStudentInfo({ name: 'Max', grade: 100 });

// Задание 6
// Функция с типом `void`
// Напишите функцию `logMessage`, которая принимает строку и выводит её в консоль без возвращаемого значения. Используйте тип `void`.
function logMessage(str: string): void {
  console.log(str);
}

logMessage('Hello world!');
