/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const arrayBufferToBase64 = (buffer: any) => {
  let binary = '';
  const bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => binary += String.fromCharCode(b));
  return window.btoa(binary);
};

/*
  const [ data, setData ] = useState<string>('');

  useEffect(() => {
    const testi = axios.get('http://localhost:3001/api/images');
    void testi.then((res) => {
      if (res.data) {
        console.log('dataa', typeof res.data.img.data.data);
        const juttu = arrayBufferToBase64(res.data.img.data.data);
        setData("data:image/jpeg;base64," + juttu);
      }
    });
  }, []);
*/