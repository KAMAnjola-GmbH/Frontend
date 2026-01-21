// components/Modals/RenameModal.tsx
'use client';

import React, { useState } from "react";
import { useTranslations } from 'next-intl';
import BaseModal from "./BaseModal";

interface RenameModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (newName: string) => void;
    currentName: string;
}

const RenameModal: React.FC<RenameModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    currentName
}) => {
    const t = useTranslations('modals');
    const tCommon = useTranslations('common');
    const tSusa = useTranslations('susa');

    const [newName, setNewName] = useState(currentName);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newName.trim() !== "") {
            onConfirm(newName.trim());
        }
    };

    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <h3 className="text-lg font-semibold text-white mb-5">{t('rename_project')}</h3>

            <form onSubmit={handleSubmit}>
                <label
                    htmlFor="new-project-name"
                    className="block mb-2 text-sm font-medium text-gray-300"
                >
                    {t('new_project_name')}
                </label>

                <input
                    id="new-project-name"
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                    autoFocus
                />

                <div className="flex justify-end gap-3 mt-5">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md transition text-sm font-semibold"
                    >
                        {tCommon('cancel')}
                    </button>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition text-sm"
                    >
                        {tSusa('rename')}
                    </button>
                </div>
            </form>
        </BaseModal>
    );
};

export default RenameModal;
