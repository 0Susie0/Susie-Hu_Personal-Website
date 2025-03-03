import React, { useState } from 'react';
import { PieChart, Pie, Sector, Cell, Tooltip} from 'recharts';

// Define composition categories and values
const data = [
  { name: 'Singer', value: 20 },
  { name: 'Keyboardist', value: 25 },
  { name: 'Table Tennis Lover', value: 15 },
  { name: 'Bilingual', value: 10 },
  { name: 'Christian', value: 30 },
];

const COLORS = ["#394563", "#3F5B85", "#5C81AA", "#5E8EB4", "#8ABAD0"];

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, name } = props;
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize={16} fontWeight="bold">
        {name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius + 5} // Adjusted to prevent excessive enlargement
        outerRadius={outerRadius + 5}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export default function CompositionDonutChart() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <PieChart width={350} height={350} style={{ overflow: 'visible' }}> {/* Adjusted size for better fit */}
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={80} // Adjusted for better proportion
        outerRadius={115} // Adjusted to prevent excessive thickness
        dataKey="value"
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        onMouseEnter={(data, index) => setActiveIndex(index)}
        onMouseLeave={() => setActiveIndex(null)}
        paddingAngle={2} // Slight padding to improve visual separation
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="" strokeWidth={1} />
        ))}
      </Pie>
      <Tooltip wrapperStyle={{ fontSize: '14px' }} />
      
    </PieChart>
  );
}
