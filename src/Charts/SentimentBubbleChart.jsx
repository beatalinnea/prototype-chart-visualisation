import { Bubble } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const sentimentMapping = {
  NEGATIVE: -1,
  NEUTRAL: 0,
  POSITIVE: 1,
};

const sentimentColors = {
  NEGATIVE: "rgb(255, 99, 132)", // Red
  NEUTRAL: "rgb(54, 162, 235)",  // Blue
  POSITIVE: "rgb(75, 192, 132)", // Green
};

const SentimentBubbleChart = ({ sentimentData }) => {
  let clusteredData = [];
  let count = 1;

  for (let i = 1; i <= sentimentData.length; i++) {
    if (i < sentimentData.length && sentimentData[i].label === sentimentData[i - 1].label) {
      count++;
    } else {
      clusteredData.push({
        label: sentimentData[i - 1].label,
        value: sentimentMapping[sentimentData[i - 1].label],
        size: count * 5,
      });
      count = 1;
    }
  }

  const data = {
    datasets: [
      {
        label: "Sentiment Clusters",
        data: clusteredData.map((item, index) => ({
          x: index + 1,
          y: item.value,
          r: item.size,
        })),
        backgroundColor: clusteredData.map((item) => sentimentColors[item.label]),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Sentiment Clustering Visualization",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const sentimentLabel = Object.keys(sentimentMapping).find(
              (key) => sentimentMapping[key] === context.raw.y
            );
            return `Sentiment: ${sentimentLabel} | Count: ${context.raw.r / 5}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Segment Order",
        },
      },
      y: {
        title: {
          display: true,
          text: "Sentiment",
        },
        ticks: {
          callback: (value) => {
            return Object.keys(sentimentMapping).find(
              (key) => sentimentMapping[key] === value
            );
          },
        },
      },
    },
  };

  return <Bubble data={data} options={options} />;
};

export default SentimentBubbleChart;