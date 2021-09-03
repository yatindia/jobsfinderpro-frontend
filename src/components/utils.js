import Resizer from "react-image-file-resizer";

//export const API_URL = 'http://212.71.239.166:5300' 
export const API_URL = 'http://127.0.0.1:5300'

export const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,500,500,"PNG",100,0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

  export const dataURIToBlob = (dataURI) => {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
  
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
  
    return new Blob([ia], { type: mimeString });
  }; 