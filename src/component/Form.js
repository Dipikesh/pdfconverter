import React, { useState } from 'react'
import axios from 'axios'
import Compressor from 'compressorjs';


const Form = () => {
  const [compressedFiles, setCompressedFile] = useState([]);
  
  const handleCompressedUpload = async (e) => {
    console.log('Uploading compressed files on change length', e.target.files.length);
    const len = e.target.files.length;
    for (var i = 0; i < len; i++) {
    var image = e.target.files[i];
    console.log("Image to be compressed: " + image);

      await new Compressor(image, {
        quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
        success: (compressedResult) => {
          // compressedResult has the compressed file.
          // Use the compressed file to upload the images to your server.
          console.log("compressed image  is ", compressedResult)
          setCompressedFile([...compressedFiles, compressedResult]);
        },
      });
    }
  };
    const uploadImage = async (data) => {
      const url = "https://www.dipikesh.me/convert";

      try {
        const response = await axios.post(url, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          // onUploadProgress(progressEvent) {
          //   console.log({ progressEvent });
          //   document.getElementById("load").innerHTML = "Uploading";
          // },
        });

        console.log("res", response);

        return response;
      } catch (err) {
        alert("Image Limit or size exceeded");
      }
    };
const onFormSubmit = async (event) => {
  event.preventDefault();
  const bodyFormData = new FormData();
  
  const length = event.target.image.files.length;
  for (let k = 0; k < length; k++) {
    bodyFormData.append('image', compressedFiles[k]);
  }

  console.log("bodyFormData", bodyFormData);
  


  if (!bodyFormData) {
    alert("Please Upload jpg or png File");
    return;
  }
  const response = await uploadImage(bodyFormData);
  if (response) {
    window.open(`https://www.dipikesh.me/pdf?fileName=${response.data.data}`, "_blank");
  }
};
    
  

    return (
        <form id="form" onSubmit={onFormSubmit}>
              <input type="file" multiple="multiple" className="btn-file" id="image" onChange={(event)=>handleCompressedUpload(event)}></input>
            <input type="submit" id="submit" className="btn" value="Upload" ></input>
          
        </form>
    )

    
}

export default Form
