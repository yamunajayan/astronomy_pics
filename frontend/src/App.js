import React, { useState } from "react";
import axios from "axios";
import "./style.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [buttonText, setButtonText] = useState("Click here");
  const [imgUrl, setImgUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = () => {
    setShowForm((prevShowForm) => !prevShowForm);
    setButtonText((prevButtonText) =>
      prevButtonText ? "Click here" : "Close"
    );
  };

  const handleFormSubmit = async (event, startDate) => {
    event.preventDefault();
    try {
      const response = await axios.get("http://127.0.0.1:5000/get_image_url", {
        params: { start_date: startDate },
      });
      setImgUrl(response.data.img_url);
      setShowForm(false);
      setButtonText("Click here");
      setError(null);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleDownload = () => {
    if (imgUrl) {
      const link = document.createElement("a");
      link.href = imgUrl;
      link.download = "astronomy_image.jpg"; // Set the desired file name for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const appTitle =
    "Explore breathtaking astronomy images from NASA with a simple click!";

  return (
    <>
      <div className="container">
        <header className="header">
          <div className="title">
            <h1 className="heading">{appTitle}</h1>
          </div>
          <button className="btn btn-large" onClick={handleClick}>
            {buttonText}
          </button>
        </header>

        {showForm && <AstronomyPictureForm onSubmit={handleFormSubmit} />}
        {imgUrl && (
          <div className="image-container">
            <img src={imgUrl} alt="Astronomy Picture of the Day" />
            <br />
            <button className="btn btn-download" onClick={handleDownload}>
              Download
            </button>
          </div>
        )}

        {error && <p className="error">Error: {error}</p>}
      </div>
    </>
  );
}

function AstronomyPictureForm({ onSubmit }) {
  // It will hold the value for the date
  const [startDate, setStartDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event, startDate); // Pass startDate to onSubmit function
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label htmlFor="start_date">Select a date:</label>
      <br />
      <input
        type="text"
        id="start_date"
        name="start_date"
        placeholder="YYYY-MM-DD"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <br />
      <button type="submit" className="btn btn-medium">
        Submit
      </button>
    </form>
  );
}

export default App;
