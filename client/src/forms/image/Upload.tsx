import axios from 'axios';

const baseURL = 'http://localhost:3001/api/images';

export const uploadAction = async (image: File) => {
  const fd = new FormData();
  fd.append('image', image, image.name);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  try {
    console.log('upload action,', fd);
    const res = await axios.post(baseURL, fd, config);
    console.log('upload action res.data: ', res.data);
  } catch (e) {
    console.log(e);
  }
};