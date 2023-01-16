import { useState, useEffect } from "react";

import { CircularProgress } from "@mui/material";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";

import { ResponsiveContainer } from "recharts";

function CustomTooltip({ payload, label, active }) {
    if (active) {
        return (
            <div className="custom-tooltip bg-gray-100/80 rounded p-2 outline-none border-0">
                <p className="intro text-xs text-[#8884d8]">
                    Predicted: {payload[0].value}
                </p>
            </div>
        );
    }

    return null;
}

export default function PredictionChart({ data, device }) {
    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        if (!data) return;
        const gData = data
            .sort((a, b) => a.week.id - b.week.id)
            .map((e, i) => {
                return {
                    name: e.week.id.toString(),
                    predicted: e.amount,
                };
            });
        setGraphData(gData);
    }, [data]);

    if (!data.length)
        return (
            <div className="w-full flex justify-center overflow-x-auto">
                No Prediction Data Found
            </div>
        );

    return (
        <>
            <div className="w-full flex justify-center overflow-x-auto">
                <LineChart
                    width={1000}
                    height={350}
                    data={graphData}
                    margin={{ top: 0, right: 50, left: 0, bottom: 0 }}
                >
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis
                        dataKey="name"
                        style={{
                            fontSize: "0.65rem",
                        }}
                    />
                    <YAxis
                        style={{
                            fontSize: "0.85rem",
                        }}
                    />
                    <Tooltip
                        content={CustomTooltip}
                        wrapperStyle={{ outlineWidth: "0px" }}
                    />
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" />

                    <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="#82ca9d"
                    />
                </LineChart>
            </div>
        </>
    );
}
