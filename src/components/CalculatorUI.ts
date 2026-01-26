import { CalculatorService } from '../services/Calculator';
import Chart from 'chart.js/auto';

export class CalculatorUI {
    private service: CalculatorService;
    private chart: Chart | null = null;
    private tcoChart: Chart | null = null;

    // State
    private currentPrice: number = 100000;
    private currentTaxRate: number = 41.3;
    private currentYears: number = 20;

    // Fuel State
    private currentFuelPrice: number = 6.29;
    private currentFuelTaxPercent: number = 25.0;
    private currentMileage: number = 15000;
    private currentEfficiency: number = 10.0;

    constructor() {
        this.service = new CalculatorService();
    }

    render(): string {
        return `
        <section class="py-12 md:py-16 -mt-10 relative z-20">
            <div class="container mx-auto px-4">
                <div class="max-w-[1400px] mx-auto bg-white rounded-3xl shadow-2xl p-4 md:p-8 border-4 border-emerald-500">
                    
                    <!-- Dashboard Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                        
                        <!-- Col 1: Inputs (Span 3) -->
                        <div class="lg:col-span-3 space-y-4 flex flex-col h-full">
                            <!-- Card Valor -->
                            <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-all">
                                <div class="flex justify-between items-start mb-2">
                                    <span class="text-[10px] uppercase font-black text-slate-400 tracking-widest">Valor do Veículo</span>
                                    <span class="bg-emerald-100 text-emerald-600 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">Editável</span>
                                </div>
                                <div class="relative">
                                    <span class="absolute left-0 top-1/2 -translate-y-1/2 text-slate-800 font-bold text-xl">R$</span>
                                    <input type="text" id="priceInput" class="w-full bg-transparent text-xl font-black text-slate-800 outline-none pl-8" value="100.000,00">
                                </div>
                            </div>

                            <!-- Card Taxa -->
                            <div class="bg-red-50/50 rounded-2xl p-4 border border-red-100 shadow-sm relative group hover:border-red-200 transition-all">
                                <div class="flex justify-between items-start mb-2">
                                    <span class="text-[9px] uppercase font-black text-red-400 tracking-widest max-w-[120px] leading-tight">Carga Tributária ("Por Dentro")</span>
                                    <span class="bg-red-100 text-red-600 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">Editável</span>
                                </div>
                                <div class="flex items-end justify-between gap-4">
                                    <div class="relative w-24">
                                        <input type="text" id="taxPercentInput" class="w-full bg-transparent text-red-600 font-black text-2xl outline-none" value="41,3%">
                                        <span class="text-[9px] text-red-300 font-bold uppercase block mt-1">Alíquota %</span>
                                    </div>
                                    <div class="text-right relative group/taxTooltip cursor-help">
                                        <div class="text-lg font-black text-red-700 leading-none" id="taxValueDisplay">R$ 41.300,00</div>
                                        <span class="text-[9px] text-red-400 font-bold uppercase block mt-1">Valor Imposto <i class="fas fa-info-circle"></i></span>
                                        
                                        <!-- Tooltip Tax Breakdown -->
                                        <div class="absolute bottom-full right-0 mb-2 w-[340px] bg-white text-slate-900 rounded-lg p-4 shadow-xl opacity-0 invisible group-hover/taxTooltip:opacity-100 group-hover/taxTooltip:visible transition-all z-50 pointer-events-none text-left border border-slate-200">
                                            <div class="absolute -bottom-1 right-2 w-2 h-2 bg-white rotate-45 border-b border-r border-slate-200"></div>
                                            <p class="font-bold text-xs text-slate-800 mb-3 border-b border-slate-100 pb-2">Composição Tributária (SP - 2026)</p>
                                            
                                            <div class="grid grid-cols-[auto_auto_1fr] gap-x-3 gap-y-2 text-[9px] items-start">
                                                <!-- Header -->
                                                <div class="font-bold text-slate-400 uppercase tracking-wider text-[8px]">Tributo</div>
                                                <div class="font-bold text-slate-400 uppercase tracking-wider text-[8px]">Alíq.</div>
                                                <div class="font-bold text-slate-400 uppercase tracking-wider text-[8px]">Descrição</div>

                                                <!-- Row 1 -->
                                                <div class="font-bold text-red-600 bg-red-50 rounded px-1">ICMS</div>
                                                <div class="font-bold text-slate-700">18%</div>
                                                <div class="text-slate-500 leading-tight">Imposto estadual sobre a venda do veículo novo em SP.</div>

                                                <!-- Row 2 -->
                                                <div class="font-bold text-slate-700">IPI</div>
                                                <div class="font-bold text-slate-700">0-18%</div>
                                                <div class="text-slate-500 leading-tight">Variável pelo "IPI Verde". Modelos 1.0 supereficientes podem ter isenção total (0%) em 2026.</div>

                                                <!-- Row 3 -->
                                                <div class="font-bold text-slate-700">PIS/COFINS</div>
                                                <div class="font-bold text-slate-700">~11%</div>
                                                <div class="text-slate-500 leading-tight">Contribuições federais incidentes sobre a receita bruta da venda.</div>
                                                
                                                <!-- Row 4 -->
                                                <div class="font-bold text-teal-600 bg-teal-50 rounded px-1">IBS/CBS</div>
                                                <div class="font-bold text-slate-700">1,0%</div>
                                                <div class="text-slate-500 leading-tight">Alíquota de teste da Reforma Tributária (0,1% IBS + 0,9% CBS) iniciada em jan/2026.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Internal Costs -->
                            <div class="grid grid-cols-1 gap-4 mt-auto">
                                <!-- Custo Real -->
                                <div class="bg-slate-100 rounded-xl p-3 border border-slate-200 relative group/costTooltip cursor-help">
                                    <div class="flex items-center gap-1">
                                        <span class="text-[8px] font-bold text-slate-500 uppercase">Custo Real (Fábrica)</span>
                                        <i class="fas fa-question-circle text-[8px] text-slate-400 hover:text-slate-600 transition"></i>
                                    </div>
                                    <div class="text-sm font-black text-slate-700" id="costAmount">R$ 58.700,00</div>
                                    
                                    <!-- Tooltip Custo -->
                                    <div class="absolute bottom-full left-0 mb-2 w-48 bg-slate-900 border border-slate-700 text-white text-[10px] rounded-lg p-3 shadow-xl opacity-0 invisible group-hover/costTooltip:opacity-100 group-hover/costTooltip:visible transition-all z-20 pointer-events-none text-left">
                                        <div class="absolute -bottom-1 left-4 w-2 h-2 bg-slate-900 rotate-45 border-b border-r border-slate-700"></div>
                                        <p class="leading-relaxed font-medium">
                                            <strong class="text-teal-400 block mb-1">O que isso cobre?</strong>
                                            É o valor real do produto: materiais, peças, salário dos funcionários, desenvolvimento e o lucro da fábrica. <br><br>
                                            Sem impostos, esse seria o preço do carro.
                                        </p>
                                    </div>
                                </div>

                                <!-- Markup -->
                                <div class="bg-red-100 rounded-xl p-3 border border-red-200 relative group/markupTooltip cursor-help">
                                    <div class="flex items-center gap-1">
                                        <span class="text-[8px] font-bold text-red-500 uppercase">Markup (Por Fora)</span>
                                        <i class="fas fa-question-circle text-[8px] text-red-400 hover:text-red-600 transition"></i>
                                    </div>
                                    <div class="text-lg font-black text-red-600" id="markupPercent">70,36%</div>
                                    
                                    <!-- Tooltip Markup -->
                                    <div class="absolute bottom-full right-0 mb-2 w-48 bg-slate-900 border border-slate-700 text-white text-[10px] rounded-lg p-3 shadow-xl opacity-0 invisible group-hover/markupTooltip:opacity-100 group-hover/markupTooltip:visible transition-all z-20 pointer-events-none text-left">
                                        <div class="absolute -bottom-1 right-4 w-2 h-2 bg-slate-900 rotate-45 border-b border-r border-slate-700"></div>
                                        <p class="leading-relaxed font-medium">
                                            <strong class="text-teal-400 block mb-1">O que é isso?</strong>
                                            É o quanto o governo cobra "em cima" do custo real. <br><br>
                                            Ex: Se o markup for <strong>100%</strong>, significa que para cada <strong>R$ 1,00</strong> que vale o carro, você paga mais <strong>R$ 1,00</strong> só de impostos.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Col 2: Chart (Span 3) -->
                        <!-- Col 2: Chart (Span 3) -->
                        <div class="lg:col-span-3 bg-white rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-between relative space-y-6">
                            
                            <!-- Chart 1: Markup -->
                            <div class="w-full flex flex-col items-center">
                                <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 text-center w-full block">Carga na Compra</span>
                                <div class="w-32 h-32 relative flex items-center justify-center">
                                    <canvas id="markupChart"></canvas>
                                </div>
                            </div>

                            <!-- Chart 2: TCO -->
                            <div class="w-full flex flex-col items-center flex-1 min-h-0">
                                <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 text-center w-full block" id="tcoChartTitle">Custo Total (5 Anos)</span>
                                <div class="w-full h-40 relative">
                                    <canvas id="tcoChart"></canvas>
                                </div>
                            </div>
                        </div>

                        <!-- Col 3: Simulation (Span 3) -->
                        <div class="lg:col-span-3 bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-between shadow-2xl shadow-slate-900/20">
                            <div>
                                <h3 class="text-[10px] font-bold text-teal-400 uppercase tracking-widest mb-6">Simulação de Posse</h3>
                                
                                <!-- Fuel Inputs -->
                                <div class="grid grid-cols-2 gap-4 mb-6">
                                    <!-- Fuel Price -->
                                    <div class="relative group/fuelPrice">
                                        <div class="flex items-center gap-1 mb-1">
                                             <label class="text-[9px] text-slate-400 uppercase font-bold">Gasolina (R$)</label>
                                             <i class="fas fa-question-circle text-[9px] text-teal-400 cursor-help"></i>
                                        </div>
                                         <input type="text" id="fuelPriceInput" value="R$ 6,29" class="w-full bg-slate-800 rounded px-2 py-1 text-xs font-bold text-white border border-slate-700 focus:border-teal-500 outline-none">
                                        
                                        <!-- Tooltip -->
                                        <div class="absolute bottom-full left-0 mb-2 w-64 bg-white text-slate-900 rounded-lg p-3 shadow-xl opacity-0 invisible group-hover/fuelPrice:opacity-100 group-hover/fuelPrice:visible transition-all z-50 pointer-events-none text-left border border-slate-200">
                                            <div class="absolute -bottom-1 left-4 w-2 h-2 bg-white rotate-45 border-b border-r border-slate-200"></div>
                                            <p class="font-bold text-xs text-slate-800 mb-2">Composição Gasolina SP (Jan/2026)</p>
                                            <div class="space-y-1 text-[10px]">
                                                <div class="flex justify-between"><span>Petrobras</span> <span>R$ 2,33 (37%)</span></div>
                                                <div class="flex justify-between"><span>Etanol (30%)</span> <span>R$ 1,18 (19%)</span></div>
                                                <div class="flex justify-between font-bold text-red-600 bg-red-50 px-1 rounded"><span>ICMS (SP)</span> <span>R$ 1,57 (25%)</span></div>
                                                <div class="flex justify-between"><span>PIS/COFINS</span> <span>R$ 0,47 (7.5%)</span></div>
                                                <div class="flex justify-between"><span>Distribuição</span> <span>R$ 0,74 (11.7%)</span></div>
                                                <div class="border-t pt-1 mt-1 flex justify-between font-bold"><span>Total</span> <span>R$ 6,29</span></div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Tax % -->
                                    <div>
                                        <label class="text-[9px] text-slate-400 uppercase font-bold block mb-1">ICMS (%)</label>
                                        <input type="text" id="fuelTaxInput" value="25,0%" class="w-full bg-slate-800 rounded px-2 py-1 text-xs font-bold text-white border border-slate-700 focus:border-teal-500 outline-none">
                                    </div>

                                    <!-- Mileage -->
                                    <div>
                                        <label class="text-[9px] text-slate-400 uppercase font-bold block mb-1">Km/Ano</label>
                                        <input type="number" id="mileageInput" value="15000" step="1000" class="w-full bg-slate-800 rounded px-2 py-1 text-xs font-bold text-white border border-slate-700 focus:border-teal-500 outline-none">
                                    </div>

                                    <!-- Efficiency -->
                                    <div>
                                        <label class="text-[9px] text-slate-400 uppercase font-bold block mb-1">Km/Litro</label>
                                        <input type="number" id="efficiencyInput" value="10" step="0.5" class="w-full bg-slate-800 rounded px-2 py-1 text-xs font-bold text-white border border-slate-700 focus:border-teal-500 outline-none">
                                    </div>
                                </div>
                                
                                <div class="mb-8">
                                    <label class="text-[9px] text-slate-400 uppercase font-bold block mb-2">Tempo com o Veículo (Anos)</label>
                                    <div class="flex items-center gap-4">
                                        <button class="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition font-bold" id="btnMinusYear">-</button>
                                        <input type="number" id="yearsInput" value="20" min="1" max="30" class="w-16 bg-transparent text-center text-2xl font-black text-white outline-none border-b-2 border-teal-500 focus:border-teal-400 transition">
                                        <button class="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition font-bold" id="btnPlusYear">+</button>
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-4">
                                <div>
                                    <span class="text-[9px] text-slate-400 uppercase font-bold block">Total Pago ao Governo (Hoje)</span>
                                    <div class="text-3xl font-black text-red-400" id="totalTaxCurrent">R$ 61.300,00</div>
                                    <span class="text-[9px] text-slate-500 italic block leading-tight mt-1">Imposto Compra + (IPVA 4% x Anos) + Combustível</span>
                                    <div class="mt-2 text-[10px] text-red-300/80 font-mono" id="fuelTaxDisplay">+ R$ 11.775 (ICMS Comb.)</div>
                                </div>
                                <div class="pt-4 border-t border-white/10">
                                    <span class="text-[9px] text-teal-400 uppercase font-bold block">Com IPVA 1% (Proposto)</span>
                                    <div class="text-2xl font-bold text-white" id="totalTaxProposed">R$ 46.300,00</div>
                                </div>
                            </div>
                        </div>

                        <!-- Col 4: Economy (Span 3) -->
                        <div class="lg:col-span-3 bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col justify-between h-full">
                            <h2 class="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest text-center">Economia Anual</h2>
                            <div class="space-y-3">
                                <div class="p-4 bg-white rounded-xl border border-slate-200 text-center opacity-60">
                                    <span class="text-[8px] font-bold text-slate-400 uppercase">IPVA 4% (Hoje)</span>
                                    <div class="text-2xl font-black text-slate-400 line-through" id="ipvaCurrent">R$ 4.000,00</div>
                                </div>
                                <div class="p-4 bg-teal-600 rounded-xl text-center shadow-lg transform scale-105 ring-4 ring-teal-500/20">
                                    <span class="text-[8px] font-bold text-teal-100 uppercase">IPVA 1% (Proposto)</span>
                                    <div class="text-2xl font-black text-white" id="ipvaProposed">R$ 1.000,00</div>
                                </div>
                            </div>
                            <div class="text-center mt-6 border-t border-slate-200 pt-4">
                                <span class="text-[9px] font-black text-teal-600 uppercase">Economia Direta / Ano</span>
                                <div class="text-3xl font-black text-teal-600" id="ipvaSavings">R$ 3.000,00</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
        `;
    }

