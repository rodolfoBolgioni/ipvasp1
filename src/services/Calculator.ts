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

    fuelTaxTotal: number; // Fuel Price * (Tax% / 100) * (Mileage / Efficiency) * Years

    totalTaxCurrent: number;  // TaxValue + (IPVA Current * Years) + FuelTaxTotal
    totalTaxProposed: number; // TaxValue + (IPVA Proposed * Years) + FuelTaxTotal
}

export class CalculatorService {
    calculate(
        price: number,
        taxRate: number = 41.3,
        years: number = 5,
        fuelPrice: number = 6.29,
        fuelTaxPercent: number = 25.0,
        mileage: number = 15000,
        efficiency: number = 10.0
    ): CalculatorResult {
        // 1. Tax Value (Purchase)
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

        // 5. Fuel Tax (New)
        // Liters per year = Mileage / Efficiency
        // Tax per liter = Price * (Tax% / 100)
        // Total Tax = Liters * TaxPerLiter * Years
        const litersPerYear = mileage / efficiency;
        const fuelTaxPerLiter = fuelPrice * (fuelTaxPercent / 100);
        const fuelTaxTotal = litersPerYear * fuelTaxPerLiter * years;

        // 6. Total Tax (Long Term)
        // Includes Purchase Tax + IPVA * Years + FuelTax * Years
        const totalTaxCurrent = taxValue + (ipvaCurrent * years) + fuelTaxTotal;
        const totalTaxProposed = taxValue + (ipvaProposed * years) + fuelTaxTotal;

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
            fuelTaxTotal,
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
