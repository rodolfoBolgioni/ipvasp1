export class ImpostometroSection {
    render(): string {
        return `
        <section class="py-12 bg-white border-t border-slate-200">
            <style>
                /* BASE DESKTOP STYLES */
                .impostometro-viewport {
                    width: 640px;
                    height: 160px;
                    margin: 0 auto;
                    overflow: hidden; /* Crop anything outside defined box */
                    position: relative;
                }
                
                .impostometro-scaler {
                    width: 640px;
                    height: 160px;
                    transform-origin: 0 0; /* Scale from Top Left */
                    position: absolute;
                    top: 0;
                    left: 0;
                }

                .impostometro-scaler iframe {
                    width: 640px !important;
                    height: 160px !important;
                    border: none;
                }

                /* TABLET (Scale 0.8) - Width 512px */
                @media (max-width: 700px) {
                    .impostometro-viewport {
                        width: 512px;
                        height: 128px;
                    }
                    .impostometro-scaler {
                        transform: scale(0.8);
                    }
                }

                /* MOBILE STANDARD (Scale 0.6) - Width 384px */
                @media (max-width: 550px) {
                    .impostometro-viewport {
                        width: 384px;
                        height: 96px;
                    }
                    .impostometro-scaler {
                        transform: scale(0.6);
                    }
                }

                /* MOBILE SMALL/S24 (Scale 0.48) - Width 307px */
                /* Safety margin for 360px screens with padding */
                @media (max-width: 420px) {
                    .impostometro-viewport {
                        width: 307.2px;
                        height: 76.8px;
                    }
                    .impostometro-scaler {
                        transform: scale(0.48);
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
