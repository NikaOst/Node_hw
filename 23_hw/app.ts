// Задание 1
// Обработка цепочки промисов с `async/await`
// Создайте несколько функций, которые возвращают промисы с разным временем выполнения.
// Напишите функцию, которая вызывает эти промисы поочерёдно, используя `await`, и обрабатывает
// результаты каждой операции.
// Убедитесь, что цепочка промисов выполняется последовательно.
async function func1(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('hello');
    }, 1000);
  });
}
async function func2(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('world');
    }, 1500);
  });
}

async function callfunc(): Promise<void> {
  console.log(await func1());
  console.log(await func2());
}

callfunc();

// Задание 2
// Асинхронная обработка данных из массива
// Напишите функцию, которая принимает массив строк.
// Каждая строка будет асинхронно обрабатываться (например, преобразовываться в верхний регистр с задержкой).
// Используйте `Promise.all` для выполнения всех операций параллельно и вывода всех результатов.
async function strToUpperCase(strs: string[]): Promise<void> {
  const new_arr: Promise<string>[] = strs.map(
    (el: string): Promise<string> => processOneString(el),
  );
  console.log(await Promise.all(new_arr));
}

function processOneString(str: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(str.toUpperCase());
    }, 1000);
  });
}

strToUpperCase(['hello', 'world', 'typescript']);

// Задание 3
// Обработка ошибки в параллельных промисах
// Напишите функцию, которая вызывает три промиса параллельно с помощью `Promise.all`.
// Один из промисов должен намеренно завершиться с ошибкой через `reject`.
// Обработайте эту ошибку с использованием `try/catch` и выведите соответствующее сообщение.

async function callAsyncFuncs(): Promise<void> {
  try {
    console.log(await Promise.all([resolved1(), resolved2(), rejected()]));
  } catch (error) {
    console.log('Error:', error);
  }
}

async function rejected(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Error');
    }, 2000);
  });
}
async function resolved1(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello');
    }, 1000);
  });
}

async function resolved2(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('World');
    }, 1500);
  });
}

callAsyncFuncs();

// Задание 4
// Асинхронная функция с динамическим временем выполнения
// Напишите асинхронную функцию, которая принимает массив чисел.
// Для каждого числа создайте промис, который будет завершаться через количество миллисекунд,
//  равное значению числа.
// Используйте `Promise.all` для ожидания завершения всех промисов и вывода результатов в консоль.
async function numsFunc(numbers: number[]): Promise<void> {
  const promises: Promise<string>[] = numbers.map((el: number): Promise<string> => waitFunc(el));
  console.log(await Promise.all(promises));
}

function waitFunc(num: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${num} - ${num} мс`);
    }, num);
  });
}

numsFunc([300, 1000, 500, 2000]);