    attachEvents() {
        const priceInput = document.getElementById('priceInput') as HTMLInputElement;
        const taxInput = document.getElementById('taxPercentInput') as HTMLInputElement;
        const yearsInput = document.getElementById('yearsInput') as HTMLInputElement;

        const fuelPriceInput = document.getElementById('fuelPriceInput') as HTMLInputElement;
        const fuelTaxInput = document.getElementById('fuelTaxInput') as HTMLInputElement;
        const mileageInput = document.getElementById('mileageInput') as HTMLInputElement;
        const efficiencyInput = document.getElementById('efficiencyInput') as HTMLInputElement;
        const btnMinus = document.getElementById('btnMinusYear');
        const btnPlus = document.getElementById('btnPlusYear');

        if (priceInput) {
            priceInput.addEventListener('input', (e) => {
                let val = (e.target as HTMLInputElement).value.replace(/[^0-9]/g, ''); // Digits only
                this.currentPrice = parseInt(val) / 100;
                (e.target as HTMLInputElement).value = this.currentPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                this.update();
            });
        }

        if (taxInput) {
            taxInput.addEventListener('input', (e) => {
                let val = (e.target as HTMLInputElement).value.replace(/[^0-9,]/g, '');
                if (val.split(',').length > 2) val = val.split(',')[0] + ',' + val.split(',').slice(1).join('');
                (e.target as HTMLInputElement).value = val + '%';

                // preserve cursor
                const pos = (e.target as HTMLInputElement).value.length - 1;
                (e.target as HTMLInputElement).setSelectionRange(pos, pos);

                this.currentTaxRate = parseFloat(val.replace(',', '.'));
                if (isNaN(this.currentTaxRate)) this.currentTaxRate = 0;
                this.update();
            });
        }

        if (yearsInput) {
            yearsInput.addEventListener('input', (e) => {
                this.currentYears = parseInt((e.target as HTMLInputElement).value) || 5;
                if (this.currentYears < 1) this.currentYears = 1;
                if (this.currentYears > 30) this.currentYears = 30;
                this.update();
            });
        }

        btnMinus?.addEventListener('click', () => {
            this.currentYears = Math.max(1, this.currentYears - 1);
            if (yearsInput) yearsInput.value = this.currentYears.toString();
            this.update();
        });

        btnPlus?.addEventListener('click', () => {
            this.currentYears = Math.min(30, this.currentYears + 1);
            if (yearsInput) yearsInput.value = this.currentYears.toString();
            this.update();
        });

        // Initial Chart Draw

        // Fuel Events
        if (fuelPriceInput) {
            fuelPriceInput.addEventListener('change', (e) => {
                let val = (e.target as HTMLInputElement).value.replace(/[^0-9,]/g, '').replace(',', '.');
                this.currentFuelPrice = parseFloat(val) || 6.29;
                (e.target as HTMLInputElement).value = this.currentFuelPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                this.update();
            });
        }
        if (fuelTaxInput) {
            fuelTaxInput.addEventListener('change', (e) => {
                let val = (e.target as HTMLInputElement).value.replace(/[^0-9,]/g, '').replace(',', '.');
                this.currentFuelTaxPercent = parseFloat(val) || 25.0;
                (e.target as HTMLInputElement).value = this.currentFuelTaxPercent.toLocaleString('pt-BR', { minimumFractionDigits: 1 }) + '%';
                this.update();
            });
        }
        if (mileageInput) {
            mileageInput.addEventListener('input', (e) => {
                this.currentMileage = parseFloat((e.target as HTMLInputElement).value) || 0;
                this.update();
            });
        }
        if (efficiencyInput) {
            efficiencyInput.addEventListener('input', (e) => {
                this.currentEfficiency = parseFloat((e.target as HTMLInputElement).value) || 1;
                this.update();
            });
        }
        this.update();
    }

    private update() {
        // Safe defaults
        if (isNaN(this.currentPrice)) this.currentPrice = 0;
        if (isNaN(this.currentTaxRate)) this.currentTaxRate = 41.3;
        if (isNaN(this.currentYears)) this.currentYears = 20;

        // Calc
        const res = this.service.calculate(
            this.currentPrice,
            this.currentTaxRate,
            this.currentYears,
            this.currentFuelPrice,
            this.currentFuelTaxPercent,
            this.currentMileage,
            this.currentEfficiency
        );

        // Update Text
        this.setText('taxValueDisplay', this.service.formatCurrency(res.taxValue));
        this.setText('costAmount', this.service.formatCurrency(res.costReal));
        this.setText('markupPercent', this.service.formatPercent(res.markup).replace(' %', '%')); // fix space
        this.setText('totalTaxCurrent', this.service.formatCurrency(res.totalTaxCurrent));
        this.setText('totalTaxProposed', this.service.formatCurrency(res.totalTaxProposed));
        this.setText('ipvaCurrent', this.service.formatCurrency(res.ipvaCurrent));
        this.setText('ipvaProposed', this.service.formatCurrency(res.ipvaProposed));
        this.setText('ipvaSavings', this.service.formatCurrency(res.savings));

        // Show Fuel Tax isolated
        // Show Fuel Tax isolated
        this.setText('fuelTaxDisplay', `+ ${this.service.formatCurrency(res.fuelTaxTotal)} (ICMS Comb.)`);

        // Update Chart Title
        this.setText('tcoChartTitle', `Custo Total (${res.years} Anos)`);

        // Update Chart
        this.updateChart(res.costReal, res.taxValue);
        this.updateTCOChart(res);
    }

    private setText(id: string, text: string) {
        const el = document.getElementById(id);
        if (el) el.innerText = text;
    }

    private updateChart(cost: number, tax: number) {
        if (cost < 0) cost = 0;
        if (tax < 0) tax = 0;

        const ctx = document.getElementById('markupChart') as HTMLCanvasElement;
        if (!ctx) return;

        if (this.chart) {
            this.chart.data.datasets[0].data = [cost, tax];
            this.chart.update();
        } else {
            // @ts-ignore
            Chart.defaults.font.family = "'Inter', sans-serif";
            // @ts-ignore
            Chart.defaults.color = '#94a3b8';

            this.chart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Custo Real', 'Impostos'],
                    datasets: [{
                        data: [cost, tax],
                        backgroundColor: ['#1e293b', '#dc2626'],
                        borderWidth: 0,
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.label || '';
                                    if (label) label += ': ';
                                    label += (context.raw as number).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                                    return label;
                                }
                            }
                        }
                    },
                    cutout: '75%'
                }
            });
        }
    }
    private updateTCOChart(res: any) {
        // Data prep
        // Stack 1: Cost Real (Base)
        // Stack 2: Purchase Tax (Valor Imposto)
        // Stack 3: Fuel Tax
        // Stack 4: IPVA

        const costReal = res.costReal; // Factory Cost
        const purchaseTax = res.taxValue; // Purchase Tax
        const fuelTax = res.fuelTaxTotal;
        const ipvaCurrentTotal = res.ipvaCurrent * res.years;
        const ipvaProposedTotal = res.ipvaProposed * res.years;

        const ctx = document.getElementById('tcoChart') as HTMLCanvasElement;
        if (!ctx) return;

        if (this.tcoChart) {
            this.tcoChart.data.datasets[0].data = [costReal, costReal]; // Custo Real
            this.tcoChart.data.datasets[1].data = [purchaseTax, purchaseTax]; // Imposto Compra
            this.tcoChart.data.datasets[2].data = [fuelTax, fuelTax]; // Combustível
            this.tcoChart.data.datasets[3].data = [ipvaCurrentTotal, ipvaProposedTotal]; // IPVA
            this.tcoChart.update();
        } else {
            this.tcoChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Hoje (IPVA 4%)', 'Proposta (IPVA 1%)'],
                    datasets: [
                        {
                            label: 'Custo Real (Fábrica)',
                            data: [costReal, costReal],
                            backgroundColor: '#1e293b', // slate-800
                            barThickness: 40
                        },
                        {
                            label: 'Imposto Compra',
                            data: [purchaseTax, purchaseTax],
                            backgroundColor: '#94a3b8', // slate-400
                            barThickness: 40
                        },
                        {
                            label: 'ICMS Combustível',
                            data: [fuelTax, fuelTax],
                            backgroundColor: '#f87171', // red-400
                            barThickness: 40
                        },
                        {
                            label: 'IPVA (Total Período)',
                            data: [ipvaCurrentTotal, ipvaProposedTotal],
                            backgroundColor: ['#dc2626', '#14b8a6'], // red-600 vs teal-500
                            barThickness: 40
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            callbacks: {
                                label: function (context) {
                                    let label = context.dataset.label || '';
                                    if (label) label += ': ';
                                    label += (context.raw as number).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                                    return label;
                                }
                            }
                        }
                    },
                    scales: {
                        y: { stacked: true, display: false, grid: { display: false } }, // Reordered Y first for diff match if strict, but TS handles object key order loosely usually.
                        x: { stacked: true, grid: { display: false }, ticks: { font: { size: 10, weight: 'bold' }, color: '#64748b' } }
                    },
                    animation: { duration: 500 }
                }
            });
        }
    }
}
