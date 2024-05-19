import React, { useEffect, useRef, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, YAxis } from 'recharts';

export const Graph = ({ data }) => {
  const [width, setWidth] = useState("0px");
    // Calculate the minimum and maximum y values
    const getMinY = (data) => Math.min(...data.map(item => parseFloat(item.y)));
    const getMaxY = (data) => Math.max(...data.map(item => parseFloat(item.y)));
  
    const minY = getMinY(data);
    const maxY = getMaxY(data);
  useEffect(() => {
    // console.log(data);
     setWidth((2 * data.length) + "px");
    console.log(minY, maxY);
  }, [data]);

  return (
    <div
      style={{
        position: "relative",
        left: 0,
        width: "1000px",
        overflowX: "scroll",
        overflowY: "hidden",
      }}
    >
      <div
        style={{
          position: 'relative',
          width: width, // Ensure the parent container has a width
          height: '300px' // Ensure the parent container has a height
        }}
      >
        <ResponsiveContainer>
          <LineChart data={data}>
          <YAxis domain={[minY - 10, maxY + 10]} /> 
            <CartesianGrid />
            <Line type="monotone" dataKey="y" stroke="#8884d8" isAnimationActive={false} dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
