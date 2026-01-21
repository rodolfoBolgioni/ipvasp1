export interface Deputy {
    name: string;
    party: string;
    room: string;
    phone: string;
    email: string;
    site?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
}

export type TaxRate = 0.01 | 0.02 | 0.03 | 0.04;

export interface CalculationResult {
    originalTax: number;
    proposedTax: number;
    savings: number;
}
