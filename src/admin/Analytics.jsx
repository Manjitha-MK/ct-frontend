import React from "react";
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const Analytics = ({ stats }) => {
    const pieData = [
        {
            name: "Wins",
            value: stats.totalWins || 0
        },
        {
            name: "Losses",
            value: stats.totalLosses || 0
        }
    ];

    const barData = [
        {
            name: "Players",
            value: stats.totalPlayers || 0
        },
        {
            name: "Matches",
            value: stats.totalMatches || 0
        },
        {
            name: "Wins",
            value: stats.totalWins || 0
        },
        {
            name: "Losses",
            value: stats.totalLosses || 0
        }
    ];

    const COLORS = ["#22c55e", "#ef4444"];

    return (
        <div className="mt-8 w-full">

            <h2 className="text-2xl font-bold mb-6">
                Team Analytics
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">

                {/* Pie Chart */}
                <div className="bg-white rounded-2xl shadow-lg p-6 w-full">
                    <h3 className="text-xl font-semibold mb-6">
                        Win vs Loss Analysis
                    </h3>

                    <ResponsiveContainer
                        width="100%"
                        height={350}
                        minWidth={300}
                    >
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={120}
                                label
                            >
                                {pieData.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div className="bg-white rounded-2xl shadow-lg p-6 w-full">
                    <h3 className="text-xl font-semibold mb-6">
                        Team Statistics
                    </h3>

                    <ResponsiveContainer
                        width="100%"
                        height={350}
                        minWidth={300}
                    >
                        <BarChart data={barData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />

                            <Bar
                                dataKey="value"
                                radius={[10, 10, 0, 0]}
                                fill="#3b82f6"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
};

export default Analytics;