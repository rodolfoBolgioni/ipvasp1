export class Modal {
    render(): string {
        return `
        <!-- Modal de Instrução de Email -->
        <div id="emailInstructionModal" class="fixed inset-0 z-[100] hidden">
            <!-- Backdrop Blur -->
            <div class="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity" id="modalBackdrop">
            </div>

            <!-- Modal Content -->
            <div class="absolute inset-0 flex items-center justify-center p-4">
                <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all scale-100 flex flex-col max-h-[90vh]">
                    
                    <!-- Header -->
                    <div class="p-6 border-b border-slate-100 flex justify-between items-center shrink-0">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <i class="fas fa-paper-plane"></i>
                            </div>
                            <h3 class="text-xl font-bold text-slate-800">Mobilização Manual</h3>
                        </div>
                        <button id="closeModalBtn" class="text-slate-400 hover:text-slate-600 transition-colors">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>

                    <!-- Body (Scrollable) -->
                    <div class="p-6 overflow-y-auto space-y-6">
                        
                        <!-- Alert Warning -->
                        <div class="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3">
                            <div class="text-amber-500 shrink-0 mt-1"><i class="fas fa-exclamation-triangle"></i></div>
                            <div class="text-sm text-slate-700">
                                <p class="font-bold text-amber-800 mb-1">Atenção Importante</p>
                                <p>Para garantir mais <strong>visibilidade e validação</strong>, o envio deve ser feito da <strong>sua própria caixa de e-mail</strong>.</p>
                                <p class="mt-1">Realizamos este trabalho para facilitar o processo, mas o envio não pode ser automatizado. É o seu envio manual que dá movimento e autenticidade à proposta.</p>
                            </div>
                        </div>

                        <!-- Step 1: Copy Emails -->
                        <div class="space-y-3">
                            <div class="flex items-center gap-2 text-slate-800 font-semibold">
                                <span class="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-xs">1</span>
                                Copie os e-mails abaixo
                            </div>
                            <div class="relative group">
                                <textarea id="emailListDisplay" class="w-full h-24 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 font-mono resize-none focus:ring-2 focus:ring-blue-500/20 outline-none" readonly></textarea>
                                <button id="copyEmailsBtn" class="absolute top-2 right-2 bg-white border border-slate-200 shadow-sm px-3 py-1 rounded-lg text-xs font-semibold text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all">
                                    <i class="fas fa-copy mr-1"></i> Copiar
                                </button>
                            </div>
                        </div>

                        <!-- Step 2: Copy Message -->
                        <div class="space-y-3">
                             <div class="flex items-center gap-2 text-slate-800 font-semibold">
                                <span class="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-xs">2</span>
                                Copie a mensagem sugerida
                            </div>
                            <div class="relative group">
                                <textarea id="emailBodyDisplay" class="w-full h-32 bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-700 resize-none focus:ring-2 focus:ring-blue-500/20 outline-none" readonly></textarea>
                                <button id="copyBodyBtn" class="absolute top-2 right-2 bg-white border border-slate-200 shadow-sm px-3 py-1 rounded-lg text-xs font-semibold text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all">
                                    <i class="fas fa-copy mr-1"></i> Copiar
                                </button>
                            </div>
                        </div>

                         <!-- Step 3: Open Email -->
                         <div class="space-y-3">
                            <div class="flex items-center gap-2 text-slate-800 font-semibold">
                                <span class="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-xs">3</span>
                                Abra seu e-mail e envie
                            </div>
                            <p class="text-sm text-slate-500">Abra seu aplicativo de e-mail (Gmail, Outlook, etc), cole os e-mails no campo <strong>Para</strong> (ou Cco) e o texto no corpo da mensagem.</p>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="p-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end shrink-0">
                        <button id="closeModalAction" class="px-6 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-200 transition-colors">
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    public onClose?: () => void;

    attachEvents() {
        const modal = document.getElementById('emailInstructionModal');
        const closeBtn = document.getElementById('closeModalBtn');
        const closeAction = document.getElementById('closeModalAction');
        const backdrop = document.getElementById('modalBackdrop');

        const copyEmailsBtn = document.getElementById('copyEmailsBtn');
        const copyBodyBtn = document.getElementById('copyBodyBtn');

        const close = () => {
            modal?.classList.add('hidden');
            if (this.onClose) this.onClose();
        };

        closeBtn?.addEventListener('click', close);
        closeAction?.addEventListener('click', close);
        backdrop?.addEventListener('click', close);

        copyEmailsBtn?.addEventListener('click', () => this.copyToClipboard('emailListDisplay'));
        copyBodyBtn?.addEventListener('click', () => this.copyToClipboard('emailBodyDisplay'));
    }

    open(emails: string[], message: string) {
        const modal = document.getElementById('emailInstructionModal');
        const emailList = document.getElementById('emailListDisplay') as HTMLTextAreaElement;
        const emailBody = document.getElementById('emailBodyDisplay') as HTMLTextAreaElement;

        if (emailList) emailList.value = emails.join(', ');
        if (emailBody) emailBody.value = message;

        modal?.classList.remove('hidden');
    }

    private copyToClipboard(elementId: string) {
        const el = document.getElementById(elementId) as HTMLTextAreaElement;
        if (!el) return;

        el.select();
        el.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(el.value).then(() => {
            alert("Copiado com sucesso!");
        });
    }
}
