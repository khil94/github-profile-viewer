"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface props {
  weekdayRatio: Record<string, number>;
  login: string;
}

export default function ContributionTab({ weekdayRatio, login }: props) {
  const activityByDay: { day: string; ratio: number }[] = [];
  Object.entries(weekdayRatio).forEach(([key, val]) => {
    activityByDay.push({
      day: key,
      ratio: Math.floor(val * 100),
    });
  });

  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">기여도</h1>
      <div className="rounded-2xl bg-primary-container p-6">
        <h3 className="text-xl font-semibold mb-8">활동</h3>
        <img
          className="w-full"
          src={`http://ghchart.rshah.org/${login}`}
          alt={`${login}'s Github chart`}
        />
      </div>
      <div className="rounded-2xl bg-primary-container p-6">
        <h3 className="text-xl font-semibold mb-8">요일별 활동</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={activityByDay}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
            <XAxis dataKey="day" stroke="#8b949e" />
            <YAxis stroke="#8b949e" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0d1117",
                border: "1px solid #30363d",
                borderRadius: "6px",
              }}
              formatter={(val, name) => <>{`${val}%`}</>}
            />
            <Bar dataKey="ratio" fill="#58a6ff" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
