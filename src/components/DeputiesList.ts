import { DeputyService } from '../services/DeputyService';
import { AnalyticsService } from '../services/AnalyticsService';
import { Modal } from './Modal';
import { PartyChart } from './PartyChart';

export class DeputiesList {
    private service: DeputyService;
    private analytics: AnalyticsService;
    private modal: Modal;
    private partyChart: PartyChart;
    private containerId = 'deputies-container';
    private chartContainerId = 'party-chart-canvas';

    // State
    private selectedDeputies: Set<string> = new Set();
    private currentQuery: string = '';
    private selectedParty: string | null = null;

    constructor(modal: Modal) {
        this.service = new DeputyService();
        this.analytics = new AnalyticsService();
        this.modal = modal;
        this.partyChart = new PartyChart(this.chartContainerId, (party) => this.handlePartySelect(party));
    }

    render(): string {
        const totalDeputies = this.service.getAll().length;
        const lastUpdated = new Date(this.service.getLastUpdated()).toLocaleDateString('pt-BR');

        return `
        <section class="py-12 bg-slate-900 text-white relative overflow-hidden p-6 md:p-8" id="deputados">
            <div class="container mx-auto px-4 relative z-10">
                 <div class="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
                    <div>
                        <div class="flex items-center gap-3 mb-2">
                           <h2 class="text-2xl font-black uppercase">Assembleia Legislativa - São Paulo</h2>
                           <span class="bg-teal-500/20 text-teal-300 text-xs font-bold px-2 py-1 rounded-full border border-teal-500/30">
                                ${totalDeputies} Deputados
                           </span>
                        </div>
                        <p class="text-slate-400 text-sm max-w-lg leading-relaxed">
                            Pressione seu representante! Envie um e-mail cobrando o <strong>IPVA 1%</strong>.
                        </p>
                    </div>
                    
                    <!-- Search & Actions -->
                    <div class="w-full md:w-auto flex flex-col md:items-end gap-2">
                        <div class="relative">
                            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
                             <input type="text" id="deputadoSearch" placeholder="Buscar deputado ou partido..." 
                                class="w-full md:w-64 bg-white/5 border border-white/10 rounded-lg pl-9 p-2.5 text-sm text-white outline-none focus:border-teal-500 transition placeholder-slate-600">
                        </div>
                         <button id="btnSelectAll" class="text-[10px] text-teal-400 font-bold hover:text-teal-300 transition uppercase tracking-wider">
                            <i class="fas fa-check-double mr-1"></i> Selecionar Todos
                        </button>
                    </div>
                </div>

                <!-- Party Chart -->
                <div class="mb-8">
                    <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Distribuição por Partido</h3>
                    <div class="bg-slate-800/50 rounded-xl p-4 border border-white/5 h-64 relative">
                        <canvas id="${this.chartContainerId}"></canvas>
                        ${this.selectedParty ? `
                        <button id="clearPartyFilter" class="absolute top-2 right-2 text-[10px] bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-1 rounded-full uppercase font-bold tracking-wider transition">
                            <i class="fas fa-times mr-1"></i> Remover filtro: ${this.selectedParty}
                        </button>
                        ` : ''}
                    </div>
                </div>

                 <!-- List -->
                <div id="${this.containerId}" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-12 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <!-- Cards injected here -->
                </div>
                
                 <!-- Footer Info -->
                <div class="mt-6 flex flex-col items-center gap-2">
                    <a href="https://www.al.sp.gov.br/deputado/contato/" target="_blank"
                        class="text-[10px] text-slate-500 hover:text-teal-600 uppercase font-bold tracking-widest transition flex items-center justify-center gap-2">
                        <i class="fas fa-external-link-alt"></i> Conferir Lista Oficial ALESP
                    </a>
                    <span class="text-[9px] text-slate-600">Dados atualizados em: ${lastUpdated}</span>
                </div>

                <!-- Sticky Bulk Action Bar -->
                <div id="bulkActionBar" class="absolute bottom-0 left-0 right-0 bg-teal-900/95 backdrop-blur-md p-4 transform translate-y-full transition-transform duration-300 shadow-2xl border-t border-teal-500/30 flex justify-between items-center z-20">
                    <span class="text-white text-xs font-bold uppercase tracking-wide">
                        <span id="selectedCount" class="text-teal-400 text-lg mr-1 font-black">0</span> Selecionados
                    </span>
                    <button id="btnBulkSend" class="bg-teal-500 hover:bg-teal-400 text-slate-900 px-6 py-3 rounded-lg font-black uppercase text-xs tracking-widest transition shadow-lg flex items-center gap-2">
                        <i class="fas fa-paper-plane"></i> Enviar Cobrança em Massa
                    </button>
                </div>
            </div>
        </section>
        `;
    }

