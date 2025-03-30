import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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

const SentimentLineChart = ({ sentimentData }) => {
  const labels = sentimentData.map((_, index) => `#${index + 1}`);
  const dataPoints = sentimentData.map((item) => sentimentMapping[item.label]);
  const backgroundColors = sentimentData.map((item) => sentimentColors[item.label]);

  const data = {
    labels,
    datasets: [
      {
        label: "Sentiment Trend",
        data: dataPoints,
        borderColor: backgroundColors,
        backgroundColor: backgroundColors,
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: backgroundColors,
        segment: {
          borderColor: (ctx) => backgroundColors[ctx.p1DataIndex],
        },
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Sentiment Trend Over Time",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const sentimentLabel = Object.keys(sentimentMapping).find(
              (key) => sentimentMapping[key] === context.raw
            );
            return `Order: ${context.label} | Sentiment: ${sentimentLabel}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Order of Data Points",
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

  return <Line data={data} options={options} />;
};

export default SentimentLineChart;