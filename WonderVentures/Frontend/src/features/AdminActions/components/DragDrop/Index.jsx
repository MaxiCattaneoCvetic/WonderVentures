/* eslint-disable react/prop-types */
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { MAX_FILES_LIMIT } from './helper';

const Index = ({ onSavedImages, editMaxLimit, disabled=false, deleteAllImgs=() => {} }) => {
  const [fileSet, setFileSet] = useState(new Set());
  const [error, setError] = useState('');
  const [maxSize, setMaxSize] = useState(MAX_FILES_LIMIT)
  useState(() => {
    if(editMaxLimit !== undefined){
      setMaxSize(5 - editMaxLimit)
    }
  }, [editMaxLimit])

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (fileSet.size + acceptedFiles.length > maxSize) {
        setError(`You can upload only ${maxSize} files.`);
      } else {
        setError('');
        const newFileSet = new Set(fileSet);
        acceptedFiles.forEach((file) => newFileSet.add(file));
        setFileSet(newFileSet);
        onSavedImages(Array.from(newFileSet));
      }
    },
    [fileSet]
  );

  const handleDeleteAll = () => {
    setFileSet(new Set());
    setError('');
    deleteAllImgs()
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
    },
    disabled: disabled,
  });

  return (
    <>
      <div 
        {...getRootProps()}
        style={{
          border: '2px dashed #ccc',
          borderRadius: '5px',
          padding: '20px',
          margin: '20px',
          textAlign: 'center',
          cursor: 'pointer',
          background: isDragActive ? '#f2f2f2' : 'transparent'
        }}
      >
        <input {...getInputProps()} />
        <p>
          {isDragActive
            ? `Drop the files here (Max ${maxSize} files)`
            : `Drag and drop files here (Max ${maxSize} files)`}
        </p>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <ul>
          {Array.from(fileSet).map((file) => (
            <li key={file.name}>{file.name} </li>
          ))}
        </ul>
      </div>
      <div>
        {fileSet.size > 0 && (
          <button type='button' onClick={handleDeleteAll}>Delete All</button>
        )}
      </div>
    </>
  );
};

export default Index;
