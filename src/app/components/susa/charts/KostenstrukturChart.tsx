// components/Susa/Charts/KostenstrukturChart.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import { KpiRow } from '@/types/susa';

interface KostenstrukturChartProps {
    kpiData: KpiRow[];
}

const CHART_CONFIG: Omit<ChartConfiguration<'doughnut'>, 'data'> = {
    type: 'doughnut',
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#D1D5DB'
                }
            },
            title: {
                display: false
            }
        }
    }
};

const KostenstrukturChart: React.FC<KostenstrukturChartProps> = ({ kpiData }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart<'doughnut'> | null>(null);

    // Cleanup on unmount only - separate from data update effect
    useEffect(() => {
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, []);

    // Create or update chart when data changes
    useEffect(() => {
        if (!chartRef.current) return;

        const gesamtData = kpiData.find(d => d.Gruppe === 'Gesamtunternehmen');
        if (!gesamtData) return;

        const newData = [
            Math.abs(gesamtData.Personalkosten),
            Math.abs(gesamtData['Overhead-Kosten']),
            gesamtData.EBIT > 0 ? gesamtData.EBIT : 0
        ];

        // Update existing chart instead of destroying and recreating
        if (chartInstance.current) {
            chartInstance.current.data.datasets[0].data = newData;
            chartInstance.current.update('none'); // 'none' disables animations for smoother updates
            return;
        }

        // Create new chart only on first render
        const data: ChartConfiguration<'doughnut'>['data'] = {
            labels: ['Personalkosten', 'Overhead-Kosten', 'EBIT'],
            datasets: [{
                label: 'Kostenstruktur',
                data: newData,
                backgroundColor: [
                    'rgba(239, 68, 68, 0.7)',
                    'rgba(249, 115, 22, 0.7)',
                    'rgba(34, 197, 94, 0.7)'
                ],
                borderColor: [
                    'rgba(239, 68, 68, 1)',
                    'rgba(249, 115, 22, 1)',
                    'rgba(34, 197, 94, 1)'
                ],
                borderWidth: 1
            }]
        };

        chartInstance.current = new Chart<'doughnut'>(chartRef.current, {
            ...CHART_CONFIG,
            data
        });
    }, [kpiData]);

    return <canvas ref={chartRef} id="kostenstrukturChart"></canvas>;
};

export default KostenstrukturChart;