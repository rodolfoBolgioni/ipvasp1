export class ImpostometroSection {
    render(): string {
        return `
        <section class="py-12 bg-white border-t border-slate-200">
            <style>
                .impostometro-viewport {
                    width: 100%;
                    max-width: 640px;
                    margin: 0 auto;
                    overflow: visible;
                    display: flex;
                    justify-content: center;
                    /* Default height for desktop */
                    height: 160px;
                }
                
                .impostometro-scaler {
                    width: 640px;
                    min-width: 640px; /* FORCE fixed width */
                    height: 160px;
                    transform-origin: top center;
                    flex-shrink: 0;
                    transition: transform 0.2s ease;
                    transform: translateZ(0); 
                }

                .impostometro-scaler iframe {
                    width: 640px !important;
                    min-width: 640px !important;
                    max-width: none !important; /* Defeat Tailwind resets */
                }

                /* Tablet / Small Laptop */
                @media (max-width: 768px) {
                    .impostometro-viewport {
                        height: 130px; 
                    }
                    .impostometro-scaler {
                        transform: scale(0.8) translateZ(0);
                    }
                }

                /* Standard Mobile */
                @media (max-width: 550px) {
                    .impostometro-viewport {
                        height: 104px; 
                    }
                    .impostometro-scaler {
                        transform: scale(0.65) translateZ(0);
                    }
                }

                /* Small Mobile (S24, iPhone Mini) */
                @media (max-width: 420px) {
                    .impostometro-viewport {
                        height: 80px; 
                    }
                    .impostometro-scaler {
                        transform: scale(0.50) translateZ(0);
                    }
                }
            </style>
            <div class="container mx-auto px-4">
                 <div class="text-center mb-10">
                    <h2 class="text-2xl font-black text-slate-900 uppercase mb-2">Impostômetro</h2>
                    <p class="text-slate-500">Veja o quanto já pagamos de impostos.</p>
                </div>

                <div class="flex flex-col gap-12 items-center w-full">
                    <!-- Brasil -->
                    <div class="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center w-full max-w-[720px]">
                        <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Brasil</h3>
                        <div class="impostometro-viewport">
                            <div class="impostometro-scaler">
                                <iframe id="impostometro_br" src="https://impostometro.com.br/widget/contador/" width="640" height="160" scrolling="no" frameborder="0"></iframe>
                            </div>
                        </div>
                    </div>

                    <!-- SP -->
                    <div class="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center w-full max-w-[720px]">
                        <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">São Paulo</h3>
                        <div class="impostometro-viewport">
                            <div class="impostometro-scaler">
                                <iframe id="impostometro_sp" src="https://impostometro.com.br/widget/contador/sp" width="640" height="160" scrolling="no" frameborder="0"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `;
    }
}
