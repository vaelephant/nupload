"use client";

import React, { useState } from 'react';
import axios from 'axios';

interface SuploadProps {
  onUploadSuccess?: (fileName: string) => void;
  onUploadError?: (error: string) => void;
}

const Supload: React.FC<SuploadProps> = ({ onUploadSuccess, onUploadError }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setUploadProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('/api/upload', formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        },
      });

      if (response.status === 200) {
        setUploadStatus(`File uploaded successfully: ${response.data.fileName}`);
        if (onUploadSuccess) {
          onUploadSuccess(response.data.fileName);
        }
      } else {
        setUploadStatus('Failed to upload file');
        if (onUploadError) {
          onUploadError('Failed to upload file');
        }
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('An error occurred while uploading the file');
      if (onUploadError) {
        onUploadError('An error occurred while uploading the file');
      }
    }
  };

  return (
    <div style={{ padding: '100px' }}>
      <h1 className='text-5xl'>单文件上传</h1>
      <span></span>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && (
        <div style={{ marginTop: '20px' }}>
          <p>文件名: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</p>
          {selectedFile.type.startsWith('image/') && (
            <img src={URL.createObjectURL(selectedFile)} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
          )}
        </div>
      )}
      {/* <button onClick={handleUpload} style={{ marginTop: '20px' }}> */}
      <button onClick={handleUpload}  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
        {/* 上传
      </button> */}
      {uploadProgress > 0 && (
        <div style={{ marginTop: '20px' }}>
          <p className='text-3xl'>上传进度:</p>
          <style jsx>{`
            progress::-webkit-progress-bar {
            border-radius: 9999px; /* 设置进度条背景的圆角 */
            background-color: #fde047; 
          }
            progress::-webkit-progress-value {
            border-radius: 9999px; /* 设置进度条的圆角 */
            background-color: #ef4444; 
          }
          progress::-moz-progress-bar {
          border-radius: 9999px; /* 设置进度条的圆角 */
          background-color: #ef4444   ; 
          }
          `}</style>
          <progress className='w-full h-4 rounded-full  bg-amber-800' value={uploadProgress} max="100" />

          <span>{uploadProgress}%</span>
        </div>
      )}
      {uploadStatus && <p style={{ marginTop: '40px' }}>{uploadStatus}</p>}
    </div>
  );
};

export default Supload;