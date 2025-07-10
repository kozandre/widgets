import {Line} from "@nivo/line";
import {mockLineData} from "src/data/mockLineData.js";

export const LineChart = ({width = 620, height = 350}) => {
  return (
    <Line
      data={mockLineData}
      width={width}
      height={height}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
      axisBottom={{ legend: 'transportation', legendOffset: 36 }}
      axisLeft={{ legend: 'count', legendOffset: -40 }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'seriesColor' }}
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      useMesh={true}
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