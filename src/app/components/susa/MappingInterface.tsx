// components/Susa/MappingUI.tsx
'use client';

import React, { useState } from 'react';
import { PreAnalysisResult, UnmappedAccount } from '@/src/types/susa';

interface MappingUIProps {
    uploadId: number;
    data: PreAnalysisResult;
    onSave: (uploadId: number, mappings: { [account: string]: string }) => Promise<void>;
}

const MappingUI: React.FC<MappingUIProps> = ({ uploadId, data, onSave }) => {
    const { unmappedAccounts, availableCategories } = data;
    const [mappings, setMappings] = useState<{ [key: string]: string }>(
        unmappedAccounts.reduce((acc, account) => ({ ...acc, [account.konto]: '' }), {})
    );
    
    // Replacing the imperative confirm() with console warning
    const [isSaving, setIsSaving] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    const handleSelectChange = (konto: string, category: string) => {
        setMappings(prev => ({ ...prev, [konto]: category }));
        setShowWarning(false);
    };

    const handleSave = async () => {
        setIsSaving(true);
        const customMappings: { [account: string]: string } = {};
        let allMapped = true;

        Object.keys(mappings).forEach(konto => {
            if (mappings[konto]) {
                customMappings[konto] = mappings[konto];
            } else {
                allMapped = false;
            }
        });

        if (!allMapped && !showWarning) {
            console.warn("Some accounts were not mapped. They will be excluded from Personalkosten and Overhead-Kosten.");
            setShowWarning(true);
            setIsSaving(false);
            return;
        }

        await onSave(uploadId, customMappings);
        setIsSaving(false);
    };

    return (
        <div className="flex flex-col flex-grow bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 h-full">
            <h3 className="text-xl font-bold mb-2 text-white">Account Mapping (Step 2/3)</h3>
            <p className="text-gray-400 mb-6">Please assign a category to each of the unmapped accounts below.</p>
            
            {showWarning && (
                <div className="mb-4 p-3 bg-yellow-500/20 text-yellow-300 rounded-md text-sm border border-yellow-500/50">
                    <p className="font-semibold">Warning:</p>
                    <p>Some accounts are not mapped. They will be excluded from the analysis. Click 'Save & Run Analysis' again to confirm.</p>
                </div>
            )}

            <ul id="unmapped-accounts-list" className="space-y-3 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                {unmappedAccounts.length > 0 ? (
                    unmappedAccounts.map((account) => (
                        <li key={account.konto} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-md">
                            <div>
                                <span className="font-semibold text-gray-200">{account.konto}</span>
                                <span className="text-gray-400 ml-4 text-sm">{account.bezeichnung}</span>
                            </div>
                            <select 
                                data-account={account.konto} 
                                value={mappings[account.konto]}
                                onChange={(e) => handleSelectChange(account.konto, e.target.value)}
                                className="bg-gray-800 border border-gray-600 rounded-md p-1.5 text-sm text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[150px]"
                            >
                                <option value="">-- Please Select --</option>
                                {availableCategories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </li>
                    ))
                ) : (
                    <p className="text-center p-4 text-gray-400">No unmapped accounts found. Ready for full analysis.</p>
                )}
            </ul>
            
            <div className="flex justify-end mt-6 flex-shrink-0">
                <button 
                    id="save-mappings-btn" 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded transition duration-200 disabled:bg-gray-500"
                >
                    {isSaving ? 'Saving...' : 'Save & Run Analysis'}
                </button>
            </div>
        </div>
    );
};

export default MappingUI;