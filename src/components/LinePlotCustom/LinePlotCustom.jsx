import * as d3 from "d3";
import './LinePlot.css';
import {useState} from "react";

export const LinePlotCustom =
  ({
     data,
     width = 620,
     height = 300,
   }) => {
    const getY = d3.scaleLinear()
      .domain([0, 40])
      .range([300, 0]);

    const getX = d3.scaleBand()
      .domain(['Jan', 'Feb', 'Mar', 'Apr', 'May'])
      .range([0, 600]);

    const getYAxis = ref => {
      const yAxis = d3.axisLeft(getY)
        .tickSize(-600)
        .tickPadding(7);
      d3.select(ref).call(yAxis);
    };

    const getXAxis = ref => {
      const xAxis = d3.axisBottom(getX);
      d3.select(ref).call(xAxis);
    };

    const linePath = d3
      .line()
      .x(d => getX(d.name) + getX.bandwidth() / 2)
      .y(d => getY(d.value))
      .curve(d3.curveMonotoneX)(data);

    const areaPath = d3.area()
      .x(d => getX(d.name) + getX.bandwidth() / 2)
      .y0(d => getY(d.value))
      .y1(() => getY(0))
      .curve(d3.curveMonotoneX)(data);

    const [activeIndex, setActiveIndex] = useState(null);

    const handleMouseMove = (e) => {
      const x = e.nativeEvent.offsetX;
      const index = Math.floor(x / getX.step());
      setActiveIndex(index);
    };

    const handleMouseLeave = () => {
      setActiveIndex(null);
    };

    const margin = { top: 30, right: 20, bottom: 30, left: 20 };

    return (
      <svg
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <g transform={`translate(${margin.left},${margin.top})`}>
          <g
            className="axis"
            ref={getYAxis}
          />
          <g
            className="axis xAxis"
            ref={getXAxis}
            transform={`translate(0,${getY(0)})`}
          />
          <path
            strokeWidth={3}
            fill="none"
            stroke="#7cb5ec"
            d={linePath}
          />
          <path
            fill="#7cb5ec"
            d={areaPath}
            opacity={0.2}
          />
          {data.map((item, index) => {
            return (
              <g key={index}>
                <circle
                  cx={getX(item.name) + getX.bandwidth() / 2}
                  cy={getY(item.value)}
                  r={index === activeIndex ? 6 : 4}
                  fill="#7cb5ec"
                  strokeWidth={index === activeIndex ? 2 : 0}
                  stroke="#fff"
                  style={{transition: `ease-out .1s`}}
                />
                <text
                  fill="#666"
                  x={getX(item.name) + getX.bandwidth() / 2}
                  y={getY(item.value) - 10}
                  textAnchor="middle"
                >
                  {item.value}
                </text>
              </g>
            );
          })}
        </g>

      </svg>
    );
  };