import { useState } from "react";
import { useTheme } from "@mui/material";
import { BarChart as RechartsBarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Text } from 'recharts';
import { IWeekDayData } from "../features/stats/statsSlice";

interface ICustomTick {
  className: string;
  fill: string;
  height: number;
  index: number;
  orientation: string;
  payload: {
    coordinate: number;
    index: number;
    isShow: boolean;
    offset: number;
    tickCoord: number;
    value: string;
  };
  stroke: string;
  textAnchor: "inherit" | "middle" | "end" | "start" | undefined;
  verticalAnchor: string;
  visibleTicksCount: number;
  width: number;
  x: number;
  y: number;
}

const CustomTick = ({ tickObj, activeBar, setActiveBar }: { tickObj: ICustomTick, activeBar: number, setActiveBar: React.Dispatch<React.SetStateAction<number>> }) => {
  const { x, y, payload, textAnchor } = tickObj;
  const { palette } = useTheme();

  return (
    <Text
      x={x}
      y={y}
      dy={16}
      fontSize="24px"
      textAnchor={textAnchor}
      cursor="pointer"
      fill={payload.index === activeBar ? palette.red.medium : palette.gray[99]}
      onClick={() => setActiveBar(payload.index)}>
      {payload.value}
    </Text>
  )
}


interface IBarChart {
  data: IWeekDayData[];
  activeBar: number;
  setActiveBar: React.Dispatch<React.SetStateAction<number>>;
}

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = time >= 3600 ? Math.round((time - hours * 3600) / 60) : Math.floor((time - hours * 3600) / 60);

  return (time === 0)
    ? ""
    : (time >= 3600)
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
          tick={(tickObj) => <CustomTick tickObj={tickObj} activeBar={activeBar} setActiveBar={setActiveBar} />}
          // tick={{
          //   fontSize: "24px",
          //   fill: palette.gray[99],
          // }}
          tickSize={10}
          padding={{
            left: 40,
            right: 40,
          }}
        />
        <YAxis tick={{ width: 80, fontSize: "12px", }} axisLine={false} tickLine={false} orientation="right" tickFormatter={formatTime} minTickGap={25} tickMargin={25} />
        <Tooltip cursor={{ fill: "transparent" }} wrapperStyle={{ display: "none" }} />
        <Bar dataKey="time" minPointSize={5} onClick={(e) => console.log(e)} animationEasing="ease-in-out">
        {data.map((entry, index) => (
          <Cell
            key={`${index}`}
            fill={entry.time === 0 ? palette.gray.C4 : activeBar === index ? palette.red.medium : hoveredBar === index ? palette.red.main : palette.red.light}
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
