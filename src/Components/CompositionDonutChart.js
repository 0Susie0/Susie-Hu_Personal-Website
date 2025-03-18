import React, { useState } from 'react';
import { PieChart, Pie, Sector, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// Define talent categories and their values
const data = [
  { name: 'Piano Playing', value: 25, icon: '🎹' },
  { name: 'Vocal Performance', value: 20, icon: '🎤' },
  { name: 'Table Tennis Enthusiast', value: 15, icon: '🏓' },
  { name: 'English-Chinese Bilingual', value: 10, icon: '🌐' },
  { name: 'Christian', value: 30, icon: '✝️' },];

// Focused blue palette for lake theme
const COLORS = [
  "#1a6fc7", // Medium blue
  "#4d94db", // Blue
  "#6c9dc6", // Light blue
  "#add8e6", // Light sky blue
  "#104c91"  // Deep blue
];

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, name, payload } = props;
  
  return (
    <g>
      <text x={cx} y={cy - 5} dy={8} textAnchor="middle" fill={fill} fontSize={16} fontWeight="bold" textShadow="0 1px 1px rgba(0,0,0,0.2)">
        {name}
      </text>
      <text x={cx} y={cy + 20} textAnchor="middle" fill="#104c91" fontSize={14}>
        {payload.icon}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius + 3}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        strokeWidth={0}
        strokeOpacity={0}
        opacity={0.9}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 2}
        outerRadius={innerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.7}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius}
        outerRadius={outerRadius + 2}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.7}
      />
    </g>
  );
};

// Custom tooltip content
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.9)', 
        padding: '10px 15px', 
        border: 'none',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)',
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          marginBottom: '5px'
        }}>
          <span style={{ fontSize: '18px' }}>{data.icon}</span>
          <span style={{ 
            fontWeight: '600', 
            color: '#104c91',
            fontSize: '14px'
          }}>
            {data.name}
          </span>
        </div>
        <div style={{ 
          fontSize: '13px',
          color: '#4d94db',
        }}>
          Proficiency: <span style={{ fontWeight: 'bold' }}>{data.value}%</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function CompositionDonutChart() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div style={{ width: '100%', height: 380, position: 'relative' }}>
      <div style={{ 
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        pointerEvents: 'none'
      }}>
        {activeIndex === null && (
          <>
            
          </>
        )}
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart style={{ overflow: 'visible' }}>
          <defs>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1" />
            </filter>
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={85}
            outerRadius={115}
            dataKey="value"
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            onClick={(_, index) => setActiveIndex(index === activeIndex ? null : index)}
            paddingAngle={2}
            cornerRadius={3}
            filter="url(#shadow)"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                strokeWidth={0}
                opacity={0.85}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: 'none' }} />
        </PieChart>
      </ResponsiveContainer>
      
      <style jsx="true">{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
