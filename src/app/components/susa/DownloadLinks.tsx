// components/Susa/DownloadLinks.tsx
'use client';

import React, { useState } from 'react';
import { ResultFiles } from '@/types/susa';
import { useNotifications } from '@/hooks/useNotifications';
import { config } from '@/app/config';

interface DownloadLinksProps {
    resultFiles: ResultFiles;
}

interface DownloadButtonProps {
    s3Key?: string;
    taskId: string;
    label: string;
    iconSvg: React.ReactNode;
    styleClasses: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ s3Key, taskId, label, iconSvg, styleClasses }) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const { addNotification } = useNotifications();

    if (!s3Key) return null;

    const fileName = s3Key.split('/').pop() || 'download';
    const downloadUrl = `${config.apiProxyBaseUrl}/susa/download-result/${taskId}/${fileName}`;

    const handleDownload = async () => {
        setIsDownloading(true);
        addNotification(`Initiating download for ${fileName}...`, 'info');

        try {
            // Note: We use the proxy here, which implicitly handles the Auth0 token.
            const response = await fetch(downloadUrl);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Download failed: ${response.status} - ${errorText.substring(0, 100)}`);
            }

            const blob = await response.blob();
            const tempLink = document.createElement('a');
            tempLink.href = URL.createObjectURL(blob);
            tempLink.setAttribute('download', fileName);
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
            URL.revokeObjectURL(tempLink.href);
            addNotification(`Download of ${fileName} complete!`, 'success');

        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Unknown error Dwonloading projects';
            console.error(message);
            addNotification(message, 'error');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`${styleClasses} px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-2 transition disabled:bg-gray-500 disabled:text-gray-300`}
        >
            {isDownloading ? (
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : (
                iconSvg
            )}
            <span>{isDownloading ? 'Downloading...' : label}</span>
        </button>
    );
};


const pdfIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0113 3.414L16.586 7A2 2 0 0118 8.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1-3a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd" /></svg>;
const sheetIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 4a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V4zm6 6a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1zm-1 3a1 1 0 100 2h5a1 1 0 100-2H8z" clipRule="evenodd" /></svg>;


const DownloadLinks: React.FC<DownloadLinksProps> = ({ resultFiles }) => {
    const { taskId, pdfS3Key, excelS3Key, csvS3Key } = resultFiles;

    if (!taskId) return null;

    return (
        <>
            <DownloadButton
                s3Key={pdfS3Key}
                taskId={taskId}
                label="Export PDF"
                iconSvg={pdfIcon}
                styleClasses="bg-red-600 hover:bg-red-500 text-white"
            />
            <DownloadButton
                s3Key={excelS3Key}
                taskId={taskId}
                label="Export Excel"
                iconSvg={sheetIcon}
                styleClasses="bg-green-600 hover:bg-green-500 text-white"
            />
            <DownloadButton
                s3Key={csvS3Key}
                taskId={taskId}
                label="Export CSV"
                iconSvg={sheetIcon}
                styleClasses="bg-blue-600 hover:bg-blue-500 text-white"
            />
        </>
    );
};

export default DownloadLinks;