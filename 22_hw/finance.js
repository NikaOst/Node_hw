// Создайте файл `finance.ts`, в котором определите пространство имен `Finance`.
// Внутри него создайте классы:
// `LoanCalculator`, который рассчитывает ежемесячные платежи по кредиту по формуле аннуитета.
// `TaxCalculator`, который рассчитывает налог на доход.
export var Finance;
(function (Finance) {
    class LoanCalculator {
        static monthlyPayment(principal, annualRate, months) {
            const monthlyRate = annualRate / 12 / 100;
            if (monthlyRate === 0)
                return principal / months;
            const k = Math.pow(1 + monthlyRate, months);
            return (principal * monthlyRate * k) / (k - 1);
        }
    }
    Finance.LoanCalculator = LoanCalculator;
    class TaxCalculator {
        static calculateIncomeTax(income, taxRate) {
            return income * (taxRate / 100);
        }
    }
    Finance.TaxCalculator = TaxCalculator;
})(Finance || (Finance = {}));
