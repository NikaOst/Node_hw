"use strict";
// Задание 1
// abstract class Animal {
//   abstract makeSound(): string;
// }
// class Dog extends Animal {
//   makeSound(): string {
//     return 'Bark';
//   }
// }
// class Cat extends Animal {
//   makeSound(): string {
//     return 'Meow';
//   }
// }
// const array: Animal[] = [new Dog(), new Cat()];
// console.log(array[0].makeSound());
// console.log(array[1].makeSound());
// Задание 2
// abstract class Shape {
//   abstract name: string;
//   abstract calculateArea(): number;
// }
// abstract class ColoredShape extends Shape {
//   abstract color: string;
// }
// class ColoredCircle extends ColoredShape {
//   color: string = 'red';
//   name: string = 'circle';
//   constructor(public radius: number) {
//     super();
//   }
//   calculateArea(): number {
//     return Math.PI * this.radius ** 2;
//   }
// }
// class ColoredRectangle extends ColoredShape {
//   color: string = 'green';
//   name: string = 'rectangle';
//   constructor(
//     public width: number,
//     public height: number,
//   ) {
//     super();
//   }
//   calculateArea(): number {
//     return this.width * this.height;
//   }
// }
// const circle = new ColoredCircle(20);
// const rectangle = new ColoredRectangle(2, 3);
// console.log(`${circle.name} is ${circle.color}, area = ${circle.calculateArea()}`);
// console.log(`${rectangle.name} is ${rectangle.color}, area = ${rectangle.calculateArea()}`);
// Задание 3
// abstract class Appliance {
//   abstract turnOn(): string;
//   abstract turnOff(): string;
// }
// class WashingMachine extends Appliance {
//   turnOn(): string {
//     return 'washmachine is on';
//   }
//   turnOff(): string {
//     return 'washmachine is off';
//   }
// }
// class Refrigerator extends Appliance {
//   turnOn(): string {
//     return 'refrigerator is on';
//   }
//   turnOff(): string {
//     return 'refrigerator is off';
//   }
// }
// const array: Appliance[] = [new WashingMachine(), new Refrigerator()];
// console.log(array[0].turnOn());
// console.log(array[0].turnOff());
// console.log(array[1].turnOn());
// console.log(array[1].turnOff());
// Задание 4
// abstract class Account {
//   abstract deposit(amount: number): number;
//   abstract withdraw(amount: number): number;
// }
// class SavingsAccount extends Account {
//   private balance: number = 0;
//   deposit(amount: number): number {
//     this.balance += amount;
//     this.balance += this.balance * 0.5;
//     return this.balance;
//   }
//   withdraw(amount: number): number {
//     if (amount > this.balance) {
//       throw new Error('Недостаточно средств');
//     }
//     this.balance -= amount;
//     return this.balance;
//   }
// }
// class CheckingAccount extends Account {
//   private balance: number = 0;
//   private fee: number = 10;
//   deposit(amount: number): number {
//     this.balance += amount;
//     return this.balance;
//   }
//   withdraw(amount: number): number {
//     const totalAmount = amount + this.fee;
//     if (totalAmount > this.balance) {
//       throw new Error('Недостаточно средств');
//     }
//     this.balance -= totalAmount;
//     return this.balance;
//   }
// }
// const checkingAccount = new CheckingAccount();
// const savingsAccount = new SavingsAccount();
// console.log(checkingAccount.deposit(100));
// console.log(checkingAccount.withdraw(10));
// console.log(savingsAccount.deposit(100));
// console.log(savingsAccount.withdraw(10));
// Задание 5
// Создайте абстрактный класс `Media` с абстрактным методом `play()`.
// Затем создайте классы `Audio` и `Video`, которые наследуют `Media` и реализуют метод
// `play()` по-своему (например, `Audio` выводит "Playing audio", а `Video` — "Playing video").
// Создайте массив типа `Media[]`, включающий объекты `Audio` и `Video`,
// и вызовите метод `play()` для каждого элемента массива.
class Media {
}
class Auudio extends Media {
    play() {
        return 'Playing audio';
    }
}
class Video extends Media {
    play() {
        return 'Playing video';
    }
}
const array = [new Auudio(), new Video()];
console.log(array[0].play());
console.log(array[1].play());
