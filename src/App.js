import { useState, useEffect } from "react";
import imageToBase64 from "image-to-base64/browser";

function App() {
  useEffect(() => {
    imageToBase64("https://placekitten.com/200/300") // Path to the image
      .then(response => {
        console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
        const prefix = "data:image/jpg;base64,";
        const dataUrl = prefix + response;
        return localStorage.setItem("image", dataUrl);
      })
      .catch(error => {
        console.log(error); // Logs an error if there was one
      });
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
