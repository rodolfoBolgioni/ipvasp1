import { describe, it, expect } from 'vitest';
import { CalculatorService } from './Calculator';

describe('CalculatorService', () => {
    const calculator = new CalculatorService();

    it('should calculate savings correctly for 100k vehicle', () => {
        const result = calculator.calculateSavings(100000);

        expect(result.originalTax).toBe(4000); // 4% of 100k
        expect(result.proposedTax).toBe(1000); // 1% of 100k
        expect(result.savings).toBe(3000);
    });

    it('should calculate savings correctly for 50k vehicle', () => {
        const result = calculator.calculateSavings(50000);

        expect(result.originalTax).toBe(2000);
        expect(result.proposedTax).toBe(500);
        expect(result.savings).toBe(1500);
    });

    it('should throw error for negative values', () => {
        expect(() => calculator.calculateSavings(-100)).toThrow();
    });

    it('should format currency correctly pt-BR', () => {
        const formatted = calculator.formatCurrency(1000);
        // Note: Exact string match might depend on node locale settings, 
        // using regex related match or partial string check is safer usually,
        // but let's try standard check first.
        expect(formatted).toContain('1.000,00');
    });
});
