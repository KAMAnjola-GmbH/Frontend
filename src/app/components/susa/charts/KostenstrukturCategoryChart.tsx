// components/Susa/Charts/KostenstrukturCategoryChart.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto'; 
import { KpiRow } from '@/types/susa';

interface KostenstrukturCategoryChartProps {
    kpiData: KpiRow[];
}

const KostenstrukturCategoryChart: React.FC<KostenstrukturCategoryChartProps> = ({ kpiData }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const gesamtData = kpiData.find(d => d.Gruppe === 'Gesamtunternehmen');
        if (!gesamtData) return;

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // --- Logic from original createKostenstrukturChartWithCategory ---
        const combinedData = { ...gesamtData, ...(gesamtData.AdditionalData || {}) };
        
        const overheadCategories = [
            'Abschreibungen & Anlagen', 'Fremdleistungen', 'Verwaltung & Büro',
            'IT & Kommunikation', 'Reisen & Repräsentation',
            'Versicherungen & Gebühren', 'Sonstige betriebliche Aufwendungen'
        ];

        const chartLabels = ['Personalkosten'];
        const chartData = [Math.abs(combinedData.Personalkosten)];

        const chartColors = [
            '#EF4444', '#F97316', '#EAB308', '#22C55E',
            '#3B82F6', '#6366F1', '#8B5CF6', '#D946EF',
        ];

        overheadCategories.forEach(category => {
            let value = combinedData[category];
            
            if (typeof value === 'object' && value.parsedValue !== undefined) {
                value = value.parsedValue;
            }
            
            if (typeof value === 'number' && value !== 0) {
                chartLabels.push(category);
                chartData.push(Math.abs(value));
            }
        });

        if (combinedData.EBIT > 0) {
            chartLabels.push('EBIT');
            chartData.push(combinedData.EBIT);
            chartColors.push('#10B981');
        }

        const data: ChartConfiguration<'doughnut'>['data'] = {
            labels: chartLabels,
            datasets: [{
                label: 'Kostenstruktur',
                data: chartData,
                backgroundColor: chartColors.slice(0, chartData.length),
                borderWidth: 1
            }]
        };
        // --- End Logic ---

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

    return <canvas ref={chartRef} id="kostenstrukturChartCategory"></canvas>;
};

export default KostenstrukturCategoryChart;