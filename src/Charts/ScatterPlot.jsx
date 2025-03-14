import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(LinearScale, PointElement, Title, Tooltip, Legend);

const baseColors = {
  NEGATIVE: "rgb(255, 99, 132)", // Red
  NEUTRAL: "rgb(54, 162, 235)", // Blue
  POSITIVE: "rgb(75, 192, 132)",  // Green
};

const ScatterPlot = ({ sentimentData }) => {
  const dataPoints = sentimentData.map((item, index) => ({
    x: item.score, // Certainty score on X-axis
    y: Math.floor(Math.random() * (513 - 10 + 1)) + 10, // Random word count between 10 and 513
    id: index + 1, // Unique ID based on index
    label: item.label,
    backgroundColor: baseColors[item.label],
  }));

  const data = {
    datasets: [
      {
        label: "Sentiment Scatter Plot",
        data: dataPoints.map(({ x, y, id, label }) => ({ x, y, id, label })),
        pointBackgroundColor: dataPoints.map(({ backgroundColor }) => backgroundColor),
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Scatter Plot - Sentiment Data",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const { x, y, id, label } = context.raw;
            return `ID: ${id} | Certainty: ${x.toFixed(2)} | Word Count: ${y} | Label: ${label}`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        min: 0,
        max: 1,
        title: {
          display: true,
          text: "Certainty",
        },
      },
      y: {
        min: 10,
        max: 600,
        title: {
          display: true,
          text: "Word Count",
        },
      },
    },
  };

  return <Scatter data={data} options={options} />;
};

export default ScatterPlot;
