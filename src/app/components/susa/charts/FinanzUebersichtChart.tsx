// components/Susa/Charts/FinanzUebersichtChart.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto'; 
import { KpiRow } from '@/types/susa';

interface FinanzUebersichtChartProps {
    kpiData: KpiRow[];
}

const FinanzUebersichtChart: React.FC<FinanzUebersichtChartProps> = ({ kpiData }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const gesamtData = kpiData.find(d => d.Gruppe === 'Gesamtunternehmen');
        if (!gesamtData) return;

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // --- Logic from original createFinanzUebersichtChart ---
        const costs = Math.abs(gesamtData.Personalkosten) + Math.abs(gesamtData['Overhead-Kosten']);

        const data: ChartConfiguration<'bar'>['data'] = {
            labels: ['Erlöse', 'Kosten', 'EBIT'],
            datasets: [{
                label: 'Betrag in €',
                data: [
                    gesamtData.Erlöse,
                    costs,
                    gesamtData.EBIT
                ],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.7)', // Blue (Erlöse)
                    'rgba(239, 68, 68, 0.7)',  // Red (Kosten)
                    'rgba(34, 197, 94, 0.7)'   // Green (EBIT)
                ],
                borderColor: [
                    'rgba(59, 130, 246, 1)',
                    'rgba(239, 68, 68, 1)',
                    'rgba(34, 197, 94, 1)'
                ],
                borderWidth: 1
            }]
        };
        // --- End Logic ---

        chartInstance.current = new Chart(chartRef.current, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#9CA3AF' },
                        grid: { color: 'rgba(156, 163, 175, 0.2)' }
                    },
                    x: {
                        ticks: { color: '#D1D5DB' },
                        grid: { display: false }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: false
                    }
                }
            }
        });

        // Cleanup function
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [kpiData]);

    return <canvas ref={chartRef} id="finanzUebersichtChart"></canvas>;
};

export default FinanzUebersichtChart;