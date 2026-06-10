// Задание 1
// Класс `Animal` и его наследник `Dog`
// Создайте класс `Animal`, который содержит свойства `name` (имя животного) и `species` (вид животного).
// Добавьте метод `sound()`, который выводит в консоль `"The animal makes a sound"`.
// Затем создайте класс-наследник `Dog`, который добавляет новое свойство `breed` (порода собаки)
// и переопределяет метод `sound()`, чтобы он выводил `"The dog barks"`.

class Animal {
  public name: string;
  public species: string;
  constructor(name: string, species: string) {
    this.name = name;
    this.species = species;
  }
  sound(): void {
    console.log('The animal makes a sound');
  }
}
class Dog extends Animal {
  public breed: string;
  constructor(name: string, species: string, breed: string) {
    super(name, species);
    this.breed = breed;
  }
  sound(): void {
    console.log('The dog barks');
  }
}
const dog = new Dog('Bobbi', 'dog', 'red dog');
dog.sound();
// ---------------------------------------------------------------

// Задание 2
// Статическое свойство для учета всех книг
// Создайте класс `Library`, который имеет статическое свойство `totalBooks` (общее количество книг).
// При каждом добавлении книги это свойство должно увеличиваться.
// В классе также должен быть метод `addBook()`, который увеличивает счетчик книг.
// Создайте несколько объектов класса и проверьте, как изменяется общее количество книг.
class Library {
  static totalBooks: number = 0;
  addBook(): void {
    Library.totalBooks++;
    console.log(Library.totalBooks);
  }
}
const book = new Library();
book.addBook();
book.addBook();
book.addBook();

// ---------------------------------------------------------------

// Задание 3
// Переопределение конструктора в классе `Vehicle`
// Создайте класс `Vehicle`, который содержит свойства `make` (марка) и `model` (модель).
// Добавьте конструктор, который инициализирует эти свойства.
// Затем создайте класс-наследник `Motorcycle`, который добавляет новое свойство `type` (тип мотоцикла)
// и переопределяет конструктор для инициализации всех трех свойств.
// Убедитесь, что данные правильно инициализируются при создании объекта.
class Vehicle {
  public make: string;
  public model: string;
  constructor(make: string, model: string) {
    this.make = make;
    this.model = model;
  }
}
class Motorcycle extends Vehicle {
  public type: string;
  constructor(make: string, model: string, type: string) {
    super(make, model);
    this.type = type;
  }
}

const motorcycle = new Motorcycle('Alld', 'A332', 'motor');
console.log(motorcycle);
