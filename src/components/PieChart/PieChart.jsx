import {Pie} from "@nivo/pie";
import {mockPieData} from "src/data/mockPieData";

const PieChart = ({width = 620, height = 300}) => {
  return (
    <Pie
      data={mockPieData}
      width={width}
      height={height}
      margin={{top: 40, right: 80, bottom: 80, left: 80}}
      innerRadius={0.5}
      padAngle={0.6}
      cornerRadius={2}
      activeOuterRadiusOffset={8}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{from: 'color'}}
      enableArcLabels={false}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{from: 'color', modifiers: [['darker', 2]]}}
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
  )
}

export default PieChart;