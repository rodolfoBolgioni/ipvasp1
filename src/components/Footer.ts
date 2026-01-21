export class Footer {
    render(): string {
        return `
        <footer class="bg-slate-900 border-t border-slate-800 pt-16 pb-8 text-slate-400 text-sm">
            <div class="container mx-auto px-4">
                <div class="grid md:grid-cols-4 gap-12 mb-12">
                    <div class="col-span-2">
                        <div class="flex items-center gap-3 mb-6">
                            <i class="fas fa-car-side text-2xl text-blue-500"></i>
                            <span class="text-xl font-bold text-slate-100">IPVA 1%</span>
                        </div>
                        <p class="leading-relaxed mb-6 max-w-sm">
                            Um movimento da sociedade civil organizada pela redução da carga tributária e desenvolvimento econômico de São Paulo.
                        </p>
                    </div>
                    
                    <div>
                        <h4 class="text-slate-100 font-bold mb-6">Links Rápidos</h4>
                        <ul class="space-y-3">
                            <li><a href="#" class="hover:text-blue-400 transition-colors">Início</a></li>
                            <li><a href="plano_viabilidade.pdf" target="_blank" class="hover:text-blue-400 transition-colors">Plano Técnico</a></li>
                            <li><a href="#deputados" class="hover:text-blue-400 transition-colors">Cobrar Deputados</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 class="text-slate-100 font-bold mb-6">Contato/Dev</h4>
                        <ul class="space-y-3">
                             <li>
                                <a href="https://github.com/rodolfoBolgioni/ipvasp1" target="_blank" class="flex items-center gap-2 hover:text-white transition-colors group">
                                    <i class="fab fa-github text-lg group-hover:text-purple-400 transition-colors"></i>
                                    <span>Contribuir (GitHub)</span>
                                </a>
                            </li>
                             <li>
                                <span class="block text-xs mt-2">Projeto Open Source.</span>
                                <span class="block text-xs">Junte-se a nós no desenvolvimento!</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div class="pt-8 border-t border-slate-800 text-center text-xs text-slate-600">
                    &copy; ${new Date().getFullYear()} Movimento IPVA 1%. Todos os direitos reservados.
                </div>
            </div>
        </footer>
        `;
    }
}
