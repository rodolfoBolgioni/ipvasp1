export class Header {
    render(): string {
        return `
        <header class="bg-pattern text-slate-100 relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/50"></div>
            <div class="container mx-auto px-4 py-12 relative z-10 text-center">
                <div class="inline-block p-4 rounded-full bg-white/5 backdrop-blur-sm mb-6 border border-white/10 shadow-xl animate-fade-in-down">
                    <i class="fas fa-car-side text-5xl text-blue-400"></i>
                </div>
                <h1 class="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight leading-tight">
                    Movimento <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">IPVA 1%</span>
                </h1>
                <p class="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                    Juntos pela redução da carga tributária e liberdade econômica em São Paulo.
                </p>
                <div class="mt-8 flex justify-center gap-4">

                     <span class="px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-sm font-semibold uppercase tracking-wider">
                        Economia Real
                     </span>
                </div>
            </div>
        </header>
        `;
    }
}
