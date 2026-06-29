// Создайте файл `finance.ts`, в котором определите пространство имен `Finance`.
// Внутри него создайте классы:
// `LoanCalculator`, который рассчитывает ежемесячные платежи по кредиту по формуле аннуитета.
// `TaxCalculator`, который рассчитывает налог на доход.

export namespace Finance {
  export class LoanCalculator {
    static monthlyPayment(principal: number, annualRate: number, months: number): number {
      const monthlyRate = annualRate / 12 / 100;

      if (monthlyRate === 0) return principal / months;

      const k = Math.pow(1 + monthlyRate, months);
      return (principal * monthlyRate * k) / (k - 1);
    }
  }
  export class TaxCalculator {
    static calculateIncomeTax(income: number, taxRate: number): number {
      return income * (taxRate / 100);
    }
  }
}
