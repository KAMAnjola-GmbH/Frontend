// components/Susa/KpiTable.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { KpiRow } from '@/types/susa';

interface KpiTableProps {
    kpiData: KpiRow[];
}

/** Check if header should be right-aligned (numeric columns) */
const isNumericColumn = (header: string): boolean =>
    header.includes('%') || header === 'EBIT' || header.includes('kosten') || header === 'Erlöse';

/** Format cell value for display */
const formatValue = (value: unknown, header: string): string => {
    // Handle null/undefined
    if (value === null || value === undefined) {
        return '-';
    }

    // Handle numbers
    if (typeof value === 'number') {
        if (header.includes('%')) {
            return `${value.toFixed(2)}%`;
        }
        return value.toLocaleString('de-DE', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    // Handle strings
    if (typeof value === 'string') {
        return value;
    }

    // Handle objects (shouldn't happen but safety fallback)
    return '-';
};

const KpiTable: React.FC<KpiTableProps> = ({ kpiData }) => {
    const t = useTranslations('susa');

    if (!kpiData || kpiData.length === 0) {
        return <p className="text-center p-4 text-gray-400">{t('no_kpi_data')}</p>;
    }

    // Filter out AdditionalData from headers
    const headers = Object.keys(kpiData[0]).filter(h => h !== 'AdditionalData');

    return (
        <table className="min-w-full text-xs divide-y divide-gray-700">
            <thead>
                <tr>
                    {headers.map(header => (
                        <th
                            key={header}
                            className="px-2 py-1 border-b border-gray-600 text-left font-semibold sticky top-0 bg-gray-800/70 backdrop-blur-sm"
                            style={{ textAlign: isNumericColumn(header) ? 'right' : 'left' }}
                        >
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {kpiData.map((rowData) => (
                    <tr key={rowData.Gruppe} className="border-b border-gray-700 last:border-b-0">
                        {headers.map(header => (
                            <td
                                key={header}
                                className="px-2 py-1 whitespace-nowrap"
                                style={{ textAlign: isNumericColumn(header) ? 'right' : 'left' }}
                            >
                                {formatValue(rowData[header], header)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default KpiTable;