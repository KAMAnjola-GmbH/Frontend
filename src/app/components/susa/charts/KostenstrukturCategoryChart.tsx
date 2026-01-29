// components/Susa/Charts/KostenstrukturCategoryChart.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import { KpiRow } from '@/types/susa';

interface KostenstrukturCategoryChartProps {
    kpiData: KpiRow[];
}

/** Type guard to check if value has parsedValue property */
function hasParsedValue(value: unknown): value is { parsedValue: number } {
    return (
        typeof value === 'object' &&
        value !== null &&
        'parsedValue' in value &&
        typeof (value as { parsedValue: unknown }).parsedValue === 'number'
    );
}

/** Safely extract numeric value from KpiRow field */
function getNumericValue(value: unknown): number {
    if (typeof value === 'number') return value;
    if (hasParsedValue(value)) return value.parsedValue;
    return 0;
}

const OVERHEAD_CATEGORIES = [
    'Abschreibungen & Anlagen',
    'Fremdleistungen',
    'Verwaltung & Büro',
    'IT & Kommunikation',
    'Reisen & Repräsentation',
    'Versicherungen & Gebühren',
    'Sonstige betriebliche Aufwendungen'
] as const;

const CHART_COLORS = [
    '#EF4444', '#F97316', '#EAB308', '#22C55E',
    '#3B82F6', '#6366F1', '#8B5CF6', '#D946EF',
];

const KostenstrukturCategoryChart: React.FC<KostenstrukturCategoryChartProps> = ({ kpiData }) => {
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

        // Merge base data with AdditionalData for category lookups
        const additionalData = gesamtData.AdditionalData ?? {};

        const chartLabels: string[] = ['Personalkosten'];
        const chartData: number[] = [Math.abs(gesamtData.Personalkosten)];
        const chartColors = [...CHART_COLORS];

        // Process overhead categories
        for (const category of OVERHEAD_CATEGORIES) {
            // Check both base data and AdditionalData
            const value = gesamtData[category] ?? additionalData[category];
            const numericValue = getNumericValue(value);

            if (numericValue !== 0) {
                chartLabels.push(category);
                chartData.push(Math.abs(numericValue));
            }
        }

        const ebit = gesamtData.EBIT;

        if (ebit > 0) {
            chartLabels.push("EBIT");
            chartData.push(ebit);
            chartColors.push("#10B981");
        }

        // Update existing chart - labels and data may change dynamically
        if (chartInstance.current) {
            chartInstance.current.data.labels = chartLabels;
            chartInstance.current.data.datasets[0].data = chartData;
            chartInstance.current.data.datasets[0].backgroundColor = chartColors.slice(0, chartData.length);
            chartInstance.current.update('none');
            return;
        }

        // Create new chart only on first render
        const data: ChartConfiguration<'doughnut'>['data'] = {
            labels: chartLabels,
            datasets: [{
                label: 'Kostenstruktur',
                data: chartData,
                backgroundColor: chartColors.slice(0, chartData.length),
                borderWidth: 1
            }]
        };

        chartInstance.current = new Chart<'doughnut'>(chartRef.current, {
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
    }, [kpiData]);

    return <canvas ref={chartRef} id="kostenstrukturChartCategory"></canvas>;
};

export default KostenstrukturCategoryChart;