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

const LineBubbleChart = ({ sentimentData }) => {
  let clusteredData = [];
  let count = 1;

  for (let i = 1; i <= sentimentData.length; i++) {
    if (i < sentimentData.length && sentimentData[i].label === sentimentData[i - 1].label) {
      count++;
    } else {
      clusteredData.push({
        label: sentimentData[i - 1].label,
        value: sentimentMapping[sentimentData[i - 1].label],
        count,
      });
      count = 1;
    }
  }

  const labels = clusteredData.map((_, index) => `#${index + 1}`);
  const dataPoints = clusteredData.map((item) => item.value);
  const backgroundColors = clusteredData.map((item) => sentimentColors[item.label]);

  const data = {
    labels,
    datasets: [
      {
        label: "Sentiment Trend",
        data: dataPoints,
        borderColor: backgroundColors,
        borderWidth: 2,
        pointRadius: clusteredData.map((item) => item.count * 3),
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
        text: "Sentiment Trend Over Time (Clustered)",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const sentimentLabel = Object.keys(sentimentMapping).find(
              (key) => sentimentMapping[key] === context.raw
            );
            return `Segment: ${context.label} | Sentiment: ${sentimentLabel} | Count: ${clusteredData[context.dataIndex].count}`;
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

  return <Line data={data} options={options} />;
};

export default LineBubbleChart;
