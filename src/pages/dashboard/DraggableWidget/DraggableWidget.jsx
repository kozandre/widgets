import {useDrag} from 'react-dnd';
import {Paper, Typography} from '@mui/material';
import barChartImg from 'src/assets/barChart.png';
import lineChartImg from 'src/assets/lineChart.png';
import pieChartImg from 'src/assets/piechart.png';
import gaugeChartImg from 'src/assets/gaugeChart.png';
import './styles.css';

const ItemTypes = {WIDGET: 'widget'};

const widgetIcons = {
  BarChart: barChartImg,
  LineChart: lineChartImg,
  PieChart: pieChartImg,
  GaugeChart: gaugeChartImg,
};

const DraggableWidget = ({widget}) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.WIDGET,
    item: {type: widget.type, config: widget.config}
  }));

  return (
    <Paper
      ref={drag}
      className="main-graphic"
    >
      <Typography variant="subtitle1">{widget.config.title}</Typography>

      {widget.type !== "TextChart" && (
        <img
          className="graphic-img"
          src={widgetIcons[widget.type]}
          alt={widget.type}
        />
        )
      }

    </Paper>
  );
};

export default DraggableWidget;