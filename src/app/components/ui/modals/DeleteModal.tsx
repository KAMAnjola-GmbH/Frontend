// components/Modals/DeleteModal.tsx
import React from "react";
import BaseModal from "./BaseModal";

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    isOpen,
    onClose,
    onConfirm
}) => {
    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <h3 className="text-lg font-semibold text-white mb-4">Delete Project</h3>

            <p className="text-gray-400 mb-6">
                Are you sure you want to delete this project? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md transition text-sm font-semibold"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    onClick={onConfirm}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition text-sm"
                >
                    Delete
                </button>
            </div>
        </BaseModal>
    );
};

export default DeleteModal;
