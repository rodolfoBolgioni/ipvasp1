export class ImpostometroSection {
    private brValue: number = 0;
    private spValue: number = 0;

    // Estimated increments per second (based on averages) to make it feel alive
    // Brasil ~ 10k/sec, SP ~ 4k/sec (approximate)
    private readonly BR_RATE = 2500;
    private readonly SP_RATE = 2000;

    async fetchValues() {
        try {
            // Adjust path for production vs dev
            const response = await fetch('/api/get_impostometro.php');
            const data = await response.json();

            if (data.brasil) this.brValue = data.brasil;
            if (data.sp) this.spValue = data.sp;

            this.updateDisplay();
        } catch (e) {
            console.error("Erro ao buscar impostômetro", e);
        }
    }

    startTicker() {
        setInterval(() => {
            // Increment locally to simulate realtime
            // Add a small random amount roughly every 100ms
            this.brValue += (this.BR_RATE / 10);
            this.spValue += (this.SP_RATE / 10);
            this.updateDisplay();
        }, 100);

        // Re-sync with server every 30 seconds
        setInterval(() => this.fetchValues(), 30000);
    }

    updateDisplay() {
        const elBr = document.getElementById('imposto-br');
        const elSp = document.getElementById('imposto-sp');

        if (elBr) elBr.innerText = this.formatMoney(this.brValue);
        if (elSp) elSp.innerText = this.formatMoney(this.spValue);
    }

    formatMoney(value: number): string {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    setupModal() {
        const btn = document.getElementById('btn-metodologia');
        const modal = document.getElementById('modal-metodologia');
        const close = document.getElementById('close-metodologia');
        const overlay = document.getElementById('overlay-metodologia');

        if (btn && modal && close && overlay) {
            const toggle = () => {
                modal.classList.toggle('hidden');
                overlay.classList.toggle('hidden');
            };
            btn.addEventListener('click', toggle);
            close.addEventListener('click', toggle);
            overlay.addEventListener('click', toggle);
        }
    }

    render(): string {
        // Start fetching immediately after render
        setTimeout(() => {
            this.fetchValues();
            this.startTicker();
            this.setupModal();
        }, 0);

        return `
        <section class="py-12 bg-white border-t border-slate-200">
            <div class="container mx-auto px-4">
                 <div class="text-center mb-10">
                    <h2 class="text-2xl font-black text-slate-900 uppercase mb-2">Impostômetro</h2>
                    <p class="text-slate-500">Estimativa do total de impostos pagos em ${new Date().getFullYear()}.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <!-- Brasil -->
                    <div class="bg-indigo-900 rounded-3xl p-8 text-center text-white shadow-xl relative overflow-hidden group">
                        <div class="absolute top-0 left-0 w-full h-2 bg-yellow-400"></div>
                        <div class="absolute -right-10 -top-10 text-white/5 text-9xl font-black selection:bg-none pointer-events-none">BR</div>
                        
                        <h3 class="text-sm font-bold text-indigo-200 uppercase tracking-widest mb-2">Brasil</h3>
                        <div id="imposto-br" class="text-3xl sm:text-4xl md:text-5xl font-black font-mono tracking-tighter text-yellow-400 drop-shadow-sm">
                            R$ ...
                        </div>
                        <p class="text-xs text-indigo-300 mt-2 opacity-80">Arrecadação Federal + Estaduais + Municipais</p>
                    </div>

                    <!-- SP -->
                    <div class="bg-slate-800 rounded-3xl p-8 text-center text-white shadow-xl relative overflow-hidden group">
                        <div class="absolute top-0 left-0 w-full h-2 bg-teal-400"></div>
                        <div class="absolute -right-10 -top-10 text-white/5 text-9xl font-black selection:bg-none pointer-events-none">SP</div>

                        <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">São Paulo</h3>
                        <div id="imposto-sp" class="text-3xl sm:text-4xl md:text-5xl font-black font-mono tracking-tighter text-teal-400 drop-shadow-sm">
                            R$ ...
                        </div>
                        <p class="text-xs text-slate-400 mt-2 opacity-80">Arrecadação do Estado de São Paulo</p>
                    </div>
                </div>

                <div class="text-center mt-6 flex flex-col items-center gap-2">
                    <p class="text-xs text-slate-400">Dados baseados no IBPT (Instituto Brasileiro de Planejamento e Tributação).</p>
                    <button id="btn-metodologia" class="text-xs text-indigo-600 font-bold hover:underline">
                        ℹ️ Entenda como é calculado
                    </button>
                </div>
            </div>

            <!-- Modal Metodologia -->
            <div id="overlay-metodologia" class="fixed inset-0 bg-black/50 z-40 hidden backdrop-blur-sm transition-all"></div>
            <div id="modal-metodologia" class="fixed inset-0 z-50 flex items-center justify-center p-4 hidden pointer-events-none">
                <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto pointer-events-auto flex flex-col">
                    <div class="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                        <h3 class="text-lg font-bold text-slate-800">Metodologia do Impostômetro</h3>
                        <button id="close-metodologia" class="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
                    </div>
                    <div class="p-6 text-sm text-slate-600 space-y-4 leading-relaxed">
                        <p>O Impostômetro considera todos os valores arrecadados pelas três esferas de governo a título de tributos: impostos, taxas e contribuições, incluindo as multas, juros e correção monetária.</p>
                        
                        <h4 class="font-bold text-slate-800">Fontes de Dados</h4>
                        <ul class="list-disc pl-5 space-y-1">
                            <li><strong>Federal:</strong> Receita Federal, STN, Caixa, TCU e IBGE.</li>
                            <li><strong>Estadual:</strong> CONFAZ, Secretarias Estaduais de Fazenda e Tribunais de Contas.</li>
                            <li><strong>Municipal:</strong> STN e Tribunais de Contas dos Estados (Lei de Responsabilidade Fiscal).</li>
                        </ul>

                        <h4 class="font-bold text-slate-800">Estimativas e Projeções</h4>
                        <p>Para valores não divulgados em tempo real, utiliza-se a arrecadação do período anterior atualizada pelo índice de crescimento médio dos últimos 3 anos, ajustado por sazonalidade.</p>

                        <h4 class="font-bold text-slate-800">Glossário</h4>
                        <ul class="list-disc pl-5 space-y-1">
                            <li><strong>Brasil:</strong> Soma de tributos federais, estaduais e municipais.</li>
                            <li><strong>População:</strong> Dados do IBGE e Finbra.</li>
                        </ul>

                        <div class="bg-slate-50 p-4 rounded-lg border border-slate-100 mt-4 text-xs">
                            <p class="italic">Fonte Oficial: Instituto Brasileiro de Planejamento e Tributação (IBPT).</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `;
    }
}
