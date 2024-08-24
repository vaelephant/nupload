"use client";

import React from 'react';

interface UploadedFileInfoProps {
  fileName: string;
  fileSize: number;
  uploadTime: Date;
}

const UploadedFileInfo: React.FC<UploadedFileInfoProps> = ({ fileName, fileSize, uploadTime }) => {
  const formattedSize = (fileSize / 1024 / 1024).toFixed(2); // 将文件大小格式化为MB
  const formattedTime = uploadTime ? uploadTime.toLocaleString() : 'Unknown'; // 检查 uploadTime 是否存在

  return (
    <div style={{ marginTop: '20px', border: '1px solid #ddd', padding: '10px', borderRadius: '4px' }}>
      <p><strong>File Name:</strong> {fileName}</p>
      <p><strong>File Size:</strong> {formattedSize} MB</p>
      <p><strong>Upload Time:</strong> {formattedTime}</p>
    </div>
  );
};

export default UploadedFileInfo;