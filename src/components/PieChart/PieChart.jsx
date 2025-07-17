import { ResponsivePie  } from "@nivo/pie";
import { mockPieData } from "src/data/mockPieData";

const PieChart = ({config = {} }) => {
  const {
    innerRadius = 0.5,
    padAngle = 0,
    sortByValue = false,
    enableArcLabels = true,
    enableArcLinkLabels = true,
    isInteractive = true,
    animate = true,
  } = config;

  return (
    <ResponsivePie
      data={mockPieData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={innerRadius}
      padAngle={padAngle}
      cornerRadius={2}
      activeOuterRadiusOffset={8}
      sortByValue={sortByValue}
      enableArcLabels={enableArcLabels}
      enableArcLinkLabels={enableArcLinkLabels}
      isInteractive={isInteractive}
      animate={animate}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          translateY: 56,
          itemWidth: 70,
          itemHeight: 18,
          symbolShape: 'circle'
        }
      ]}
    />
  );
};

export default PieChart;
