// components/Susa/Charts/FinanzUebersichtChart.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import { KpiRow } from '@/types/susa';

interface FinanzUebersichtChartProps {
    kpiData: KpiRow[];
}

const CHART_CONFIG: Omit<ChartConfiguration<'bar'>, 'data'> = {
    type: 'bar',
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
            legend: { display: false },
            title: { display: false }
        }
    }
};

const FinanzUebersichtChart: React.FC<FinanzUebersichtChartProps> = ({ kpiData }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart<'bar'> | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const gesamtData = kpiData.find(d => d.Gruppe === 'Gesamtunternehmen');
        if (!gesamtData) return;

        const costs = Math.abs(gesamtData.Personalkosten) + Math.abs(gesamtData['Overhead-Kosten']);
        const newData = [gesamtData.Erlöse, costs, gesamtData.EBIT];

        // Update existing chart instead of destroying and recreating
        if (chartInstance.current) {
            chartInstance.current.data.datasets[0].data = newData;
            chartInstance.current.update('none');
            return;
        }

        // Create new chart only on first render
        const data: ChartConfiguration<'bar'>['data'] = {
            labels: ['Erlöse', 'Kosten', 'EBIT'],
            datasets: [{
                label: 'Betrag in €',
                data: newData,
                backgroundColor: [
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(239, 68, 68, 0.7)',
                    'rgba(34, 197, 94, 0.7)'
                ],
                borderColor: [
                    'rgba(59, 130, 246, 1)',
                    'rgba(239, 68, 68, 1)',
                    'rgba(34, 197, 94, 1)'
                ],
                borderWidth: 1
            }]
        };

        chartInstance.current = new Chart(chartRef.current, {
            ...CHART_CONFIG,
            data
        });

        // Cleanup on unmount only
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