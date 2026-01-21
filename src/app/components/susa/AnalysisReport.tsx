// components/Susa/AnalysisReport.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { AnalysisResult } from '@/types/susa';
import KostenstrukturChart from './charts/KostenstrukturChart';
import KostenstrukturCategoryChart from './charts/KostenstrukturCategoryChart';
import FinanzUebersichtChart from './charts/FinanzUebersichtChart';
import KpiTable from './KpiTable';
import DownloadLinks from './DownloadLinks';

interface AnalysisReportProps {
    analysis: AnalysisResult;
}

const AnalysisReport: React.FC<AnalysisReportProps> = ({ analysis }) => {
    const t = useTranslations('susa');
    const { reportTitle, kpiResults, resultFiles } = analysis;

    if (!kpiResults || kpiResults.length === 0) {
        return <div className="p-6 text-center text-gray-400">{t('no_kpi_data')}</div>;
    }

    return (
        <div className="flex flex-col flex-grow h-full gap-6">
            {/* Header and Download Links */}
            <div className="flex-shrink-0 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-white">{t('analysis_title')}</h3>
                    <p className="text-gray-400">{t('results_for', { title: reportTitle || 'Projekt' })}</p>
                </div>
                <div id="download-links-container" className="flex gap-3 justify-end">
                    <DownloadLinks resultFiles={resultFiles} />
                </div>
            </div>

            {/* KPI Table Container */}
            <div className="flex-shrink-0 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
                <div id="kpi-table-container" className="overflow-auto max-h-48">
                    <KpiTable kpiData={kpiResults} />
                </div>
            </div>

            {/* Charts Grid */}
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">

                {/* Chart 1: Kostenstruktur (Summary) */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 flex flex-col h-[400px]">
                    <h4 className="text-lg font-semibold mb-2 text-center text-white">{t('cost_structure_company')}</h4>
                    <div className="relative flex-grow">
                        <KostenstrukturChart kpiData={kpiResults} />
                    </div>
                </div>

                {/* Chart 2: Finanzübersicht (Bar Chart) */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 flex flex-col h-[400px]">
                    <h4 className="text-lg font-semibold mb-2 text-center text-white">{t('financial_overview_company')}</h4>
                    <div className="relative flex-grow">
                        <FinanzUebersichtChart kpiData={kpiResults} />
                    </div>
                </div>

                {/* Chart 3: Kostenstruktur (Category Detail) */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 flex flex-col h-[400px]">
                    <h4 className="text-lg font-semibold mb-2 text-center text-white">{t('cost_structure_category')}</h4>
                    <div className="relative flex-grow">
                        <KostenstrukturCategoryChart kpiData={kpiResults} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisReport;