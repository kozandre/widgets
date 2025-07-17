import {ResponsiveLine} from "@nivo/line";
import {mockLineData} from "src/data/mockLineData.js";

const LineChart = ({config = {}}) => {
  const {
    lineWidth = 2,
    enableArea = false,
    areaOpacity = 0.2,
    enablePoints = true,
    pointSize = 6,
    enablePointLabel = false,
    pointLabel = "data.yFormatted",
    pointLabelYOffset = -12,
    enableGridX = true,
    enableGridY = true,
    isInteractive = true,
    enableCrosshair = true,
  } = config;

  return (
    <ResponsiveLine
      data={mockLineData}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
      axisBottom={{ legend: 'transportation', legendOffset: 36 }}
      axisLeft={{ legend: 'count', legendOffset: -40 }}
      pointSize={pointSize}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'seriesColor' }}
      enablePointLabel={enablePointLabel}
      pointLabel={pointLabel}
      pointLabelYOffset={pointLabelYOffset}
      enableTouchCrosshair={true}
      isInteractive={isInteractive}
      useMesh={true}
      enableArea={enableArea}
      enableCrosshair={enableCrosshair}
      enableGridY={enableGridY}
      enableGridX={enableGridX}
      enablePoints={enablePoints}
      areaOpacity={areaOpacity}
      lineWidth={lineWidth}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          translateX: 100,
          itemWidth: 80,
          itemHeight: 22,
          symbolShape: 'circle'
        }
      ]}
    />
  )
}

export default LineChart;