import React, { useState } from 'react';

import { uploadAction } from './Upload';

const ImageForm = () => {
  const [ image, setImage ] = useState<Blob>();
  const [ preview, setPreview ] = useState(false); 

  const handleImageUpload = (event:React.ChangeEvent<HTMLInputElement>) => { 
    if (event.target.files) {
      setImage(event.target.files[0]);
      setPreview(true);
    }
  };

  const clearImage = () => {
    setPreview(false);
    setImage(undefined);
  };

  const handleSubmit = () => {
    if (image) {
      console.log('handle submit image', image);
      
      void uploadAction(image);
      setPreview(false);
      setImage(undefined);
    }
  };

  return (
    <div>
      {preview ? 
      <>
        <button onClick={clearImage}> x </button>
        <h5> Image preview </h5>
        <img src={ URL.createObjectURL(image) } alt="Preview to upload" />
        <button onClick={ handleSubmit } >Upload</button>
      </> :
      <>
        <input type="file" onChange={handleImageUpload} accept="png jpg jpeg" />
      </>  
    }
    </div>
  );
};

export default ImageForm;