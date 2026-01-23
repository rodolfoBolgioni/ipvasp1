import { describe, it, expect } from 'vitest';
import { DeputyService } from './DeputyService';
import { Deputy } from '../core/types';

const MOCK_DEPUTIES: Deputy[] = [
    { name: "Zebra", party: "A", room: "1", phone: "1", email: "z@z.com" },
    { name: "Alpha", party: "B", room: "2", phone: "2", email: "a@a.com" },
    { name: "Beta", party: "A", room: "3", phone: "3", email: "b@b.com" }
];

describe('DeputyService', () => {
    const service = new DeputyService(MOCK_DEPUTIES);

    it('should sort deputies alphabetically by name on init', () => {
        const all = service.getAll();
        expect(all[0].name).toBe("Alpha");
        expect(all[1].name).toBe("Beta");
        expect(all[2].name).toBe("Zebra");
    });

    it('should filter by name case-insensitive', () => {
        const results = service.search("alpha");
        expect(results.length).toBe(1);
        expect(results[0].name).toBe("Alpha");
    });

    it('should filter by party', () => {
        // "A" matches Party A (Zebra, Beta) AND Name "Alpha"
        const resultsA = service.search("A");
        expect(resultsA.length).toBe(3);
    });

    it('should handle accents', () => {
        const serviceWithAccents = new DeputyService([
            { name: "João", party: "PT", room: "1", phone: "1", email: "j@j.com" }
        ]);
        const results = serviceWithAccents.search("joao");
        expect(results.length).toBe(1);
    });

    it('should filter by other fields (room, email)', () => {
        const resultsRoom = service.search("1"); // Zebra (room 1)
        expect(resultsRoom.some(d => d.name === "Zebra")).toBe(true);

        const resultsEmail = service.search("z.com"); // Zebra (z@z.com)
        expect(resultsEmail.length).toBe(1);
        expect(resultsEmail[0].name).toBe("Zebra");
    });
    it('should calculate party stats', () => {
        const stats = service.getStats('party');
        expect(stats["A"]).toBe(2);
        expect(stats["B"]).toBe(1);
    });

    it('should split and count stats for multi-value fields', () => {
        const serviceMulti = new DeputyService([
            { ...MOCK_DEPUTIES[0], areasOfActivity: "Saúde; Educação" },
            { ...MOCK_DEPUTIES[1], areasOfActivity: "Saúde" },
            { ...MOCK_DEPUTIES[2], areasOfActivity: "Educação\nSegurança" }
        ]);

        const stats = serviceMulti.getStats('areasOfActivity');
        expect(stats['Saúde']).toBe(2);
        expect(stats['Educação']).toBe(2);
        expect(stats['Segurança']).toBe(1);
    });

    it('should normalize regions', () => {
        const serviceNorm = new DeputyService([
            { ...MOCK_DEPUTIES[0], electoralBase: "Ribeirão Preto" },
            { ...MOCK_DEPUTIES[1], electoralBase: "Ribeirão Preto e região" },
            { ...MOCK_DEPUTIES[2], electoralBase: "Região Metropolitana de Ribeirão Preto" }
        ]);

        const stats = serviceNorm.getStats('electoralBase');
        // All should collapse to "Ribeirão Preto"
        expect(stats['Ribeirão Preto']).toBe(3);
    });

    it('should normalize areas of activity', () => {
        const serviceNorm = new DeputyService([
            { ...MOCK_DEPUTIES[0], areasOfActivity: "Saúde Pública" },
            { ...MOCK_DEPUTIES[1], areasOfActivity: "Saúde" },
            { ...MOCK_DEPUTIES[2], areasOfActivity: "Proteção Animal" },
            { ...MOCK_DEPUTIES[0], areasOfActivity: "Causa Animal" }
        ]);

        const stats = serviceNorm.getStats('areasOfActivity');
        expect(stats['Saúde']).toBe(2);
        expect(stats['Causa Animal']).toBe(2);
    });

    it('should normalize Esporte and Esportes to Esportes', () => {
        const serviceNorm = new DeputyService([
            { ...MOCK_DEPUTIES[0], areasOfActivity: "Esporte" },
            { ...MOCK_DEPUTIES[1], areasOfActivity: "Esportes" },
            { ...MOCK_DEPUTIES[2], areasOfActivity: "Esporte e Lazer" }
        ]);

        const stats = serviceNorm.getStats('areasOfActivity');
        expect(stats['Esportes']).toBe(3);
        expect(stats['Esporte']).toBeUndefined();
    });

    it('should return last updated date', () => {
        const date = service.getLastUpdated();
        expect(date).toBeDefined();
    });
});

