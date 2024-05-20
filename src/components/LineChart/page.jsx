import React, { useEffect, useRef, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, YAxis } from 'recharts';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';

export const Graph = ({ data, isLive, autoGenerateY }) => {
  const [width, setWidth] = useState("0px");
  const [minY, setMinY] = useState(0);
  const [maxY, setMaxY] = useState(0);
  // Calculate the minimum and maximum y values
  const getMinY = (data) => Math.min(...data.map(item => parseFloat(item.y)));
  const getMaxY = (data) => Math.max(...data.map(item => parseFloat(item.y)));
  const downloadChart = () => {
    const chartContainer = document.querySelector('#chart-container'); // Replace with your container ID
    html2canvas(chartContainer).then((canvas) => {
      const blob = canvas.toBlob(function (blob) {
        saveAs(blob, "chart.png");
      });
    });
  };

  useEffect(() => {
    // console.log(data);
    setWidth((2 * data.length) + "px");
    if (!autoGenerateY) {
      let abs = Math.ceil(Math.max(getMaxY(data), Math.abs(getMinY(data))));
      setMaxY(abs + 10);
      setMinY(-abs - 10);
    } else {
      setMinY('auto');
      setMaxY('auto');
    }
    }, [data]);

  return (
    <>
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
          <ResponsiveContainer id='chart-container'>
            <LineChart data={data}>
              <YAxis domain={[minY, maxY]} />
              <CartesianGrid />
              <Line type="monotone" dataKey="y" stroke="#8884d8" isAnimationActive={false} dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {
        !isLive && <button id="download-chart" style={{
          width: "200px"
        }} onClick={downloadChart}>Download Chart</button>
      }
    </>
  );
};
