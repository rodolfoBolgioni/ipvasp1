import { DeputyService } from '../services/DeputyService';
import { AnalyticsService } from '../services/AnalyticsService';
import { Modal } from './Modal';

export class DeputiesList {
    private service: DeputyService;
    private analytics: AnalyticsService;
    private modal: Modal;
    private containerId = 'deputies-container';

    // State
    private selectedDeputies: Set<string> = new Set();
    private currentQuery: string = '';

    constructor(modal: Modal) {
        this.service = new DeputyService();
        this.analytics = new AnalyticsService();
        this.modal = modal;
    }

    render(): string {
        return `
        <section class="py-12 bg-slate-900 text-white relative overflow-hidden p-6 md:p-8" id="deputados">
            <div class="container mx-auto px-4 relative z-10">
                 <div class="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
                    <div>
                        <h2 class="text-2xl font-black uppercase mb-2">Assembleia Legislativa</h2>
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

                 <!-- List -->
                <div id="${this.containerId}" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <!-- Cards injected here -->
                </div>
                
                 <!-- Link External -->
                <div class="mt-4 text-center">
                    <a href="https://www.al.sp.gov.br/deputado/contato/" target="_blank"
                        class="text-[10px] text-slate-500 hover:text-teal-600 uppercase font-bold tracking-widest transition flex items-center justify-center gap-2">
                        <i class="fas fa-external-link-alt"></i> Conferir Lista Oficial ALESP
                    </a>
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

        // Initial Render
        this.renderList();
    }

    private renderList() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const deputies = this.service.search(this.currentQuery);

        if (deputies.length === 0) {
            container.innerHTML = '<div class="col-span-full text-center p-10 text-slate-500">Nenhum deputado encontrado.</div>';
            return;
        }

        container.innerHTML = '';

        deputies.forEach(dep => {
            const isSelected = this.selectedDeputies.has(dep.email);

            const card = document.createElement('div');
            card.className = `p-4 rounded-xl border transition-all cursor-pointer relative group ${isSelected ? 'bg-teal-900/40 border-teal-500' : 'bg-white/5 border-white/10 hover:border-teal-500/50'
                }`;

            card.innerHTML = `
                <div class="flex items-start justify-between mb-2">
                    <div>
                        <span class="text-[9px] font-bold text-teal-400 uppercase tracking-wider">${dep.party}</span>
                        <h3 class="font-bold text-white leading-tight">${dep.name}</h3>
                    </div>
                    <div class="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center ${isSelected ? 'bg-teal-500 border-teal-500' : ''}">
                         ${isSelected ? '<i class="fas fa-check text-[10px] text-white"></i>' : ''}
                    </div>
                </div>
                <div class="space-y-1 text-xs text-slate-400 mb-3">
                    <div class="flex items-center gap-2"><i class="fas fa-door-open w-4 opacity-50"></i> Gabinete ${dep.room}</div>
                    <div class="flex items-center gap-2"><i class="fas fa-phone w-4 opacity-50"></i> ${dep.phone}</div>
                    <div class="flex items-center gap-2 overflow-hidden" title="${dep.email}"><i class="fas fa-envelope w-4 opacity-50"></i> <span class="truncate">${dep.email}</span></div>
                </div>
            `;

            card.onclick = () => this.toggleSelection(dep.email);
            container.appendChild(card);
        });

        this.updateActionBar();
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
        // If all matching are selected, deselect all. Otherwise, select all.
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
        const message = `Prezados Deputados,\n\nComo cidadão, solicito que analisem e apoiem o projeto do IPVA 1%.\n\nA proposta visa reduzir a carga tributária e trazer mais liberdade econômica.\nVer mais em: http://ipva1sp.com.br`;

        this.modal.open(emails, message);

        this.analytics.trackCounterAction('emails');
    }
}
