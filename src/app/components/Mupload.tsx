"use client";

import React, { useState } from 'react';
import axios from 'axios';

interface MuploadProps {
  onUploadSuccess?: (fileNames: string[]) => void;
  onUploadError?: (error: string) => void;
}

const Mupload: React.FC<MuploadProps> = ({ onUploadSuccess, onUploadError }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFiles(Array.from(event.target.files)); // 将文件转换为数组
      setUploadProgress(new Array(event.target.files.length).fill(0)); // 初始化进度条数组
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select files first');
      return;
    }

    setUploadProgress(new Array(selectedFiles.length).fill(0)); // 初始化进度状态

    const uploadPromises = selectedFiles.map((file, index) => {
      const formData = new FormData();
      formData.append('files', file); // 使用相同的名称上传多个文件

      return axios.post('/api/mupload', formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress((prevProgress) => {
              const newProgress = [...prevProgress];
              newProgress[index] = percentCompleted; // 更新对应文件的进度
              return newProgress;
            });
          }
        },
      });
    });

    try {
      await Promise.all(uploadPromises); // 等待所有文件上传完成
      setUploadStatus('文件上传成功');
      if (onUploadSuccess) {
        const fileNames = selectedFiles.map(file => file.name);
        onUploadSuccess(fileNames);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadStatus('An error occurred while uploading the files');
      if (onUploadError) {
        onUploadError('An error occurred while uploading the files');
      }
    }
  };

  return (
    <div className="flex mt-20 flex-col items-center justify-center max-h-screen p-6">
      <h1 className='text-5xl mt-2 mb-8 text-center '>病历资料上传</h1>
      <input className="w-64 mt-16 mb-18 rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="file" multiple onChange={handleFileChange} /> {/* 允许选择多个文件 */}
      {selectedFiles.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <p>已选择文件:</p>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={handleUpload}  className="w-64 mt-16  rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">上传</button>
       
      
      {uploadProgress.map((progress, index) => (
        <div key={index} style={{ marginTop: '20px' }}>
          <p className='text-1xl'>{selectedFiles[index].name } 上传进度:</p>

          <style jsx>{`
            progress::-webkit-progress-bar {
              border-radius: 9999px;
              background-color: #000000;
            }
            progress::-webkit-progress-value {
              border-radius: 9999px;
              background-color: #ef4444;
            }
            progress::-moz-progress-bar {
              border-radius: 9999px;
              background-color: #ef4444;
            }
          `}</style>

          <progress className='w-96 h-4 rounded-full  bg-amber-800' value={progress} max="100" />
          <span>{progress}%</span>
        </div>
      ))}
      
      {uploadStatus && <p style={{ marginTop: '40px' }}>{uploadStatus}</p>}
      
    </div>
  );
};

export default Mupload;