"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import styles from "./pie-chart-component.module.css"

export default function PieChartComponent({ data }) {

  const COLORS = ["#DE1A1A", "#FFC405"];

  return (
    <div className={styles.chartWrapper}>
      <h3 className={styles.title}>Filmes: Em alta x Não em alta</h3>
      <h2 className={styles.subtitle}>Os dados são relativos aos 250 filmes melhores avaliados</h2>
      <ResponsiveContainer width={700} height={250}>
        <PieChart>
          <Tooltip
            contentStyle={{ borderRadius: '10px', backgroundColor: '#f9f9f9', border: '1px solid #ddd' }}
            formatter={(value, name) => [`${value}`, name]}
          />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}
            outerRadius={80}
            dataKey="value"
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}