import { Modal } from './Modal';
import executiveData from '../data/executive.json';

// Types derived from JSON
interface ExecutiveContact {
    email: string;
    telefone: string;
}

interface ExecutiveMember {
    secretaria?: string; // Governor doesn't have this in the same way, but secretaries do
    secretaria_chefe?: string; // PGE case
    secretario?: string; // PGE has secretaria_chefe
    nome?: string; // Governor
    partido?: string; // Governor
    cargo?: string; // Governor
    foto?: string; // Governor
    papel_estrategico?: string;
    contatos?: ExecutiveContact;
    gabinete?: {
        chefe_de_gabinete: string;
        endereco: string;
        contato_geral: {
            telefone: string;
            email_institucional: string;
        }
    }
}

export class ExecutiveList {
    private modal: Modal;
    private containerId = 'executive-container';

    constructor(modal: Modal) {
        this.modal = modal;
    }

    render(): string {
        const gov = executiveData.governador_sp;
        const nucleo = executiveData.projeto_lei_ipva.nucleo_decisorio;
        const apoio = executiveData.projeto_lei_ipva.apoio_estrategico;

        return `
        <section class="py-12 bg-slate-900 text-white relative overflow-hidden p-6 md:p-8" id="executivo">
            <div class="container mx-auto px-4 relative z-10">
                <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-white/5 pb-8">
                    <div>
                        <div class="flex items-center gap-3 mb-2">
                           <h2 class="text-2xl font-black uppercase tracking-tight">Poder Executivo</h2>
                           <span class="bg-blue-500/20 text-blue-300 text-xs font-bold px-2 py-1 rounded-full border border-blue-500/30">
                                Responsáveis pelo Projeto
                           </span>
                        </div>
                        <p class="text-slate-400 text-sm max-w-lg leading-relaxed">
                            Apoie quem tem a caneta para propor a redução do IPVA.
                        </p>
                    </div>
                </div>

                <div id="${this.containerId}" class="space-y-8">
                    <!-- Governor Highlight -->
                    <div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-blue-500/30 shadow-2xl relative overflow-hidden group">
                         <div class="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <i class="fas fa-flag text-9xl"></i>
                         </div>
                         
                         <div class="flex flex-col md:flex-row items-center gap-6 relative z-10 mb-6">
                            <div class="w-32 h-32 rounded-full bg-slate-700 border-4 border-blue-500 shadow-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                                ${gov.foto
                ? `<img src="${gov.foto}" alt="${gov.nome}" class="w-full h-full object-cover">`
                : `<i class="fas fa-user-tie text-5xl text-slate-400"></i>`
            }
                            </div>
                            
                            <div class="flex-1 text-center md:text-left space-y-2">
                                <span class="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">${gov.partido}</span>
                                <h3 class="text-3xl font-black text-white">${gov.nome}</h3>
                                <p class="text-blue-200 font-medium">${gov.cargo}</p>
                                <p class="text-slate-400 text-sm max-w-xl">
                                    <i class="fas fa-map-marker-alt mr-1 text-slate-500"></i> ${gov.gabinete.endereco}
                                </p>
                            </div>
                         </div>

                         <!-- Action Bar (Bottom of Card) -->
                         <div class="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
                            <div class="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/50 p-2 rounded-lg border border-white/5">
                                <i class="fas fa-phone"></i> ${gov.gabinete.contato_geral.telefone}
                            </div>
                            
                            <button onclick="window.executiveList.sendEmailAll()" 
                                class="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-black uppercase text-sm tracking-widest transition shadow-lg flex items-center justify-center gap-3 transform hover:scale-105">
                                <i class="fas fa-paper-plane"></i> MOBILIZAR GOVERNO
                            </button>
                         </div>
                    </div>

                    <!-- Secretaries Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${this.renderSecretaries([...nucleo, ...apoio])}
                    </div>

                    <!-- Source Link -->
                    <div class="mt-8 text-center">
                        <a href="https://sp.gov.br/sp/canais-comunicacao/assessoria_imprensa/contatos_secretarias" target="_blank" 
                           class="text-[10px] text-slate-500 hover:text-blue-400 uppercase font-bold tracking-widest transition flex items-center justify-center gap-2">
                            <i class="fas fa-external-link-alt"></i> Fonte Oficial: SP.GOV.BR
                        </a>
                    </div>
                </div>
            </div>
        </section>
        `;
    }

