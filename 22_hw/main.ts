// Задание 1
// В файле `main.ts` импортируйте эти функции и протестируйте их на примерах строк.
import { capitalize, reverseString } from './stringUtils.js';

console.log(capitalize('hello'));
console.log(reverseString('world'));

// Задание 2
// Используйте эти классы в файле `main.ts` для расчета платежей по кредиту и налога на примерных данных.
import { Finance } from './finance.js';
console.log('payment:', Finance.LoanCalculator.monthlyPayment(1_000_000, 12, 60));
console.log('tax:', Finance.TaxCalculator.calculateIncomeTax(200_000, 13));

// Задание 3
// Используйте этот класс в файле `main.ts` для создания администратора и изменения его прав.
import { UserManagement } from './userManagement.js';
const user = new UserManagement.Admin.AdminUser('Anna', 'anna@gmail.com', false);
user.makeSAdmin();
console.log('is Anna admin: ', user.isSuperAdmin);
user.makeUser();
console.log('is Anna admin: ', user.isSuperAdmin);

// Задание 4
// В файле `main.ts` импортируйте эти функции и протестируйте их на примерах.
import { generateFibonacci, generatePrimeNumbers } from './sequenceUtils.js';
console.log(generateFibonacci(2));
console.log(generatePrimeNumbers(8));
