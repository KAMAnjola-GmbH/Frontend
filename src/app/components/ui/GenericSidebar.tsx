// components/Dashboard/GenericSidebar.tsx
'use client';

import React, { useState, ReactNode } from 'react';
import Link from 'next/link'; // Changed from lucide-react to next/link for navigation

interface GenericSidebarProps {
  title?: string;
  homeLink?: string;
  uploadLabel?: string;
  acceptedFileTypes?: string;
  onUpload?: (file: File) => Promise<boolean | void>;
  children: ReactNode; // This allows you to inject ProjectList or any other list
}

const GenericSidebar: React.FC<GenericSidebarProps> = ({
  title = "Products And Services",
  homeLink = "/",
  uploadLabel = "Upload File",
  acceptedFileTypes = ".csv,.xlsx",
  onUpload,
  children
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUploadClick = async () => {
    if (selectedFile && onUpload) {
      // We await the parent's action
      const success = await onUpload(selectedFile);
      
      // Only clear if the parent returns true or undefined (void)
      if (success !== false) {
        setSelectedFile(null);
        setFileInputKey(Date.now());
      }
    }
  };

  return (
    <aside className="w-full h-full flex flex-col min-h-0 bg-[#001e5f]">
      <div className="p-4 flex-shrink-0">
        <div className="text-center font-semibold text-lg text-white/90">{title}</div>
        
        <Link 
          href={homeLink} 
          className="block px-4 py-2.5 mt-2 text-center rounded-md hover:bg-blue-500/50 text-white transition font-semibold"
        >
          Home
        </Link>

        <h2 className="text-lg font-semibold mt-6 mb-2 text-white border-t border-gray-700 pt-4">
          Items
        </h2>

        {/* Conditional Rendering: Only show upload if a handler is provided */}
        {onUpload && (
          <div className="mb-4 p-3 bg-gray-900/50 rounded-lg">
            <h2 className="text-base font-bold mb-2 text-indigo-300">{uploadLabel}</h2>
            <input
              key={fileInputKey}
              type="file"
              accept={acceptedFileTypes}
              className="mb-2 p-2 rounded text-black bg-gray-700 border border-gray-600 w-full text-sm"
              onChange={handleFileChange}
            />
            <button
              onClick={handleUploadClick}
              disabled={!selectedFile}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 w-full mt-2 transition disabled:bg-gray-500 disabled:opacity-70 font-semibold text-sm"
            >
              Upload
            </button>
          </div>
        )}
      </div>

      {/* The specific list (Susa ProjectList, etc.) goes here */}
      <div className="flex-grow overflow-y-auto px-4 pb-4">
        {children}
      </div>
    </aside>
  );
};

export default GenericSidebar;