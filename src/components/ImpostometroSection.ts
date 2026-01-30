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
                }
                
                /* Container that maintains the aspect ratio while scaling */
                .impostometro-scaler {
                    width: 640px;
                    height: 160px;
                    transform-origin: top center;
                    flex-shrink: 0;
                }

                @media (max-width: 680px) {
                    .impostometro-viewport {
                        /* Adjusted height to prevent layout shift: (Original Height * (Available Width / 640)) */
                        height: calc(160px * ((100vw - 40px) / 640));
                        overflow: hidden;
                    }
                    .impostometro-scaler {
                        transform: scale(calc((100vw - 40px) / 640));
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
