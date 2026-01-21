import { AnalyticsService } from '../services/AnalyticsService';

export class ImpactSection {
    private analytics: AnalyticsService;

    constructor() {
        this.analytics = new AnalyticsService();
    }

    render(): string {
        return `
        <section class="py-12 bg-white border-t border-slate-100">
            <div class="container mx-auto px-4">
                 <div class="text-center mb-8">
                    <h3 class="text-2xl font-bold text-slate-800">Nosso Impacto</h3>
                    <p class="text-slate-500">A força da nossa mobilização em números.</p>
                </div>
                
                <div class="grid grid-cols-2 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    <!-- E-mails -->
                    <div class="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center hover:border-blue-200 transition-colors">
                        <div class="text-blue-500 text-3xl mb-2"><i class="fas fa-paper-plane"></i></div>
                        <div id="counter-emails" class="text-3xl font-extrabold text-slate-800 block">...</div>
                        <div class="text-sm text-slate-500 uppercase tracking-wide font-semibold mt-1">E-mails Enviados</div>
                    </div>

                    <!-- Visitas -->
                    <div class="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center hover:border-emerald-200 transition-colors">
                        <div class="text-emerald-500 text-3xl mb-2"><i class="fas fa-users"></i></div>
                        <div id="counter-visits" class="text-3xl font-extrabold text-slate-800 block">...</div>
                        <div class="text-sm text-slate-500 uppercase tracking-wide font-semibold mt-1">Acessos ao Site</div>
                    </div>
                </div>
            </div>
        </section>
        `;
    }

    init() {
        this.refresh();
    }

    public refresh() {
        // Visits (Increment)
        this.analytics.trackCounterAction('visits');

        // Read Visits for Display
        this.fetchAndDisplay('visits', 'counter-visits');
        this.fetchAndDisplay('emails', 'counter-emails');
    }

    private fetchAndDisplay(metric: 'visits' | 'emails', elementId: string) {
        // For reading, we use the endpoint without /up/ usually
        const url = `https://api.counterapi.dev/v1/ipva1sp.com.br/${metric}/`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const el = document.getElementById(elementId);
                if (el) el.innerText = data.count.toLocaleString('pt-BR');
            })
            .catch(err => {
                console.error(`Meta read error ${metric}`, err);
            });
    }
}
