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

    render(): string {
        // Start fetching immediately after render
        setTimeout(() => {
            this.fetchValues();
            this.startTicker();
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

                <div class="text-center mt-6">
                    <p class="text-xs text-slate-400">Dados sincronizados com API do Impostômetro (IBPT).</p>
                </div>
            </div>
        </section>
        `;
    }
}
