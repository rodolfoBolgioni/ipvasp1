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
                        <h4 class="text-slate-100 font-bold mb-6">Desenvolvido por</h4>
                        
                        <!-- Perfil do Desenvolvedor -->
                        <div class="flex items-center gap-3 mb-4 group">
                            <img src="https://github.com/rodolfoBolgioni.png" alt="Rodolfo Bolgioni" class="w-12 h-12 rounded-full border-2 border-slate-700 grayscale group-hover:grayscale-0 transition-all duration-300">
                            <div>
                                <span class="block text-slate-200 font-bold text-sm">Rodolfo Bolgioni</span>
                                <div class="flex gap-2 mt-1">
                                    <a href="https://www.linkedin.com/in/rodolfo-bolgioni-2a090756/" target="_blank" class="w-7 h-7 bg-blue-600/20 hover:bg-blue-600 text-blue-500 hover:text-white rounded flex items-center justify-center transition-all" title="LinkedIn">
                                        <i class="fab fa-linkedin-in text-xs"></i>
                                    </a>
                                    <a href="https://github.com/rodolfoBolgioni" target="_blank" class="w-7 h-7 bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white rounded flex items-center justify-center transition-all" title="GitHub Perfil">
                                        <i class="fab fa-github text-xs"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-2 border-t border-slate-800 pt-3">
                             <a href="https://github.com/rodolfoBolgioni/ipvasp1" target="_blank" class="flex items-center gap-2 text-xs text-slate-500 hover:text-purple-400 transition-colors">
                                <i class="fas fa-code-branch"></i>
                                <span>Código Fonte do Projeto</span>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="pt-8 border-t border-slate-800 text-center text-xs text-slate-600 flex flex-col md:flex-row justify-between items-center gap-2">
                    <span>&copy; ${new Date().getFullYear()} Movimento IPVA 1%. Todos os direitos reservados.</span>
                    <span class="opacity-50 font-mono" title="Versão da Aplicação">v${__APP_VERSION__} (${__COMMIT_HASH__})</span>
                </div>
            </div>
        </footer>
        `;
    }
}
