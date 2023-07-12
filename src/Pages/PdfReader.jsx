import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


const FileDownload = ({  }) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const file = queryParams.get('file');
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    const downloadUrl = `http://localhost:5000/getNote/${encodeURIComponent(file)}`;

    fetch(downloadUrl)
      .then(response => response.blob())
      .then(blob => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setFileData(fileReader.result);
        };
        fileReader.readAsDataURL(blob);
      });
  }, [file]);

  return (
    <div style={{height:'100%',width:'100%'}}>
      {fileData && (
        <embed src={fileData} type="application/pdf" height='800px' width='100%' onContextMenu={(e) => e.preventDefault()} />
        // Replace "application/pdf" with the appropriate MIME type for your file
      )}
    </div>
  );
};

export default FileDownload;
