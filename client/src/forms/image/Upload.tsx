import axios from 'axios';

const baseURL = 'http://localhost:3001/api/images';

export const uploadAction = async (image: Blob) => {
  const fd = new FormData();
  fd.append('image', image);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  try {
    console.log('upload action,', fd);
    const res = await axios.post(baseURL, fd, config);
    console.log(res.data);
  } catch (e) {
    console.log(e);
  }
};