import React, { useEffect, useState, useRef } from 'react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';

export const Graph = ({data}) => {

    return (
        <div
        style={{
          position: "relative",
          left: 0,
          width: "1000px",
          overflowX: "auto",
          paddingBottom: "250px",
        }}
      >
        <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
            <LineChart width={500} height={100} data={data} >
                <Line type="monotone" dataKey="y" stroke="#8884d8" isAnimationActive={false} dot={false} strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
        </div>
      </div>
    );
};
