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
                    normalized = normalized
                        .replace(/ e região/gi, '')
                        .replace(/^Região de /gi, '')
                        .replace(/^Região Metropolitana de /gi, '')
                        .replace(/^Região Metropolitana do /gi, '')
                        .replace(/ e Região/gi, '') // Case sensitive catch
                        .trim();
                }

                // Specific normalization for Areas of Activity
                if (field === 'areasOfActivity') {
                    const lower = normalized.toLowerCase();
                    if (lower.includes('animal') || lower.includes('animais')) normalized = 'Causa Animal';
                    else if (lower.includes('mulher')) normalized = 'Defesa da Mulher';
                    else if (lower.includes('saúde') && !lower.includes('animal')) normalized = 'Saúde';
                    else if (lower.includes('educação')) normalized = 'Educação';
                    else if (lower.includes('segurança')) normalized = 'Segurança';
                    else if (lower.includes('meio ambiente')) normalized = 'Meio Ambiente';
                    else if (lower.includes('habitação')) normalized = 'Habitação';
                    else if (lower.includes('agricultura')) normalized = 'Agricultura';
                    else if (lower.includes('esporte')) normalized = 'Esportes';
                    else if (lower.includes('cultura')) normalized = 'Cultura';
                    else if (lower.includes('transporte')) normalized = 'Transportes';
                    else if (lower.includes('idoso') || lower.includes('terceira idade')) normalized = 'Idosos';
                    else if (lower.includes('deficiência') || lower.includes('pcd') || lower.includes('inclusão')) normalized = 'Pessoas com Deficiência';
                    else if (lower.includes('criança') || lower.includes('adolescente') || lower.includes('infância')) normalized = 'Criança e Adolescente';

                    // remove trailing period
                    normalized = normalized.replace(/\.$/, '');
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
