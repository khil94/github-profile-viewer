"use client";

import Mapper from "@/app/components/mapper";
import { dynamicColors } from "@/lib/utils";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface props {
  languageDistribution: Record<string, number>;
}
export default function LagnTab({ languageDistribution }: props) {
  const data: { name: string; value: number; color: string }[] = [];
  Object.entries(languageDistribution).forEach(([key, val]) => {
    data.push({
      name: key,
      value: Math.floor(val * 100),
      color: dynamicColors(),
    });
  });
  data.sort((a, b) => b.value - a.value);

  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">언어</h1>
      <div className="bg-primary-container rounded-2xl h-[500px] md:h-[600px] lg:h-[700px] p-4">
        <h3 className="text-xl font-semibold">언어 분포</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name} ${value}%`}
              outerRadius={"60%"}
              fill="#8884d8"
              dy={10}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  className="font-bold"
                  key={`cell-${index}`}
                  fill={entry.color}
                />
              ))}
            </Pie>
            <Tooltip
              wrapperClassName="rounded-2xl bg-inverse"
              labelClassName="text-on-inverse"
              formatter={(value) => `${value}% per Repository`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-primary-container rounded-2xl p-8">
        <h3 className="text-xl font-semibold mb-4">언어별 저장소</h3>
        <div className="space-y-4">
          <Mapper
            targetList={data}
            fallback={<></>}
            mapFunc={(lang, idx) => (
              <div key={`${lang}-${idx}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="text-on-primary-container font-medium">
                      {lang.name}
                    </span>
                  </div>
                  <span className="text-on-muted-primary">{lang.value}%</span>
                </div>
                <div className="w-full bg-muted-primary rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${lang.value}%`,
                      backgroundColor: lang.color,
                    }}
                  />
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}
