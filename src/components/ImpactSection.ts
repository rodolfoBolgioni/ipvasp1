import { AnalyticsService } from '../services/AnalyticsService';
import { DeputyService } from '../services/DeputyService';

export class ImpactSection {
    private analytics: AnalyticsService;
    private deputyService: DeputyService;

    constructor() {
        this.analytics = new AnalyticsService();
        this.deputyService = new DeputyService();
    }

    render(): string {
        return `
        <section class="py-12 bg-white border-t border-slate-100">
            <div class="container mx-auto px-4">
                 <div class="text-center mb-8">
                    <h2 class="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Nosso Impacto</h2>
                    <p class="text-slate-500">A força da nossa mobilização em números reais.</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
                    <!-- E-mails -->
                    <div class="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center hover:border-blue-200 transition-colors shadow-sm">
                        <div class="text-blue-500 text-3xl mb-2"><i class="fas fa-paper-plane"></i></div>
                        <div id="counter-emails" class="text-3xl font-extrabold text-slate-800 block">...</div>
                        <div class="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">E-mails Enviados</div>
                    </div>

                    <!-- Visitas -->
                    <div class="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center hover:border-emerald-200 transition-colors shadow-sm">
                        <div class="text-emerald-500 text-3xl mb-2"><i class="fas fa-users"></i></div>
                        <div id="counter-visits" class="text-3xl font-extrabold text-slate-800 block">...</div>
                        <div class="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Acessos ao Site</div>
                    </div>

                    <!-- Respostas (NEW) -->
                    <div class="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center hover:border-teal-200 transition-colors shadow-sm">
                        <div class="text-teal-500 text-3xl mb-2"><i class="fas fa-comment-dots"></i></div>
                        <div id="counter-responses" class="text-3xl font-extrabold text-slate-800 block">...</div>
                        <div class="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Total de Respostas</div>
                    </div>
                </div>

                <div id="top-responders-container" class="max-w-5xl mx-auto">
                    <!-- Top Responders will be injected here -->
                </div>
            </div>
        </section>
        `;
    }

    init() {
        this.refresh();
    }

    public async refresh() {
        // Visits (Increment)
        this.analytics.trackCounterAction('visits');

        // Load responses
        await this.deputyService.loadResponseCounts();

        // Update UI
        this.fetchAndDisplay('visits', 'counter-visits');
        this.fetchAndDisplay('emails', 'counter-emails');

        const counterResponses = document.getElementById('counter-responses');
        if (counterResponses) {
            counterResponses.innerText = this.deputyService.getRespondedCount().toString();
        }

        this.renderTopResponders();
    }

    private renderTopResponders() {
        const topResponders = this.deputyService.getTopResponders(5);
        const container = document.getElementById('top-responders-container');
        if (!container) return;

        if (topResponders.length === 0) {
            container.innerHTML = '';
            return;
        }

        container.innerHTML = `
            <div class="border-t border-slate-100 pt-8">
                <h4 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 text-center">Top Deputados com mais Retornos</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    ${topResponders.map(({ deputy, count }) => `
                        <div class="bg-white border border-slate-100 rounded-xl p-3 flex flex-col items-center shadow-sm">
                             <div class="w-12 h-12 rounded-full overflow-hidden mb-2 border-2 border-slate-100">
                                <img src="${deputy.photo || `https://www.al.sp.gov.br/repositorio/deputado/fotos/${deputy.id}.jpg`}" 
                                     alt="${deputy.name}" 
                                     class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                                     onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(deputy.name)}&background=f1f5f9&color=64748b'">
                             </div>
                             <div class="text-[11px] font-bold text-slate-800 text-center leading-tight mb-1 truncate w-full">
                                ${deputy.name}
                             </div>
                             <div class="flex items-center gap-1">
                                <span class="text-emerald-600 font-black text-xs">${count}</span>
                                <span class="text-[9px] text-slate-400 uppercase font-bold">Respostas</span>
                             </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
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
