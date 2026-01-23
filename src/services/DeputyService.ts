import { Deputy } from '../core/types';
import deputiesData from '../data/deputies.json';

const INITIAL_DEPUTIES: Deputy[] = deputiesData.deputies as Deputy[];
const LAST_UPDATED = deputiesData.lastUpdated;

export class DeputyService {
    private deputies: Deputy[];

    constructor(initialData: Deputy[] = INITIAL_DEPUTIES) {
        this.deputies = initialData;
        this.sortDeputies();
    }

    private sortDeputies() {
        this.deputies.sort((a, b) => a.name.localeCompare(b.name));
    }

    getAll(): Deputy[] {
        return this.deputies;
    }

    search(query: string): Deputy[] {
        const normalizedQuery = this.normalizeString(query);
        return this.deputies.filter(deputy => {
            return Object.values(deputy).some(value => {
                if (typeof value === 'string') {
                    return this.normalizeString(value).includes(normalizedQuery);
                }
                return false;
            });
        });
    }

    getStats(field: keyof Deputy): Record<string, number> {
        const stats: Record<string, number> = {};

        this.deputies.forEach(dep => {
            const rawValue = dep[field];
            if (!rawValue) return;

            // Split by ; or new line
            const values = rawValue.toString().split(/[;\n]+/).map(v => v.trim()).filter(v => v.length > 0);

            values.forEach(val => {
                let normalized = val.trim();

                // Specific normalization for Regions (electoralBase)
                if (field === 'electoralBase') {
                    normalized = this.normalizeRegion(normalized);
                }

                // Specific normalization for Areas of Activity
                if (field === 'areasOfActivity') {
                    normalized = this.normalizeArea(normalized);
                }

                if (normalized) {
                    stats[normalized] = (stats[normalized] || 0) + 1;
                }
            });
        });

        // Sort by count descending
        return Object.fromEntries(
            Object.entries(stats).sort(([, a], [, b]) => b - a)
        );
    }

    public normalizeRegion(region: string): string {
        return region
            .replace(/ e região/gi, '')
            .replace(/^Região de /gi, '')
            .replace(/^Região Metropolitana de /gi, '')
            .replace(/^Região Metropolitana do /gi, '')
            .replace(/ e Região/gi, '') // Case sensitive catch
            .trim();
    }

    public normalizeArea(area: string): string {
        let normalized = area.trim();
        const lower = normalized.toLowerCase();

        if (lower.includes('animal') || lower.includes('animais')) return 'Causa Animal';
        if (lower.includes('mulher')) return 'Defesa da Mulher';
        if (lower.includes('saúde') && !lower.includes('animal')) return 'Saúde';
        if (lower.includes('educação')) return 'Educação';
        if (lower.includes('segurança')) return 'Segurança';
        if (lower.includes('meio ambiente')) return 'Meio Ambiente';
        if (lower.includes('habitação')) return 'Habitação';
        if (lower.includes('agricultura')) return 'Agricultura';
        if (lower.includes('esporte')) return 'Esportes';
        if (lower.includes('cultura')) return 'Cultura';
        if (lower.includes('transporte')) return 'Transportes';
        if (lower.includes('idoso') || lower.includes('terceira idade')) return 'Idosos';
        if (lower.includes('deficiência') || lower.includes('pcd') || lower.includes('inclusão')) return 'Pessoas com Deficiência';
        if (lower.includes('criança') || lower.includes('adolescente') || lower.includes('infância')) return 'Criança e Adolescente';

        // remove trailing period
        return normalized.replace(/\.$/, '');
    }

    getPartyStats(): Record<string, number> {
        return this.getStats('party');
    }

    getLastUpdated(): string {
        return LAST_UPDATED;
    }

    private normalizeString(str: string): string {
        return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
}
