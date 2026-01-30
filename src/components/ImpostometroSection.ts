export class ImpostometroSection {
    render(): string {
        return `
        <section class="py-12 bg-white border-t border-slate-200">
            <div class="container mx-auto px-4">
                 <div class="text-center mb-10">
                    <h2 class="text-2xl font-black text-slate-900 uppercase mb-2">Impostômetro</h2>
                    <p class="text-slate-500">Veja o quanto já pagamos de impostos.</p>
                </div>

                <div class="flex flex-col md:flex-row justify-center items-center gap-8">
                    <!-- Brasil -->
                    <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
                        <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Brasil</h3>
                        <iframe id="impostometro_br" src="https://impostometro.com.br/widget/contador/" width="640" height="160" scrolling="no" frameborder="0"></iframe>
                    </div>

                    <!-- SP -->
                    <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
                        <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">São Paulo</h3>
                        <iframe id="impostometro_sp" src="https://impostometro.com.br/widget/contador/sp" width="640" height="160" scrolling="no" frameborder="0"></iframe>
                    </div>
                </div>
            </div>
        </section>
        `;
    }
}
