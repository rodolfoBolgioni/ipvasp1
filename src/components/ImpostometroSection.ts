export class ImpostometroSection {
    render(): string {
        return `
        <section class="py-12 bg-white border-t border-slate-200">
            <div class="container mx-auto px-4">
                 <div class="text-center mb-10">
                    <h2 class="text-2xl font-black text-slate-900 uppercase mb-2">Impostômetro</h2>
                    <p class="text-slate-500">Veja o quanto já pagamos de impostos.</p>
                </div>

                <div class="flex flex-col gap-12 items-center w-full">
                    <!-- Brasil -->
                    <div class="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center w-full max-w-[720px]">
                        <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Brasil</h3>
                        <div class="w-full flex justify-center overflow-hidden">
                            <iframe id="impostometro_br" src="https://impostometro.com.br/widget/contador/" width="100%" height="160" scrolling="no" frameborder="0" style="max-width: 640px; min-width: 300px;"></iframe>
                        </div>
                    </div>

                    <!-- SP -->
                    <div class="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center w-full max-w-[720px]">
                        <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">São Paulo</h3>
                        <div class="w-full flex justify-center overflow-hidden">
                            <iframe id="impostometro_sp" src="https://impostometro.com.br/widget/contador/sp" width="100%" height="160" scrolling="no" frameborder="0" style="max-width: 640px; min-width: 300px;"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `;
    }
}
