import { useRef } from "react";
import imageToBase64 from "image-to-base64/browser";

const saveImageToLocalStorage = url => {
  imageToBase64(url)
    .then(base64 => {
      const prefix = "data:image/jpg;base64,";
      const dataUrl = prefix + base64;
      return localStorage.setItem("image", dataUrl);
    })
    .catch(error => console.log(error));
};

function App() {
  const inputRef = useRef(null);

  const handleSubmit = () => {
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
