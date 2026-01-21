export class PlanSection {
    render(): string {
        return `
        <section id="plano" class="py-12 bg-slate-50 border-t border-slate-200">
            <div class="container mx-auto px-4">
                 <div class="flex items-center justify-between mb-8">
                    <h2 class="text-2xl font-black text-slate-900 uppercase">Plano de Viabilidade</h2>
                    <div class="h-1 flex-grow bg-slate-200 mx-6 hidden md:block"></div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Vídeo -->
                    <div class="card p-0 overflow-hidden bg-black aspect-video flex items-center justify-center rounded-2xl shadow-lg border border-slate-200">
                        <iframe class="w-full h-full" src="https://www.youtube.com/embed/vtjp3SWGuus"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                        </iframe>
                    </div>

                    <!-- PDF Embed -->
                    <div class="card p-0 overflow-hidden h-[400px] lg:h-auto rounded-2xl shadow-lg border border-slate-200 relative bg-slate-100 flex flex-col">
                        <div class="p-3 bg-white border-b border-slate-200 flex justify-between items-center">
                            <span class="text-[10px] uppercase font-black text-slate-500 flex items-center gap-2">
                                <i class="fas fa-file-pdf text-red-500"></i> Documento Oficial
                            </span>
                            <a href="plano_viabilidade.pdf" target="_blank"
                                class="text-[10px] font-bold text-teal-600 hover:text-teal-500 uppercase tracking-wider flex items-center gap-1 transition">
                                <i class="fas fa-expand"></i> Visualizar Completo
                            </a>
                        </div>
                        <div class="relative flex-grow">
                            <iframe src="plano_viabilidade.pdf" class="w-full h-full absolute inset-0" style="border: none;">
                                <p class="text-center p-10 text-slate-500">Seu navegador não suporta a visualização de PDF.
                                    <a href="plano_viabilidade.pdf" class="text-teal-600 font-bold hover:underline">Baixe o plano aqui.</a>
                                </p>
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `;
    }
}