    private renderSecretaries(list: ExecutiveMember[]): string {
        return list.map(sec => {
            const name = sec.secretario || sec.secretaria_chefe;
            const role = sec.secretaria || 'Procuradoria Geral do Estado';
            const phone = sec.contatos?.telefone || '';
            const desc = sec.papel_estrategico;
            const photo = sec.foto;

            return `
            <div class="bg-slate-800/40 rounded-xl p-5 border border-white/5 hover:border-blue-500/30 transition group flex flex-col h-full relative overflow-hidden">
                <div class="flex items-start gap-4 mb-4">
                    <div class="w-16 h-16 rounded-full bg-slate-700 border-2 border-slate-600 flex-shrink-0 overflow-hidden shadow-md">
                        ${photo
                    ? `<img src="${photo}" alt="${name}" class="w-full h-full object-cover">`
                    : `<div class="w-full h-full flex items-center justify-center text-slate-500"><i class="fas fa-user"></i></div>`
                }
                    </div>
                    <div>
                         <span class="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1 block">Secretaria / Órgão</span>
                         <h4 class="font-bold text-base text-white leading-tight mb-0.5">${role}</h4>
                         <p class="text-sm text-slate-300 font-medium">${name}</p>
                    </div>
                </div>

                <div class="flex-1 mb-4">
                    <div class="bg-slate-900/50 p-3 rounded-lg border border-white/5 h-full">
                        <p class="text-xs text-slate-400 italic">"${desc}"</p>
                    </div>
                </div>

                <div class="space-y-3 pt-4 border-t border-white/5 mt-auto">
                     <div class="flex items-center justify-center gap-2 text-xs text-slate-500">
                        <i class="fas fa-phone"></i> ${phone}
                    </div>
                </div>
            </div>
            `;
        }).join('');
    }

    attachEvents() {
        // Expose instance to window for inline onclick handlers (simple approach for dynamic HTML)
        // @ts-ignore
        window.executiveList = this;
    }

    public sendEmail(email: string) {
        const message = `Excelentíssimo(a),\n\nSolicito atenção especial ao projeto de redução do IPVA para 1% em São Paulo.\n\nA medida é fundamental para aliviar a carga tributária sobre os cidadãos e estimular a economia.\n\nContamos com seu apoio.\n\nSaiba mais em: https://ipva1sp.com.br/`;
        this.modal.open([email], message);
    }

    public sendEmailAll() {
        // Collect all emails
        const govEmail = executiveData.governador_sp.gabinete.contato_geral.email_institucional;
        const nucleo = executiveData.projeto_lei_ipva.nucleo_decisorio.map(m => m.contatos?.email).filter(Boolean) as string[];
        const apoio = executiveData.projeto_lei_ipva.apoio_estrategico.map(m => m.contatos?.email).filter(Boolean) as string[];

        const allEmails = [govEmail, ...nucleo, ...apoio];

        // Remove duplicates if any
        const uniqueEmails = [...new Set(allEmails)];

        const message = `Excelentíssimo Governador e Secretários,\n\nSolicito atenção especial ao projeto de redução do IPVA para 1% em São Paulo.\n\nEsta medida é fundamental para aliviar a carga tributária sobre as famílias e estimular a economia do nosso estado. A redução trará competitividade e justiça fiscal.\n\nContamos com o apoio de todo o executivo para avançar com essa pauta.\n\nSaiba mais em: https://ipva1sp.com.br/`;

        this.modal.open(uniqueEmails, message);
    }
}
