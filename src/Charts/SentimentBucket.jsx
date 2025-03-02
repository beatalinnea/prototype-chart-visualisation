import { useState } from "react";

const SentimentBucket = ({ sentimentData, setSentimentData }) => {
  const [newLabel, setNewLabel] = useState("NEUTRAL");
  const [newScore, setNewScore] = useState(0.5);

  const handleAddData = () => {
    const updatedData = [...sentimentData, { label: newLabel, score: parseFloat(newScore.toFixed(2)) }];
    setSentimentData(updatedData);
  };

  const handleRemoveData = (itemToRemove) => {
    const updatedData = sentimentData.filter((item) => item !== itemToRemove);
    setSentimentData(updatedData);
  };

  // Categorize the sentimentData into NEGATIVE, NEUTRAL, POSITIVE
  const negativeData = sentimentData.filter(item => item.label === "NEGATIVE");
  const neutralData = sentimentData.filter(item => item.label === "NEUTRAL");
  const positiveData = sentimentData.filter(item => item.label === "POSITIVE");

  return (
    <div className="sentiment-bucket">
      <h3>Sentiment Data</h3>
      <div className="sentiment-controls">
        <div className="sentiment-buttons">
          <button onClick={() => setNewLabel("NEGATIVE")} className="btn">NEGATIVE</button>
          <button onClick={() => setNewLabel("NEUTRAL")} className="btn">NEUTRAL</button>
          <button onClick={() => setNewLabel("POSITIVE")} className="btn">POSITIVE</button>
        </div>
        <div className="score-slider">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={newScore}
            onChange={(e) => setNewScore(parseFloat(e.target.value))}
            className="slider"
          />
          <span>{newScore.toFixed(2)}</span>
        </div>
        <button onClick={handleAddData} className="add-btn">Add Data</button>
      </div>

      {/* Sentiment data categorized into three columns */}
      <div className="sentiment-columns">
        {/* Negative Column */}
        <div className="sentiment-column">
          <h4>NEGATIVE</h4>
          {negativeData.map((item, index) => (
            <div key={index} className="sentiment-item">
              {item.label}: {item.score.toFixed(2)}
              <button onClick={() => handleRemoveData(item)} className="remove-btn">Remove</button>
            </div>
          ))}
        </div>

        {/* Neutral Column */}
        <div className="sentiment-column">
          <h4>NEUTRAL</h4>
          {neutralData.map((item, index) => (
            <div key={index} className="sentiment-item">
              {item.label}: {item.score.toFixed(2)}
              <button onClick={() => handleRemoveData(item)} className="remove-btn">Remove</button>
            </div>
          ))}
        </div>

        {/* Positive Column */}
        <div className="sentiment-column">
          <h4>POSITIVE</h4>
          {positiveData.map((item, index) => (
            <div key={index} className="sentiment-item">
              {item.label}: {item.score.toFixed(2)}
              <button onClick={() => handleRemoveData(item)} className="remove-btn">Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SentimentBucket;
