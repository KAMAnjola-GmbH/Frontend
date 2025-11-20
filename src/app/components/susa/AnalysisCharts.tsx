'use client';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function AnalysisCharts({ kpiData }: { kpiData: any[] }) {
  const gesamtData = kpiData.find((d: any) => d.Gruppe === 'Gesamtunternehmen');
  if (!gesamtData) return null;

  const combinedData = { ...gesamtData, ...(gesamtData.AdditionalData || {}) };

  // 1. Kostenstruktur Data
  const kostenData = {
    labels: ['Personalkosten', 'Overhead-Kosten', 'EBIT'],
    datasets: [{
      data: [
        Math.abs(gesamtData.Personalkosten),
        Math.abs(gesamtData['Overhead-Kosten']),
        gesamtData.EBIT > 0 ? gesamtData.EBIT : 0
      ],
      backgroundColor: ['rgba(239, 68, 68, 0.7)', 'rgba(249, 115, 22, 0.7)', 'rgba(34, 197, 94, 0.7)'],
      borderColor: ['rgba(239, 68, 68, 1)', 'rgba(249, 115, 22, 1)', 'rgba(34, 197, 94, 1)'],
      borderWidth: 1
    }]
  };

  // 2. Finanzübersicht Data
  const finanzData = {
    labels: ['Erlöse', 'Kosten', 'EBIT'],
    datasets: [{
      label: 'Betrag in €',
      data: [
        gesamtData.Erlöse,
        Math.abs(gesamtData.Personalkosten) + Math.abs(gesamtData['Overhead-Kosten']),
        gesamtData.EBIT
      ],
      backgroundColor: ['rgba(59, 130, 246, 0.7)', 'rgba(239, 68, 68, 0.7)', 'rgba(34, 197, 94, 0.7)'],
    }]
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-96">
      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex flex-col">
        <h4 className="text-center font-semibold mb-2 text-white">Kostenstruktur</h4>
        <div className="relative flex-grow">
          <Doughnut data={kostenData} options={{ maintainAspectRatio: false, responsive: true }} />
        </div>
      </div>
      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex flex-col">
        <h4 className="text-center font-semibold mb-2 text-white">Finanzübersicht</h4>
        <div className="relative flex-grow">
          <Bar data={finanzData} options={{ maintainAspectRatio: false, responsive: true }} />
        </div>
      </div>
    </div>
  );
}