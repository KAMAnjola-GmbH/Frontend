// components/Susa/Charts/KostenstrukturChart.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto'; // Using auto for simpler import
import { KpiRow } from '@/types/susa';

interface KostenstrukturChartProps {
    kpiData: KpiRow[];
}

const KostenstrukturChart: React.FC<KostenstrukturChartProps> = ({ kpiData }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const gesamtData = kpiData.find(d => d.Gruppe === 'Gesamtunternehmen');
        if (!gesamtData) return;

        // Destroy existing chart instance before creating a new one
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const data: ChartConfiguration<'doughnut'>['data'] = {
            labels: [
                'Personalkosten',
                'Overhead-Kosten',
                'EBIT' // Profit
            ],
            datasets: [{
                label: 'Kostenstruktur',
                data: [
                    Math.abs(gesamtData.Personalkosten),
                    Math.abs(gesamtData['Overhead-Kosten']),
                    gesamtData.EBIT > 0 ? gesamtData.EBIT : 0
                ],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.7)',  // Red for personnel
                    'rgba(249, 115, 22, 0.7)', // Orange for overhead
                    'rgba(34, 197, 94, 0.7)'   // Green for EBIT
                ],
                borderColor: [
                    'rgba(239, 68, 68, 1)',
                    'rgba(249, 115, 22, 1)',
                    'rgba(34, 197, 94, 1)'
                ],
                borderWidth: 1
            }]
        };

        chartInstance.current = new Chart(chartRef.current, {
            type: 'doughnut',
            data: data,
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
        });

        // Cleanup function
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [kpiData]);

    return <canvas ref={chartRef} id="kostenstrukturChart"></canvas>;
};

export default KostenstrukturChart;