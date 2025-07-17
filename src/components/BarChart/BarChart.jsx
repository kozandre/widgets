import { ResponsiveBar } from "@nivo/bar";
import { mockBarData } from "src/data/mockBarData";

const BarChart = ({ config }) => {
  const {
    groupMode = "grouped",
    layout = "vertical",
    enableLabel = true,
    enableTotals = false,
    enableGridX = false,
    enableGridY = true,
    isInteractive = true,
  } = config;

  return (
    <ResponsiveBar
      data={mockBarData}
      indexBy="country"
      keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
      groupMode={groupMode}
      layout={layout}
      padding={0}
      innerPadding={1}
      enableLabel={enableLabel}
      colors={{ scheme: "dark2" }}
      borderColor={{ from: "color", modifiers: [] }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          translateX: 120,
          itemsSpacing: 3,
          itemWidth: 100,
          itemHeight: 16,
        },
      ]}
      enableTotals={enableTotals}
      enableGridX={enableGridX}
      enableGridY={enableGridY}
      isInteractive={isInteractive}
      isFocusable={true}
      axisBottom={{ legend: "country (indexBy)", legendOffset: 32 }}
      axisLeft={{ legend: "food", legendOffset: -40 }}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    />
  );
};

export default BarChart;
