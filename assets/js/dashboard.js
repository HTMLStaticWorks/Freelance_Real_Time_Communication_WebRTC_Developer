document.addEventListener('DOMContentLoaded', () => {
    if (typeof Chart === 'undefined') return;

    // Common Chart Options
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                    drawBorder: false
                },
                ticks: { color: '#94a3b8' }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                    drawBorder: false
                },
                ticks: { color: '#94a3b8' }
            }
        }
    };

    // Latency Chart
    const latencyCtx = document.getElementById('latencyChart');
    if (latencyCtx) {
        new Chart(latencyCtx, {
            type: 'line',
            data: {
                labels: ['10s', '20s', '30s', '40s', '50s', '60s'],
                datasets: [{
                    label: 'RTT (ms)',
                    data: [24, 22, 18, 25, 19, 18],
                    borderColor: '#00D2FF',
                    backgroundColor: 'rgba(0, 210, 255, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: chartOptions
        });
    }

    // Packet Loss Chart
    const packetCtx = document.getElementById('packetLossChart');
    if (packetCtx) {
        new Chart(packetCtx, {
            type: 'bar',
            data: {
                labels: ['US-East', 'EU-West', 'AP-South', 'SA-East'],
                datasets: [{
                    label: 'Packet Loss (%)',
                    data: [0.1, 0.4, 1.2, 0.8],
                    backgroundColor: '#7C3AED',
                    borderRadius: 4
                }]
            },
            options: chartOptions
        });
    }
    
    // SFU Load Chart
    const sfuCtx = document.getElementById('sfuLoadChart');
    if (sfuCtx) {
        new Chart(sfuCtx, {
            type: 'doughnut',
            data: {
                labels: ['CPU', 'Memory', 'Network IO'],
                datasets: [{
                    data: [45, 60, 80],
                    backgroundColor: ['#00D2FF', '#7C3AED', '#22C55E'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#94a3b8' }
                    }
                },
                cutout: '70%'
            }
        });
    }
});
