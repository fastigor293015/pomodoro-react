import { useState } from "react";
import { useTheme } from "@mui/material";
import { BarChart as RechartsBarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { IWeekDayData } from "../features/stats/statsSlice";

interface IBarChart {
  data: IWeekDayData[];
  activeBar: number;
  setActiveBar: React.Dispatch<React.SetStateAction<number>>;
}

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = time >= 3600 ? Math.round((time - hours * 3600) / 60) : Math.floor((time - hours * 3600) / 60);

  return (time >= 3600)
    ? `${hours ? `${hours} ч ` : ""}${minutes ? `${minutes} мин` : ""}`
    : `${minutes ? `${minutes} мин ` : ""}${time - minutes * 60} с`;
}

const BarChart = ({ data, activeBar, setActiveBar }: IBarChart) => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const { palette } = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={data}
        width={500}
        height={300}
        margin={{
          top: 45,
          right: 60,
          left: 0,
          bottom: 16,
        }}
        barCategoryGap="13%"
        onMouseMove={state => {
          if (state.isTooltipActive) {
            setHoveredBar(state.activeTooltipIndex!);
          } else {
            setHoveredBar(null);
          }
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="weekDayLabel"
          axisLine={false}
          tickLine={false}
          tick={{
            fontSize: "24px",
            fill: palette.gray[99],
          }}
          tickSize={10}
          padding={{
            left: 40,
            right: 40,
          }}
        />
        <YAxis tick={{ width: 80, fontSize: "12px", }} axisLine={false} tickLine={false} orientation="right" tickFormatter={formatTime} minTickGap={25} tickMargin={25} />
        <Tooltip cursor={{ fill: "transparent" }} wrapperStyle={{ display: "none" }} animationEasing="ease-in-out" />
        <Bar dataKey="time" onClick={(e) => console.log(e)}>
        {data.map((entry, index) => (
          <Cell
            key={`${index}`}
            fill={activeBar === index ? palette.red.medium : hoveredBar === index ? palette.red.main : palette.red.light}
            cursor="pointer"
            style={{
              transition: "fill .2s ease-in-out",
            }}
            onClick={() => setActiveBar(index)}
          />
        ))}
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

export default BarChart;
