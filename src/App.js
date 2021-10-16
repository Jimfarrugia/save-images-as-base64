import { useRef } from "react";
import imageToBase64 from "image-to-base64/browser";

const getDataUrlPrefix = url => {
  const format = url.match(/.png/gm)
    ? "png"
    : url.match(/.jpeg/gm)
    ? "jpeg"
    : url.match(/.jpg/gm)
    ? "jpg"
    : url.match(/.webp/gm)
    ? "webp"
    : url.match(/.gif/gm)
    ? "gif"
    : url.match(/.svg/gm)
    ? "svg+xml"
    : url.match(/.bmp/gm)
    ? "bmp"
    : "jpg";

  return `data:image/${format};base64,`;
};

const saveImageToLocalStorage = url => {
  imageToBase64(url)
    .then(base64 => {
      const prefix = getDataUrlPrefix(url);
      const dataUrl = prefix + base64;
      return localStorage.setItem("image", dataUrl);
    })
    .catch(error => {
      console.error(error);
      console.log("Trying to fetch with CORS proxy...");
      imageToBase64(`https://cors-anywhere.herokuapp.com/${url}`)
        .then(base64 => {
          console.log("Success!");
          const prefix = getDataUrlPrefix(url);
          const dataUrl = prefix + base64;
          return localStorage.setItem("image", dataUrl);
        })
        .catch(error => {
          console.error(error);
          console.log("Fetch still failed with CORS proxy.");
        });
    });
};

function App() {
  const inputRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    saveImageToLocalStorage(inputRef.current.value);
  };

  return (
    <div className="App">
      <p>Enter Image URL:</p>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} />
        <input type="submit" />
      </form>
      <p>
        <img src={localStorage.getItem("image")} alt="" />
      </p>
    </div>
  );
}

export default App;
