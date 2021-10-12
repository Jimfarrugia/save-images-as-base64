import { useState, useEffect } from "react";
import imageToBase64 from "image-to-base64/browser";

function App() {
  const [base64, setBase64] = useState("");

  useEffect(() => {
    imageToBase64("https://placekitten.com/200/300") // Path to the image
      .then(response => {
        console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
        return setBase64(response);
      })
      .catch(error => {
        console.log(error); // Logs an error if there was one
      });
  }, []);

  return (
    <div className="App">
      <p>{base64}</p>
    </div>
  );
}

export default App;
