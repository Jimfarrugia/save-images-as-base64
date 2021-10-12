import { useState, useEffect } from "react";
import imageToBase64 from "image-to-base64/browser";

const saveImageToLocalStorage = imageUrl => {
  imageToBase64(imageUrl) // Path to the image
    .then(base64 => {
      const prefix = "data:image/jpg;base64,";
      const dataUrl = prefix + base64;
      return localStorage.setItem("image", dataUrl);
    })
    .catch(error => console.log(error));
};

function App() {
  useEffect(() => {
    saveImageToLocalStorage("http://placekitten.com/200/300");
  }, []);

  return (
    <div className="App">
      <p>
        <img src={localStorage.getItem("image")} alt="" />
      </p>
    </div>
  );
}

export default App;
