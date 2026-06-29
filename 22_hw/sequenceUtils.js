// `generateFibonacci`, которая генерирует последовательность Фибоначчи до указанного числа.
// `generatePrimeNumbers`, которая генерирует простые числа до указанного числа.
export function generateFibonacci(num) {
    if (num < 0)
        return [];
    if (num === 0)
        return 0;
    const result = [0, 1];
    while (true) {
        const next = result[result.length - 1] + result[result.length - 2];
        if (next > num)
            break;
        result.push(next);
    }
    return result;
}
export function generatePrimeNumbers(num) {
    if (num < 2)
        return [];
    const primes = [];
    for (let i = 2; i <= num; i++) {
        let isPrime = true;
        for (let j = 2; j * j <= i; j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime)
            primes.push(i);
    }
    return primes;
}
