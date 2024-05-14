import React, { useEffect, useState, useRef } from 'react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';

export const Graph = ({setSerialData}) => {

    class LineBreakTransformer {
        constructor() {
            this.container = '';
        }

        transform(chunk, controller) {
            this.container += chunk;
            const lines = this.container.split('\r\n');
            this.container = lines.pop();
            lines.forEach(line => controller.enqueue(line));
        }

        flush(controller) {
            controller.enqueue(this.container);
        }
    }

    const [data, setData] = useState([]);
    const needToStopRef = useRef(false); // Using a ref instead of state
    const stopSerial = () => {
        needToStopRef.current = true; // Update ref value
    }

    const handleSerialData = (newData) => {
        setData(prev => {
            if (prev.length >= 500) {
                prev.shift();
            }
            return [
                ...prev,
                {
                    y: parseFloat(newData)
                }
            ];
        });
    }

    useEffect(() => {
        const fetchDataFromSerialPort = async () => {
            const filters = [
                { usbVendorId: 0x2341, usbProductId: 0x0043 },
                { usbVendorId: 0x2341, usbProductId: 0x0001 },
            ];
            try {
                const port = await navigator.serial.requestPort({ filters });
                if (!port) {
                    console.error('No port selected by the user.');
                    return;
                }
                await port.open({ baudRate: 115200 });

                while (port.readable) {
                    const reader = port.readable
                        .pipeThrough(new TextDecoderStream())
                        .pipeThrough(new TransformStream(new LineBreakTransformer()))
                        .getReader();
                    
                    try {
                        while (!needToStopRef.current) { // Check ref value
                            const { value, done } = await reader.read();
                            if (done) {
                                reader.releaseLock();
                                await port.close();
                                break;
                            }
                            handleSerialData(value);
                            setSerialData && setSerialData(prev => [...prev, value]);
                        }
                    } catch (error) {
                        console.log(error)
                    } finally {
                        reader.releaseLock();
                        await port.close();
                    }
                }
            } catch (error) {
                console.error('Error reading from serial port:', error);
            }
        };

        fetchDataFromSerialPort();

    }, []);

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
        <button onClick={stopSerial}>
            Stop
        </button>
        </div>
      </div>
    );
};
