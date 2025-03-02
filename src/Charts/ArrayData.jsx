import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const sentimentData = [
  { label: "NEGATIVE", score: 0.8 },
  { label: "POSITIVE", score: 0.3 },
  { label: "NEUTRAL", score: 0.5 },
  { label: "NEGATIVE", score: 0.9 },
  { label: "POSITIVE", score: 0.6 },
  { label: "NEUTRAL", score: 0.4 },
  { label: "NEGATIVE", score: 0.7 },
  { label: "POSITIVE", score: 0.2 },
  { label: "NEUTRAL", score: 0.55 },
  { label: "NEGATIVE", score: 0.85 },
  { label: "POSITIVE", score: 0.45 },
  { label: "NEUTRAL", score: 0.35 },
  { label: "NEGATIVE", score: 0.95 },
  { label: "POSITIVE", score: 0.75 },
  { label: "NEUTRAL", score: 0.65 },
];

const sentimentLabels = ["NEGATIVE", "NEUTRAL", "POSITIVE"];

const StackedBarChart = () => {
  const scoresByLabel = sentimentLabels.map(label => sentimentData.filter(d => d.label === label).map(d => d.score));

  const data = {
    labels: sentimentLabels,
    datasets: [
      {
        label: 'Low Certainty (0-0.5)',
        data: scoresByLabel.map(scores => scores.filter(score => score <= 0.5).length),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Medium Certainty (0.5-0.7)',
        data: scoresByLabel.map(scores => scores.filter(score => score > 0.5 && score <= 0.7).length),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'High Certainty (0.7-1.0)',
        data: scoresByLabel.map(scores => scores.filter(score => score > 0.7).length),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Stacked Bar Chart - Sentiment Certainty' },
    },
    scales: { x: { stacked: true }, y: { stacked: true } },
  };

  return <Bar data={data} options={options} />;
};

const GroupedBarChart = () => {
  const certaintyBins = [0.5, 0.7, 1.0];
  const data = {
    labels: sentimentLabels,
    datasets: certaintyBins.map((threshold, index) => ({
      label: `Certainty ≤ ${threshold}`,
      data: sentimentLabels.map(label => sentimentData.filter(d => d.label === label && d.score <= threshold).length),
      backgroundColor: `rgba(${(index + 1) * 75}, ${(index + 2) * 50}, ${(index + 3) * 30}, 0.5)`,
    })),
  };

  return <Bar data={data} options={{ responsive: true, plugins: { title: { display: true, text: 'Grouped Bar Chart - Sentiment Certainty' } } }} />;
};

const HistogramForCertaintyDistribution = () => {
  const bins = Array.from({ length: 10 }, (_, i) => i * 0.1);
  const labels = bins.map((bin, i) => i < bins.length - 1 ? `${bin.toFixed(1)} - ${(bins[i + 1]).toFixed(1)}` : null).filter(Boolean);

  const data = {
    labels,
    datasets: sentimentLabels.map((sentiment, index) => ({
      label: sentiment,
      data: labels.map((_, i) => sentimentData.filter(d => d.label === sentiment && d.score >= bins[i] && d.score < bins[i + 1]).length),
      backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)", "rgba(75, 192, 132, 0.5)"][index],
    })),
  };

  return <Bar data={data} options={{ responsive: true, plugins: { title: { display: true, text: 'Histogram - Certainty Distribution by Sentiment' } }, scales: { x: { stacked: false }, y: { stacked: false } } }} />;
};

export { StackedBarChart, GroupedBarChart, HistogramForCertaintyDistribution };