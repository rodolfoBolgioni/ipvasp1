var c=Object.defineProperty;var p=(o,e,s)=>e in o?c(o,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):o[e]=s;var r=(o,e,s)=>p(o,typeof e!="symbol"?e+"":e,s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function s(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(t){if(t.ep)return;t.ep=!0;const i=s(t);fetch(t.href,i)}})();class u{render(){return`
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
                     <span class="px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-sm font-semibold uppercase tracking-wider">
                        PL 601/2023
                     </span>
                     <span class="px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-sm font-semibold uppercase tracking-wider">
                        Economia Real
                     </span>
                </div>
            </div>
        </header>
        `}}class m{calculateSavings(e){if(e<0)throw new Error("Vehicle value must be positive");const t=e*.04,i=e*.01,l=t-i;return{originalTax:t,proposedTax:i,savings:l}}formatCurrency(e){return e.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}}class x{constructor(){r(this,"service");this.service=new m}render(){return`
        <section class="py-12 md:py-16 -mt-10 relative z-20">
            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
                    <div class="p-8 md:p-12">
                        <div class="text-center mb-10">
                            <h2 class="text-3xl font-bold text-slate-800 mb-3">Simule sua Economia</h2>
                            <p class="text-slate-500">Veja o impacto real no seu bolso caso o projeto seja aprovado.</p>
                        </div>
        
                        <div class="grid md:grid-cols-2 gap-12 items-center">
                             <!-- Input -->
                            <div class="space-y-6">
                                <div>
                                    <label class="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Valor do Veículo (Tabela Fipe)</label>
                                    <div class="relative group">
                                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium group-focus-within:text-blue-500 transition-colors">R$</span>
                                        <input type="text" id="priceInput" placeholder="0,00" 
                                            class="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-xl font-bold text-slate-800 placeholder-slate-300 transition-all outline-none bg-slate-50 focus:bg-white"
                                            inputmode="numeric">
                                    </div>
                                    <p class="text-xs text-slate-400 mt-2 ml-1">Digite apenas os números</p>
                                </div>
                            </div>

                            <!-- Results -->
                            <div class="bg-slate-50 rounded-2xl p-6 border border-slate-100 relative overflow-hidden group">
                                <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-emerald-400/20"></div>
                                
                                <div class="space-y-4 relative z-10">
                                    <div class="flex justify-between items-center text-sm">
                                        <span class="text-slate-500">IPVA Atual (4%)</span>
                                        <span id="currentTax" class="font-medium text-slate-700">R$ 0,00</span>
                                    </div>
                                    <div class="flex justify-between items-center text-sm">
                                        <span class="text-slate-500">IPVA Proposto (1%)</span>
                                        <span id="proposedTax" class="font-medium text-emerald-600">R$ 0,00</span>
                                    </div>
                                    <div class="pt-4 border-t border-slate-200 mt-2">
                                        <div class="flex justify-between items-end">
                                            <span class="text-slate-600 font-semibold mb-1">Sua Economia</span>
                                            <span id="savings" class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">R$ 0,00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `}attachEvents(){const e=document.getElementById("priceInput");e&&e.addEventListener("input",s=>{let a=s.target.value;a=a.replace(/\D/g,""),s.target.value=(Number(a)/100).toLocaleString("pt-BR",{minimumFractionDigits:2}),this.updateCalculations(Number(a)/100)})}updateCalculations(e){try{const s=this.service.calculateSavings(e);this.setText("currentTax",this.service.formatCurrency(s.originalTax)),this.setText("proposedTax",this.service.formatCurrency(s.proposedTax)),this.setText("savings",this.service.formatCurrency(s.savings))}catch{this.setText("currentTax","R$ 0,00"),this.setText("proposedTax","R$ 0,00"),this.setText("savings","R$ 0,00")}}setText(e,s){const a=document.getElementById(e);a&&(a.innerText=s)}}class d{trackEvent(e,s){typeof window<"u"&&"gtag"in window&&window.gtag("event",e,s)}async trackCounterAction(e){const s=`https://api.counterapi.dev/v1/ipva1sp.com.br/${e}/up/`;try{await fetch(s,{mode:"no-cors"})}catch(a){console.error(`Failed to track ${e}`,a)}}}class v{constructor(){r(this,"analytics");this.analytics=new d}render(){return`
        <section class="py-12 bg-white border-t border-slate-100">
            <div class="container mx-auto px-4">
                 <div class="text-center mb-8">
                    <h3 class="text-2xl font-bold text-slate-800">Nosso Impacto</h3>
                    <p class="text-slate-500">A força da nossa mobilização em números.</p>
                </div>
                
                <div class="grid grid-cols-2 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    <!-- E-mails -->
                    <div class="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center hover:border-blue-200 transition-colors">
                        <div class="text-blue-500 text-3xl mb-2"><i class="fas fa-paper-plane"></i></div>
                        <div id="counter-emails" class="text-3xl font-extrabold text-slate-800 block">...</div>
                        <div class="text-sm text-slate-500 uppercase tracking-wide font-semibold mt-1">E-mails Enviados</div>
                    </div>

                    <!-- Visitas -->
                    <div class="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center hover:border-emerald-200 transition-colors">
                        <div class="text-emerald-500 text-3xl mb-2"><i class="fas fa-users"></i></div>
                        <div id="counter-visits" class="text-3xl font-extrabold text-slate-800 block">...</div>
                        <div class="text-sm text-slate-500 uppercase tracking-wide font-semibold mt-1">Acessos ao Site</div>
                    </div>
                </div>
            </div>
        </section>
        `}init(){this.fetchCounts()}fetchCounts(){this.analytics.trackCounterAction("visits"),this.fetchAndDisplay("visits","counter-visits"),this.fetchAndDisplay("emails","counter-emails")}fetchAndDisplay(e,s){const a=`https://api.counterapi.dev/v1/ipva1sp.com.br/${e}/`;fetch(a).then(t=>t.json()).then(t=>{const i=document.getElementById(s);i&&(i.innerText=t.count.toLocaleString("pt-BR"))}).catch(t=>{console.error(`Meta read error ${e}`,t)})}}const b=[{name:"Agente Federal Danilo Balas",party:"PL",room:"255",phone:"3886-6054/6052",email:"apfdanilobalas@al.sp.gov.br"},{name:"Alex Madureira",party:"PL",room:"173",phone:"(11) 3886-6676/ 6677",email:"alexdemadureira@al.sp.gov.br"},{name:"Altair Moraes",party:"REPUBLICANOS",room:"T. 53",phone:"(11) 3886-6468/ 6476",email:"altairmoraes@al.sp.gov.br"}];class f{constructor(e=b){r(this,"deputies");this.deputies=e,this.sortDeputies()}sortDeputies(){this.deputies.sort((e,s)=>e.name.localeCompare(s.name))}getAll(){return this.deputies}search(e){const s=this.normalizeString(e);return this.deputies.filter(a=>this.normalizeString(a.name).includes(s)||this.normalizeString(a.party).includes(s))}normalizeString(e){return e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}}class g{constructor(e){r(this,"service");r(this,"analytics");r(this,"modal");r(this,"containerId","deputies-container");this.service=new f,this.analytics=new d,this.modal=e}render(){return`
        <section class="py-12 bg-white relative z-10" id="deputados">
            <div class="container mx-auto px-4">
                 <div class="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h2 class="text-3xl font-bold text-slate-800 mb-2">Deputados/SP</h2>
                        <p class="text-slate-500">Encontre e cobre os representantes.</p>
                    </div>
                    
                    <!-- Search -->
                    <div class="w-full md:w-auto relative">
                        <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                         <input type="text" id="deputadoSearch" placeholder="Buscar por nome ou partido..." 
                            class="w-full md:w-80 pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all">
                    </div>
                </div>

                <!-- Sticky Action Bar (Mobile/Desktop) -->
                <div class="sticky top-4 z-30 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-blue-100 mb-8 flex justify-between items-center transform transition-all hover:scale-[1.01]">
                    <div class="flex items-center gap-3">
                        <div class="flex -space-x-2">
                            <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold ring-2 ring-white">1</div>
                            <div class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs font-bold ring-2 ring-white">2</div>
                            <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-bold ring-2 ring-white">+</div>
                        </div>
                        <div class="hidden sm:block">
                            <p class="text-sm font-bold text-slate-800">Cobrança Coletiva</p>
                            <p class="text-xs text-slate-500">Envie para todos de uma vez</p>
                        </div>
                    </div>
                    <button id="btnSendBulk" class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 active:scale-95 transition-all flex items-center gap-2">
                        <i class="fas fa-paper-plane"></i>
                        <span>Enviar Cobrança em Massa</span>
                    </button>
                </div>

                 <!-- List -->
                <div id="${this.containerId}" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <!-- Cards injected here -->
                </div>
            </div>
        </section>
        `}attachEvents(){const e=document.getElementById("deputadoSearch");e==null||e.addEventListener("input",a=>{const t=a.target.value;this.renderList(t)});const s=document.getElementById("btnSendBulk");s==null||s.addEventListener("click",()=>this.handleBulkSend()),this.renderList()}renderList(e=""){const s=document.getElementById(this.containerId);if(!s)return;const a=this.service.search(e);if(a.length===0){s.innerHTML=`
                <div class="col-span-full text-center py-12">
                    <div class="text-slate-300 text-6xl mb-4"><i class="fas fa-search"></i></div>
                    <p class="text-slate-500 text-lg">Nenhum deputado encontrado.</p>
                </div>
            `;return}s.innerHTML=a.map(t=>`
            <div class="bg-slate-50 rounded-xl p-5 border border-slate-100 hover:border-blue-300 hover:shadow-md transition-all group">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h3 class="font-bold text-slate-800 text-lg leading-tight">${t.name}</h3>
                        <span class="inline-block px-2 py-0.5 rounded text-xs font-bold bg-white border border-slate-200 text-slate-600 mt-1">
                            ${t.party}
                        </span>
                    </div>
                    <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-300 shadow-sm border border-slate-100">
                        <i class="fas fa-user"></i>
                    </div>
                </div>
                
                <div class="space-y-2 text-sm text-slate-600">
                    <div class="flex items-center gap-2">
                        <i class="fas fa-door-open text-slate-400 w-4"></i>
                        <span>Sala ${t.room}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fas fa-phone text-slate-400 w-4"></i>
                        <span>${t.phone}</span>
                    </div>
                    <div class="flex items-center gap-2 overflow-hidden">
                        <i class="fas fa-envelope text-slate-400 w-4"></i>
                        <span class="truncate" title="${t.email}">${t.email}</span>
                    </div>
                </div>
            </div>
        `).join("")}handleBulkSend(){const s=this.service.getAll().map(t=>t.email).filter(t=>t);this.modal.open(s,`Prezados Deputados,

Como cidadão, solicito que analisem e apoiem o projeto do IPVA 1%.

A proposta visa reduzir a carga tributária e trazer mais liberdade econômica para quem produz.
Confira os detalhes e o plano de viabilidade técnica no site: http://ipva1sp.com.br

Contamos com seu apoio para dar validade e movimento a esta proposta.

Att,
Cidadão Paulista`),this.analytics.trackEvent("begin_checkout",{event_category:"Engagement",event_label:"Open Email Modal",value:1}),this.analytics.trackCounterAction("emails").then(()=>{const t=document.getElementById("counter-emails");if(t&&!isNaN(parseInt(t.innerText.replace(/\./g,"")))){let i=parseInt(t.innerText.replace(/\./g,""));t.innerText=(i+1).toLocaleString("pt-BR")}})}}class h{render(){return`
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
        `}attachEvents(){const e=document.getElementById("emailInstructionModal"),s=document.getElementById("closeModalBtn"),a=document.getElementById("closeModalAction"),t=document.getElementById("modalBackdrop"),i=document.getElementById("copyEmailsBtn"),l=document.getElementById("copyBodyBtn"),n=()=>e==null?void 0:e.classList.add("hidden");s==null||s.addEventListener("click",n),a==null||a.addEventListener("click",n),t==null||t.addEventListener("click",n),i==null||i.addEventListener("click",()=>this.copyToClipboard("emailListDisplay")),l==null||l.addEventListener("click",()=>this.copyToClipboard("emailBodyDisplay"))}open(e,s){const a=document.getElementById("emailInstructionModal"),t=document.getElementById("emailListDisplay"),i=document.getElementById("emailBodyDisplay");t&&(t.value=e.join(", ")),i&&(i.value=s),a==null||a.classList.remove("hidden")}copyToClipboard(e){const s=document.getElementById(e);s&&(s.select(),s.setSelectionRange(0,99999),navigator.clipboard.writeText(s.value).then(()=>{alert("Copiado com sucesso!")}))}}class y{render(){return`
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
        `}}document.addEventListener("DOMContentLoaded",()=>{const o=document.getElementById("app");if(!o)return;const e=new u,s=new x,a=new v,t=new h,i=new g(t),l=new y;o.innerHTML=`
        ${e.render()}
        <main>
            ${s.render()}
            ${i.render()}
            ${a.render()}
        </main>
        ${l.render()}
        ${t.render()}
    `,s.attachEvents(),i.attachEvents(),t.attachEvents(),a.init()});
