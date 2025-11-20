// components/Susa/KpiTable.tsx
import React from 'react';
import { KpiRow } from '@/types/susa';

interface KpiTableProps {
    kpiData: KpiRow[];
}

const formatValue = (value: any, header: string) => {
    if (typeof value === 'number') {
        if (header.includes('%')) {
            return `${value.toFixed(2)}%`;
        }
        return value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return String(value);
};

const KpiTable: React.FC<KpiTableProps> = ({ kpiData }) => {
    if (!kpiData || kpiData.length === 0) {
        return <p className="text-center p-4 text-gray-400">No KPI data available.</p>;
    }

    const headers = Object.keys(kpiData[0]).filter(h => h !== 'AdditionalData'); // Filter out complex objects

    return (
        <table className="min-w-full text-xs divide-y divide-gray-700">
            <thead>
                <tr>
                    {headers.map(header => (
                        <th 
                            key={header} 
                            className="px-2 py-1 border-b border-gray-600 text-left font-semibold sticky top-0 bg-gray-800/70 backdrop-blur-sm"
                            style={{ textAlign: (header.includes('%') || header === 'EBIT' || header.includes('kosten')) ? 'right' : 'left' }}
                        >
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {kpiData.map((rowData, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-gray-700 last:border-b-0">
                        {headers.map(header => (
                            <td 
                                key={header} 
                                className="px-2 py-1 whitespace-nowrap"
                                style={{ textAlign: (header.includes('%') || header === 'EBIT' || header.includes('kosten')) ? 'right' : 'left' }}
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