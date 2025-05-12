"use client";

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import styles from "./bar-chart-component.module.css";

const COLORS = ["#DE1A1A", "#FFC405"];

export default function BarChartComponent({ data }) {

  const dataFiltrada = data.filter(dado => dado.value !== 0);

  return (
    <div className={styles.chartWrapper}>
      <h3 className={styles.title}>Nota Média por Gênero</h3>
      <h4 className={styles.subtitle}>Dados relativos aos 250 filmes mais bem avaliados</h4>
      <ResponsiveContainer width={1000} height={300}>
        <BarChart data={dataFiltrada}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444444" />
          <XAxis
            dataKey="name"
            tick={{ fill: "#ffffff", fontSize: 12 }}
            interval={0}
            angle={-15}
            height={60}
          />
          <YAxis
            domain={[7.5, 8.5]}
            tick={{ fill: "#ffffff", fontSize: 12 }}
            tickCount={6}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: 8,
              border: "1px solid #444444",
              color: "#000000",
            }}
            formatter={(value) => [`${value}`, "Nota Média"]}
          />
          <Bar dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className={styles.subtitle}>*Categorias sem filmes não aparecem no gráfico</p>
    </div >
  );
}