import { useState } from "react";
import SentimentControls from "./SentimentControls";
import BarChartComponent from "./BarChartComponent";
import PieChartComponent from "./PieChartComponent";
import ScatterChart from "./SentimentScatterChart";
import RadarChart from "./RadarChartComponent";
import { StackedBarChart } from "./ArrayData";
import { GroupedBarChart } from "./ArrayData";
import { HistogramForCertaintyDistribution } from "./ArrayData";

const Container = () => {
  const [sentiment, setSentiment] = useState(null); // Sentiment could be Positive, Neutral, Negative
  const [score, setScore] = useState(0); // The sentiment score ranges between 0 and 1

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
      <SentimentControls
        setSentiment={setSentiment}
        score={score}
        setScore={setScore}
      />

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", maxWidth: "800px", marginTop: "30px" }}>
        <StackedBarChart />
        <hr style={{ border: "0.5px solidrgb(87, 87, 87)", width: "50vw"}} />
        <GroupedBarChart />
        <hr style={{ border: "0.5px solidrgb(87, 87, 87)", width: "50vw"}} />
        <HistogramForCertaintyDistribution />
      <hr style={{ border: "0.5px solidrgb(87, 87, 87)", width: "50vw"}} />
        <BarChartComponent sentiment={sentiment} score={score} />
        <hr style={{ border: "0.5px solidrgb(87, 87, 87)", width: "50vw"}} />
        <PieChartComponent sentiment={sentiment} score={score} />
        <hr style={{ border: "0.5px solidrgb(87, 87, 87)", width: "50vw"}} />
        <RadarChart sentiment={sentiment} score={score} />
        <hr style={{ border: "0.5px solidrgb(87, 87, 87)", width: "50vw"}} />
        <ScatterChart sentiment={sentiment} score={score} />
      </div>
    </div>
  );
};

export default Container;
