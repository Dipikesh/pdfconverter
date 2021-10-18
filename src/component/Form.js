import React from "react";
import axios from "axios";
import Compressor from "compressorjs";

const Form = () => {
  const bodyFormData = new FormData();
  var checkLen = 0;


  const handleCompressedUpload = async (files) => {
    console.log("Uploading compressed files on change length", files[1]);

    const len = files.length;
    for (var i = 0; i < len; i++) {
      new Compressor(files[i], {
        quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
        success: (compressedResult) => {
          console.log("compressed image  is ", compressedResult);
          bodyFormData.append("file", compressedResult, compressedResult.name);
        },
      });
    }
    checkLen = 1;
    
  };
  const uploadImage = async (data) => {
    const url = "https://dipikesh.me/convert";

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("res", response);

      return response;
    } catch (err) {
      if (err.status === 500) alert("Internal server error");
      else if (err.status === 400) alert("Upload Image with limited size");
      else {
        alert("Something went wrong, try again");
      }
    }
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
   

    const length = event.target.image.files.length;
    if (!length) return alert("Please upload an image");
    //  if (!checkLen) return alert("Image is compressing, wait a second");
    event.target.image.value = null;

    console.log("bodyFormData", [...bodyFormData.entries()]);

    if (!bodyFormData) {
      alert("Please Upload jpg or png File");
      return;
    }

    const response = await uploadImage(bodyFormData);
    bodyFormData.delete("file");
    if (response) {
      event.preventDefault();

      window.open(`https://dipikesh.me/pdf?fileName=${response.data.data}`);
      event.preventDefault();
    }
  };

  return (
    <form id="form" encType="multipart/form-data" onSubmit={onFormSubmit}>
      <input
        type="file"
        className="btn-file"
        accept="image/*"
        id="image"
        name="image"
        onChange={(event) => {
          handleCompressedUpload(event.target.files);
        }}
        multiple
      />
      <input
        type="submit"
        id="submit"
        className='btn'
        value="Upload"
      ></input>
    </form>
  );
};

export default Form;
