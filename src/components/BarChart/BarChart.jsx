import { Bar } from "@nivo/bar";
import { mockBarData } from 'src/data/mockBarData';

export const BarChart = ({config}) => {
  const {
    width = 620,
    height = 300,
    groupMode = "grouped",
    layout = "vertical"
  } = config;

  return (
    <Bar
      data={mockBarData}
      width={width}
      height={height}
      indexBy="country"
      keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
      groupMode={groupMode}
      layout={layout}
      padding={0}
      innerPadding={1}
      enableLabel={false}
      labelOffset={2}
      labelSkipWidth={11}
      labelSkipHeight={10}
      colors={{ scheme: 'dark2' }}
      borderRadius={6}
      borderColor={{ from: 'color', modifiers: [] }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          translateX: 120,
          itemsSpacing: 3,
          itemWidth: 100,
          itemHeight: 16
        }
      ]}
      totalsOffset={9}
      axisBottom={{ legend: 'country (indexBy)', legendOffset: 32 }}
      axisLeft={{ legend: 'food', legendOffset: -40 }}
      isFocusable={true}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    />
  );
};
