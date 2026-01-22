import Chart from 'chart.js/auto';

export class PartyChart {
    private chart: Chart | null = null;
    private containerId: string;
    private onPartySelect: (party: string | null) => void;

    constructor(containerId: string, onPartySelect: (party: string | null) => void) {
        this.containerId = containerId;
        this.onPartySelect = onPartySelect;
    }

    render(stats: Record<string, number>, selectedParty: string | null) {
        const canvas = document.getElementById(this.containerId) as HTMLCanvasElement;
        if (!canvas) return;

        if (this.chart) {
            this.chart.destroy();
        }

        const labels = Object.keys(stats).sort();
        const data = labels.map(party => stats[party]);

        // Colors from the theme
        const baseColor = 'rgba(20, 184, 166, 0.5)'; // teal-500 with opacity

        const selectedColor = 'rgba(255, 255, 255, 0.9)';

        const backgroundColors = labels.map(party =>
            party === selectedParty ? selectedColor : baseColor
        );

        this.chart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Deputados',
                    data: data,
                    backgroundColor: backgroundColors,
                    borderColor: 'rgba(20, 184, 166, 1)',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(15, 23, 42, 0.9)', // slate-900
                        titleColor: '#fff',
                        bodyColor: '#cbd5e1', // slate-300
                        padding: 10,
                        cornerRadius: 8,
                        displayColors: false
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#94a3b8', // slate-400
                            font: {
                                size: 10
                            }
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#94a3b8',
                            stepSize: 1
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        }
                    }
                },
                onClick: (_event, elements) => {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        const party = labels[index];

                        // Toggle selection
                        if (party === selectedParty) {
                            this.onPartySelect(null);
                        } else {
                            this.onPartySelect(party);
                        }
                    } else {
                        // Clicked outside bars, clear selection
                        // this.onPartySelect(null); // Optional: decide if clicking background clears filter
                    }
                },
                onHover: (event, elements) => {
                    if (event.native && event.native.target) {
                        (event.native.target as HTMLElement).style.cursor = elements.length ? 'pointer' : 'default';
                    }
                }
            }
        });
    }
}
