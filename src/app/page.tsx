import React from 'react';
import Supload from './components/Supload';
import Mupload from './components/Mupload';

const UploadPage = () => {
  const handleUploadSuccess = (fileName: string) => {
    console.log(`File uploaded: ${fileName}`);
  };

  const handleUploadError = (error: string) => {
    console.error(`Upload error: ${error}`);
  };

  return (
    <>
      {/* <div>
      <Supload  /> //单文件上传
    </div> */}

      <div>
        <Mupload />
      </div>
    </>
  );
};

export default UploadPage;