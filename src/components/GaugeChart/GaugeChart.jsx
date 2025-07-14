import { useRef } from "react";
import { RadialBar } from "@nivo/radial-bar";
import {mockGaugeData} from "src/data/mockGaugeData.js";

const Custom = ({ center, bars }) => {
  const ref = useRef(null);
  return (
    <text
      x={center[0] - (ref.current?.getBBox().width / 2 || 0)}
      y={center[1]}
      style={{ fontSize: "24pt" }}
      ref={ref}
    >
      Value: {bars[0].value}
    </text>
  );
};

const GaugeChart = ({width = 620, height = 300}) => {

  return (
    <RadialBar
      data={mockGaugeData}
      width={width}
      height={height}
      startAngle={-90}
      endAngle={90}
      margin={{ top: 50, bottom: -200 }}
      circularAxisOuter={null}
      enableTracks={false}
      colors={(dat) => dat.data.color}
      maxValue={100}
      enableRadialGrid={false}
      enableCircularGrid={false}
      radialAxisStart={null}
      tooltip={(x) => {
        if (x.bar.groupId === "Current") {
          return (
            <div style={{ backgroundColor: "white", padding: 8 }}>
              {x.bar.data.tip}: {x.bar.data.y}
            </div>
          );
        }
        return null;
      }}
      layers={["grid", "tracks", "bars", "labels", "legends", Custom]}
    />
  )
}

export default GaugeChart;