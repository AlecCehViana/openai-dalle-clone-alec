import { useState } from "react";

const App = () => {
  const [images, setImages] = useState(null);
  const [value, setValue] = useState(null);

  const surpriseOptions = [
    "A blue ostrich eating melon",
    "A matisse style shark on the telephone",
    "A pineapple sunbathing on an island",
  ];
  const surpriseMe = () => {
    setImages(null);
    const randomValue =
      surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  };

  const getImages = async () => {
    setImages(null);
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("http://localhost:8000/images", options);
      const data = await response.json();
      console.log(data);
      setImages(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      <section className="search-section">
        <p>
          Start with a detailed description : 
          <span className="surprise" onClick={surpriseMe}>
            
            Surprise me
          </span>
        </p>
        <div className="input-container">
          <input
            value={value}
            placeholder="An impressionist oil painting of a sunflower in a purple vase..."
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={getImages}> Create </button>
        </div>
      </section>

      <section className="image-section">
        {images?.map((image, _index) => (
          <img
            key={_index}
            src={image.url}
            alt={`generated image of ${value}`}
          />
        ))}
      </section>
    </div>
  );
};

export default App;
