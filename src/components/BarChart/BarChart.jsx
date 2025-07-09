import {ResponsiveBar} from "@nivo/bar";
import {mockBarData as data} from 'data/mockBarData';

export const BarChart = () => {
  return (
    <div style={{height: 300}}>
      <ResponsiveBar
        data={data}
        indexBy="country"
        groupMode="grouped"
        padding={0}
        innerPadding={1}
        enableLabel={false}
        labelOffset={2}
        labelSkipWidth={11}
        labelSkipHeight={10}
        colors={{scheme: 'dark2'}}
        borderRadius={6}
        borderColor={{from: 'color', modifiers: []}}
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
        axisBottom={{legend: 'country (indexBy)'}}
        axisLeft={{legend: 'food'}}
        isFocusable={true}
        margin={{top: 50, right: 130, bottom: 50, left: 60}}
      />
    </div>
  )
}