export interface CalculatorResult {
    price: number;
    taxRate: number;      // e.g. 41.3
    years: number;       // e.g. 5

    taxValue: number;     // Price * (Rate/100)
    costReal: number;     // Price - TaxValue
    markup: number;       // (TaxValue / CostReal) * 100

    ipvaCurrent: number;  // Price * 0.04
    ipvaProposed: number; // Price * 0.01
    savings: number;      // IPVA Current - Proposed

    totalTaxCurrent: number;  // TaxValue + (IPVA Current * Years)
    totalTaxProposed: number; // TaxValue + (IPVA Proposed * Years)
}

export class CalculatorService {
    calculate(price: number, taxRate: number = 41.3, years: number = 5): CalculatorResult {
        // 1. Tax Value
        const taxValue = price * (taxRate / 100);

        // 2. Cost Real
        const costReal = price - taxValue;

        // 3. Markup
        let markup = 0;
        if (costReal > 0) {
            markup = (taxValue / costReal) * 100;
        }

        // 4. IPVA
        const ipvaCurrent = price * 0.04;
        const ipvaProposed = price * 0.01;
        const savings = ipvaCurrent - ipvaProposed;

        // 5. Total Tax (Long Term)
        const totalTaxCurrent = taxValue + (ipvaCurrent * years);
        const totalTaxProposed = taxValue + (ipvaProposed * years);

        return {
            price,
            taxRate,
            years,
            taxValue,
            costReal,
            markup,
            ipvaCurrent,
            ipvaProposed,
            savings,
            totalTaxCurrent,
            totalTaxProposed
        };
    }

    formatCurrency(value: number): string {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    formatPercent(value: number): string {
        return value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 2 }) + '%';
    }
}
