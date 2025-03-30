const sentimentColors = {
  NEGATIVE: "rgb(255, 99, 132)", // Red
  NEUTRAL: "rgb(54, 162, 235)",  // Blue
  POSITIVE: "rgb(75, 192, 132)", // Green
};

const SentimentProgressLine = ({ sentimentData }) => {
  const totalWords = sentimentData.reduce((sum, item) => sum + item.wordCount, 0);
  let accumulatedPercentage = 0;

  return (
    <svg width="100%" height="30">
      {sentimentData.map((item, index) => {
        const segmentWidth = (item.wordCount / totalWords) * 100;
        const xStart = accumulatedPercentage;
        accumulatedPercentage += segmentWidth;

        return (
          <rect
            key={index}
            x={`${xStart}%`}
            y="5"
            width={`${segmentWidth}%`}
            height="20"
            fill={sentimentColors[item.label]}
          />
        );
      })}
    </svg>
  );
};

export default SentimentProgressLine;
