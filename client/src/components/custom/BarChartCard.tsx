
import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

interface ChartData {
  schoolName: string;
  averageRating: number;
}

interface Props {
  title: string;
  endpoint: string;
}

const BarChartCard = ({ title, endpoint }: Props) => {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    axios.get(endpoint)
      .then(res => {
        const topFive = res.data
          .sort((a: ChartData, b: ChartData) => b.averageRating - a.averageRating)
          .slice(0, 5);
        setData(topFive);
      })
      .catch(err => console.error("Error fetching data:", err));
  }, [endpoint]);

  return (
    <div className="rounded-2xl shadow-md p-6 w-full bg-white">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="schoolName" />
          <YAxis />
          <Tooltip formatter={(value: number) => [`${value.toFixed(2)}`, "Average Rating"]} />
          <Bar dataKey="averageRating" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCard;