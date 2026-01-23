import Chart, { ChartType, ChartConfiguration } from 'chart.js/auto';

export interface ChartOptions {
    type: ChartType;
    title?: string;
    showLegend?: boolean;
    legendPosition?: 'top' | 'left' | 'bottom' | 'right';
    isHorizontal?: boolean;
}

export class GenericChart {
    private chart: Chart | null = null;
    private containerId: string;
    private onSegmentSelect: (label: string | null) => void;

    constructor(containerId: string, onSegmentSelect: (label: string | null) => void) {
        this.containerId = containerId;
        this.onSegmentSelect = onSegmentSelect;
    }

    render(data: Record<string, number>, selectedLabel: string | null, options: ChartOptions) {
        const canvas = document.getElementById(this.containerId) as HTMLCanvasElement;
        if (!canvas) return;

        if (this.chart) {
            this.chart.destroy();
        }

        const labels = Object.keys(data).slice(0, 15); // Top 15 to avoid clutter
        const values = labels.map(l => data[l]);

        // Custom colors
        const baseColors = [
            'rgba(20, 184, 166, 0.6)', // Teal
            'rgba(59, 130, 246, 0.6)', // Blue
            'rgba(168, 85, 247, 0.6)', // Purple
            'rgba(236, 72, 153, 0.6)', // Pink
            'rgba(245, 158, 11, 0.6)', // Amber
        ];

        const backgroundColors = labels.map((label, i) => {
            if (selectedLabel && label !== selectedLabel) return 'rgba(148, 163, 184, 0.1)'; // Dimmed
            if (selectedLabel && label === selectedLabel) return 'rgba(20, 184, 166, 1)'; // Highlighted
            return baseColors[i % baseColors.length];
        });

        const config: ChartConfiguration = {
            type: options.type,
            data: {
                labels: labels,
                datasets: [{
                    label: 'Deputados',
                    data: values,
                    backgroundColor: backgroundColors,
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 4,
                    hoverOffset: 4
                }]
            },
            options: {
                indexAxis: options.isHorizontal ? 'y' : 'x',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: options.showLegend ?? false,
                        position: options.legendPosition || 'bottom',
                        labels: {
                            color: '#94a3b8',
                            font: { size: 10 },
                            boxWidth: 8,
                            padding: 10,
                            usePointStyle: true // Makes it a circle/point, saving space vs a box
                        }
                    },
                    title: {
                        display: !!options.title,
                        text: options.title,
                        color: '#94a3b8',
                        font: { size: 12, weight: 'bold' }
                    }
                },
                scales: options.type !== 'doughnut' ? {
                    x: {
                        ticks: { color: '#94a3b8', font: { size: 10 } },
                        grid: { display: false }
                    },
                    y: {
                        ticks: { color: '#94a3b8', font: { size: 10 }, autoSkip: false },
                        grid: { color: 'rgba(255, 255, 255, 0.05)' }
                    }
                } : {
                    x: { display: false },
                    y: { display: false }
                },
                onClick: (_event, elements) => {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        const label = labels[index];
                        this.onSegmentSelect(label === selectedLabel ? null : label);
                    }
                },
                onHover: (event, elements) => {
                    if (event.native && event.native.target) {
                        (event.native.target as HTMLElement).style.cursor = elements.length ? 'pointer' : 'default';
                    }
                }
            }
        };

        this.chart = new Chart(canvas, config);
    }
}
