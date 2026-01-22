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
            return this.normalizeString(deputy.name).includes(normalizedQuery) ||
                this.normalizeString(deputy.party).includes(normalizedQuery);
        });
    }

    getPartyStats(): Record<string, number> {
        const stats: Record<string, number> = {};
        this.deputies.forEach(dep => {
            const party = dep.party.toUpperCase();
            stats[party] = (stats[party] || 0) + 1;
        });
        return stats;
    }

    getLastUpdated(): string {
        return LAST_UPDATED;
    }

    private normalizeString(str: string): string {
        return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
}
