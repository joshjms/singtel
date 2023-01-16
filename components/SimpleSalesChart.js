import { useState, useEffect } from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";

import axios from "axios";

function CustomTooltip({ payload, label, active }) {
    if (active) {
        return (
            <div className="custom-tooltip bg-gray-100/75 p-2 outline-none border-0">
                <p className="intro text-xs text-gray-600">
                    {payload[0].value}
                </p>
            </div>
        );
    }

    return null;
}

export default function SimpleSalesChart() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getSales = async () => {
            await axios
                .get(process.env.NEXT_PUBLIC_API_BASE_URL + "device/sales/", {
                    params: {
                        device: "iPhone 13",
                    },
                })
                .then((response) => {
                    const data = response.data;
                    const sales = data.sales.slice(-5);

                    const graphData = sales.map((e, i) => {
                        return {
                            name: "Week " + e.week.id.toString(),
                            sales: e.amount,
                        };
                    });

                    setData(graphData);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getSales();
    }, []);

    if (!data) return <p>Loading data...</p>;

    return (
        <>
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{ top: 0, right: 50, left: 0, bottom: 0 }}
            >
                <XAxis
                    dataKey="name"
                    style={{
                        fontSize: "0.85rem",
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
            </LineChart>
        </>
    );
}
