import { useState } from "react";

const SentimentBucket = ({ sentimentData, setSentimentData }) => {
  const [newLabel, setNewLabel] = useState("NEUTRAL");
  const [newScore, setNewScore] = useState(0.5);

  const handleAddData = () => {
    const updatedData = [...sentimentData, { label: newLabel, score: parseFloat(newScore.toFixed(2)) }];
    setSentimentData(updatedData);
  };

  const handleRemoveData = (index) => {
    const updatedData = sentimentData.filter((_, i) => i !== index);
    setSentimentData(updatedData);
  };

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
      <ul className="sentiment-list">
        {sentimentData.map((item, index) => (
          <li key={index} className="sentiment-item">
            {item.label}: {item.score.toFixed(2)}
            <button onClick={() => handleRemoveData(index)} className="remove-btn">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SentimentBucket;
