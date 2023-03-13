import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import type { BarDatum } from "@nivo/bar/dist/types/types";
import type { Theme } from "@nivo/core";
import { BarChart as RechartsBarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface IBarChart {
  data: BarDatum[];
}

const formatTime = (time: number) => {
  const hours = Math.floor(time / 60);

  return `${hours ? `${hours} ч ` : ""}${time ? `${time - hours * 60} мин` : ""}`;
}

const BarChart = ({ data }: IBarChart) => {
  const { palette } = useTheme();

  const barTheme: Theme = {
    background: "transparent",
    textColor: "#333333",
    fontSize: 12,
    fontFamily: "SFUIDisplay, sans-serif",
    axis: {
      domain: {
        // line: {
        //   stroke: "#777777",
        //   strokeWidth: 1,
        // },
      },
      ticks: {
        line: {
          strokeWidth: 0,
        },
        text: {
          fontSize: 12,
          fill: "#333333",
        },
      },
    },
    grid: {
      line: {
        stroke: "#dddddd",
        strokeWidth: 1,
      },
    },
    annotations: {
      text: {
        fontSize: 13,
        fill: "#333333",
        outlineWidth: 2,
        outlineColor: "#ffffff",
        outlineOpacity: 1,
      },
      link: {
        stroke: "#000000",
        strokeWidth: 1,
        outlineWidth: 2,
        outlineColor: "#ffffff",
        outlineOpacity: 1,
      },
      outline: {
        stroke: "#000000",
        strokeWidth: 2,
        outlineWidth: 2,
        outlineColor: "#ffffff",
        outlineOpacity: 1,
      },
      symbol: {
        fill: "#000000",
        outlineWidth: 2,
        outlineColor: "#ffffff",
        outlineOpacity: 1,
      },
    },
    tooltip: {
      container: {
        background: "#ffffff",
        color: "#333333",
        fontSize: 12,
      },
      basic: {},
      chip: {},
      table: {},
      tableCell: {},
      tableCellValue: {},
    },
  };

  // return (
  //   <ResponsiveBar
  //     data={data}
  //     keys={[
  //       "time",
  //     ]}
  //     indexBy="weekDay"
  //     margin={{ top: 45, right: 70, bottom: 35, left: 0 }}
  //     padding={0.25}
  //     valueScale={{ type: 'linear' }}
  //     indexScale={{ type: 'band', round: true }}
  //     valueFormat=" >-"
  //     theme={barTheme}
  //     // colors={{ scheme: 'nivo' }}
  //     axisTop={null}
  //     axisRight={{
  //         tickSize: 0,
  //         tickPadding: 20,
  //         tickRotation: 0,
  //         legend: '',
  //         legendOffset: 0
  //     }}
  //     axisBottom={{
  //         tickSize: 5,
  //         tickPadding: 5,
  //         tickRotation: 0,
  //     }}
  //     axisLeft={null}
  //     enableLabel={false}
  //     legends={[]}
  //     role="application"
  //     ariaLabel="График вашей активности"
  //     barAriaLabel={function(e) {
  //       return e.id + ": " + e.formattedValue + " in country: " + e.indexValue
  //     }}
  //     onClick={(e) => console.log(e)}
  //   />
  // )

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 45,
          right: 65,
          left: 0,
          bottom: 5,
        }}
        barCategoryGap="10%"
      >
        <CartesianGrid vertical={false} />
        <XAxis axisLine={false} tickLine={false} dataKey="weekDay" padding={{
          left: 40,
          right: 40,
        }} />
        <YAxis tick={{ width: 80 }} axisLine={false} tickLine={false} orientation="right" tickFormatter={(value, i) => formatTime(value)} minTickGap={25} tickMargin={25} />
        <Tooltip animationEasing="ease-in-out" />
        <Bar dataKey="time" fill={palette.red.light} onClick={(e) => console.log(e)} />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

export default BarChart;