    attachEvents() {
        // Search
        const searchInput = document.getElementById('deputadoSearch');
        searchInput?.addEventListener('input', (e) => {
            this.currentQuery = (e.target as HTMLInputElement).value;
            this.renderList();
        });

        // Select All
        document.getElementById('btnSelectAll')?.addEventListener('click', () => this.toggleSelectAll());

        // Bulk Send
        document.getElementById('btnBulkSend')?.addEventListener('click', () => this.handleBulkSend());

        // Clear Party Filter (delegated since it's dynamic)
        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target && target.closest('#clearPartyFilter')) {
                this.handlePartySelect(null);
            }

            // Expand More logic
            if (target && target.classList.contains('read-more-btn')) {
                const container = target.parentElement;
                if (container) {
                    const fullText = container.getAttribute('data-full-text');
                    if (fullText) {
                        container.innerHTML = fullText;
                    }
                }
            }
        });

        // Initial Render
        this.renderList();
    }

    private renderList() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        let deputies = this.service.search(this.currentQuery);

        // Filter by party
        if (this.selectedParty) {
            deputies = deputies.filter(d => d.party.toUpperCase() === this.selectedParty);
        }

        if (deputies.length === 0) {
            container.innerHTML = '<div class="col-span-full text-center p-10 text-slate-500">Nenhum deputado encontrado.</div>';
            return;
        }

        container.innerHTML = '';

        deputies.forEach(dep => {
            const isSelected = this.selectedDeputies.has(dep.email);
            const photoUrl = dep.photo || 'https://www.al.sp.gov.br/repositorio/deputado/foto/default.jpg';

            const card = document.createElement('div');
            card.className = `p-4 rounded-xl border transition-all cursor-pointer relative group flex gap-4 ${isSelected ? 'bg-teal-900/40 border-teal-500' : 'bg-white/5 border-white/10 hover:border-teal-500/50'}`;

            card.innerHTML = `
                <!-- Photo -->
                <div class="flex-shrink-0">
                    <img src="${photoUrl}" alt="${dep.name}" class="w-16 h-16 rounded-full object-cover border-2 ${isSelected ? 'border-teal-500' : 'border-slate-700'}">
                </div>

                <!-- Content -->
                <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between mb-1">
                        <div>
                            <span class="text-[9px] font-bold text-teal-400 uppercase tracking-wider">${dep.party}</span>
                            <h3 class="font-bold text-white leading-tight text-sm">${dep.name}</h3>
                        </div>
                        <div class="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center ${isSelected ? 'bg-teal-500 border-teal-500' : ''}">
                             ${isSelected ? '<i class="fas fa-check text-[10px] text-white"></i>' : ''}
                        </div>
                    </div>

                    <div class="space-y-1 text-xs text-slate-400">
                        <div class="flex items-center gap-2"><i class="fas fa-door-open w-3 opacity-50"></i> Gabinete ${dep.room}</div>
                        <div class="flex items-center gap-2"><i class="fas fa-phone w-3 opacity-50"></i> ${dep.phone}</div>
                        
                        <!-- Area of Activity with Truncation -->
                        ${this.renderTruncatedField('fa-star', dep.areasOfActivity, 'Área de Atuação')}
                        
                        <!-- Electoral Base -->
                        ${this.renderTruncatedField('fa-map-marker-alt', dep.electoralBase, 'Base Eleitoral')}
                    </div>
                </div>
            `;

            card.onclick = (e) => {
                // Prevent selection when clicking "read more"
                if ((e.target as HTMLElement).classList.contains('read-more-btn')) return;
                this.toggleSelection(dep.email);
            };
            container.appendChild(card);
        });

        this.updateActionBar();
        this.updateChart();
    }

    private renderTruncatedField(icon: string, text: string | undefined, label: string): string {
        if (!text) return '';

        const limit = 60;
        const isLong = text.length > limit;
        const displayText = isLong ? text.substring(0, limit) + '...' : text;

        return `
            <div class="flex gap-2 items-start" title="${label}: ${text}">
                <i class="fas ${icon} w-3 mt-0.5 opacity-50 flex-shrink-0"></i> 
                <span class="leading-tight" data-full-text="${text}">
                    ${displayText}
                    ${isLong ? '<span class="text-teal-500 hover:text-teal-400 cursor-pointer text-[10px] font-bold uppercase ml-1 read-more-btn">Ver mais</span>' : ''}
                </span>
            </div>
        `;
    }

    private updateChart() {
        const stats = this.service.getPartyStats();
        this.partyChart.render(stats, this.selectedParty);
    }

    private handlePartySelect(party: string | null) {
        this.selectedParty = party;
        this.render();
        this.attachEvents();
        this.updateChartUI();
        this.renderList();
    }

    private updateChartUI() {
        const container = document.getElementById(this.chartContainerId)?.parentElement;
        if (!container) return;

        const existingBtn = document.getElementById('clearPartyFilter');
        if (this.selectedParty && !existingBtn) {
            const btn = document.createElement('button');
            btn.id = 'clearPartyFilter';
            btn.className = 'absolute top-2 right-2 text-[10px] bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-1 rounded-full uppercase font-bold tracking-wider transition';
            btn.innerHTML = `<i class="fas fa-times mr-1"></i> Remover filtro: ${this.selectedParty}`;
            container.appendChild(btn);
        } else if (!this.selectedParty && existingBtn) {
            existingBtn.remove();
        }

        this.updateChart();
    }

    private toggleSelection(email: string) {
        if (this.selectedDeputies.has(email)) {
            this.selectedDeputies.delete(email);
        } else {
            this.selectedDeputies.add(email);
        }
        this.renderList();
    }

    private toggleSelectAll() {
        const matching = this.service.search(this.currentQuery);
        const allSelected = matching.every(d => this.selectedDeputies.has(d.email));

        if (allSelected) {
            matching.forEach(d => this.selectedDeputies.delete(d.email));
        } else {
            matching.forEach(d => this.selectedDeputies.add(d.email));
        }
        this.renderList();
    }

    private updateActionBar() {
        const bar = document.getElementById('bulkActionBar');
        const countEl = document.getElementById('selectedCount');
        const count = this.selectedDeputies.size;

        if (countEl) countEl.innerText = count.toString();

        if (count > 0) {
            bar?.classList.remove('translate-y-full');
        } else {
            bar?.classList.add('translate-y-full');
        }
    }

    private handleBulkSend() {
        const emails = Array.from(this.selectedDeputies);
        const message = `Prezados Deputados,\n\nComo cidadão, solicito que analisem e apoiem o projeto do IPVA 1%.\n\nA proposta visa reduzir a carga tributária e trazer mais liberdade econômica.\nVer mais em: https://ipva1sp.com.br`;

        this.modal.open(emails, message);

        this.analytics.trackCounterAction('emails');
    }
}
