import { useState } from "react";
import SentimentControls from "./SentimentControls";
import BarChartComponent from "./BarChartComponent";
import PieChartComponent from "./PieChartComponent";
import ScatterChart from "./SentimentScatterChart";
import RadarChart from "./RadarChartComponent";
import { StackedBarChart, GroupedBarChart, HistogramForCertaintyDistribution } from "./ArrayData";
import SentimentBucket from "./SentimentBucket";
import ScatterPlot from "./ScatterPlot";
import SentimentLineChart from "./SentimentLineChart";
import SentimentBubbleChart from "./SentimentBubbleChart";
import LineBubbleChart from "./LineBubbleChart";
import SentimentProgressLine from "./SentimentProgressLine";

const Container = () => {
  const [sentiment, setSentiment] = useState(null);
  const [score, setScore] = useState(0);
  const [showSentimentControls, setShowSentimentControls] = useState(false);
  const [sentimentData, setSentimentData] = useState([{ label: "NEGATIVE", score: 0.8, wordCount: 10 },
    { label: "POSITIVE", score: 0.3, wordCount: 10 },
    { label: "POSITIVE", score: 0.6, wordCount: 15 },
    { label: "NEUTRAL", score: 0.5, wordCount: 10 },
    { label: "NEGATIVE", score: 0.9, wordCount: 20 },
    { label: "NEGATIVE", score: 0.85, wordCount: 15 },
    { label: "NEGATIVE", score: 0.95, wordCount: 20},
    { label: "NEGATIVE", score: 0.7, wordCount: 12 },
    { label: "NEUTRAL", score: 0.4, wordCount: 11 },
    { label: "NEUTRAL", score: 0.55, wordCount: 13 },
    { label: "NEUTRAL", score: 0.35, wordCount: 19 },
    { label: "POSITIVE", score: 0.2, wordCount: 17 },
    { label: "POSITIVE", score: 0.45, wordCount: 21 },
    { label: "POSITIVE", score: 0.75, wordCount: 22 },
    { label: "NEUTRAL", score: 0.65, wordCount: 14 },]);

  const toggleCharts = () => {
    setShowSentimentControls(!showSentimentControls);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
      <button onClick={toggleCharts} style={{ marginBottom: "20px" }}>
        {showSentimentControls ? "Show Stacked, Grouped, Histogram" : "Show Sentiment Controls and Other Charts"}
      </button>

      {showSentimentControls ? (
        <>
          <SentimentControls
            setSentiment={setSentiment}
            score={score}
            setScore={setScore}
          />
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", maxWidth: "800px", marginTop: "30px" }}>
            <BarChartComponent sentiment={sentiment} score={score} />
            <hr style={{ border: "0.5px solid rgb(87, 87, 87)", width: "50vw" }} />
            <PieChartComponent sentiment={sentiment} score={score} />
            <hr style={{ border: "0.5px solid rgb(87, 87, 87)", width: "50vw" }} />
            <RadarChart sentiment={sentiment} score={score} />
            <hr style={{ border: "0.5px solid rgb(87, 87, 87)", width: "50vw" }} />
            <ScatterChart sentiment={sentiment} score={score} />
          </div>
        </>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", maxWidth: "800px", marginTop: "30px" }}>
          <SentimentProgressLine sentimentData={sentimentData}></SentimentProgressLine>
          <LineBubbleChart sentimentData={sentimentData}></LineBubbleChart>
          <SentimentBubbleChart sentimentData={sentimentData}></SentimentBubbleChart>
          <SentimentLineChart sentimentData={sentimentData}></SentimentLineChart>
          <ScatterPlot sentimentData={sentimentData}></ScatterPlot>
          <SentimentBucket sentimentData={sentimentData} setSentimentData={setSentimentData} />
          <StackedBarChart sentimentData={sentimentData} />
          <hr style={{ border: "0.5px solid rgb(87, 87, 87)", width: "50vw" }} />
          <GroupedBarChart sentimentData={sentimentData} />
          <hr style={{ border: "0.5px solid rgb(87, 87, 87)", width: "50vw" }} />
          <HistogramForCertaintyDistribution sentimentData={sentimentData} />
        </div>
      )}
    </div>
  );
};

export default Container;
