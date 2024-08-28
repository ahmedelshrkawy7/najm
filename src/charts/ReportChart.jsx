/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CustomLegend from "../charts/CustomLegend"; // Import the custom legend component

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ReportChart = ({ data }) => {
  const processData = (reports) => {
    const classifications = {};

    reports.forEach((report) => {
      const monthIndex = new Date(report.date).getMonth();
      const monthName = months[monthIndex];
      const classification = report.report_classification?.name || "Unknown";

      if (!classifications[classification]) {
        classifications[classification] = Array(12).fill(0);
      }
      classifications[classification][monthIndex]++;
    });

    const chartData = months.map((month, index) => {
      const dataEntry = { month };
      Object.keys(classifications).forEach((classification) => {
        dataEntry[classification] = classifications[classification][index];
      });
      return dataEntry;
    });

    return chartData;
  };

  const chartData = data?.data?.reports ? processData(data.data.reports) : [];

  const maxYValue = Math.max(
    ...chartData.flatMap((entry) =>
      Object.values(entry).filter((value) => typeof value === "number")
    ),
    0
  );

  return (
    <div className="flex items-start border border-gray-300 rounded-lg relative mb-2 py-2">
      <div style={{ flex: 1 }}>
        <ResponsiveContainer
          width="100%"
          height={350}
          className={"!w-full md:!w-3/4 mr-auto"}
        >
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis
              domain={[0, maxYValue]}
              tickFormatter={(value) => value}
              ticks={Array.from({ length: maxYValue + 1 }, (_, i) => i)}
            />
            <Tooltip />
            {/* <Legend content={<CustomLegend />} /> Use the custom legend */}
            {Object.keys(chartData[0] || {})
              .filter((key) => key !== "month")
              .map((classification) => (
                <Line
                  key={classification}
                  type="monotone"
                  dataKey={classification}
                  stroke={`#${Math.floor(Math.random() * 16777215).toString(
                    16
                  )}`}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{ flexShrink: 0 }}>
        <CustomLegend
          payload={Object.keys(chartData[0] || {})
            .filter((key) => key !== "month")
            .map((classification) => ({
              value: classification,
              color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            }))}
        />
      </div>
    </div>
  );
};

export default ReportChart;
