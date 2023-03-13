import { Box, Typography, MenuItem, useTheme } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import sx from "mui-sx";
import { useState } from "react";
import Container from "../../components/Container";
import Header from "../../components/Header";
import useSxStyles from "../../hooks/useSxStyles";
import Select from "../../components/Select";
import { GenericIcon, EIcons } from "../../components/GenericIcon";
import BarChart from "../../components/BarChart";
import { BarDatum } from "@nivo/bar/dist/types/types";

const selectItems = [
  {
    label: "Эта неделя",
    value: "This-week",
  },
  {
    label: "Прошедшая неделя",
    value: "Last-week",
  },
  {
    label: "2 недели назад",
    value: "Two-weeks-ago",
  },
];

const StatsPage = () => {
  const [selectValue, setSelectValue] = useState(selectItems[0].value);
  const { palette } = useTheme();
  const styles = useSxStyles().statsPage;

  const mockData: BarDatum[] = [
    {
      "weekDay": "Пн",
      time: selectValue === "This-week" ? 44 : selectValue === "Last-week" ? 145 : selectValue === "Two-weeks-ago" ? 25 : 0,
      "timeColor": palette.red.light!,
      value: "monday",
    },
    {
      "weekDay": "Вт",
      time: selectValue === "This-week" ? 120 : selectValue === "Last-week" ? 30 : selectValue === "Two-weeks-ago" ? 135 : 0,
      "timeColor": palette.red.light!,
      value: "tuesday",
    },
    {
      "weekDay": "Ср",
      time: selectValue === "This-week" ? 10 : selectValue === "Last-week" ? 120 : selectValue === "Two-weeks-ago" ? 40 : 0,
      "timeColor": palette.red.light!,
      value: "wednesday",
    },
    {
      "weekDay": "Чт",
      time: selectValue === "This-week" ? 112 : selectValue === "Last-week" ? 35 : selectValue === "Two-weeks-ago" ? 126 : 0,
      "timeColor": palette.red.light!,
      value: "thirsday",
    },
    {
      "weekDay": "Пт",
      time: selectValue === "This-week" ? 35 : selectValue === "Last-week" ? 185 : selectValue === "Two-weeks-ago" ? 54 : 0,
      "timeColor": palette.red.light!,
      value: "friday",
    },
    {
      "weekDay": "Сб",
      time: selectValue === "This-week" ? 120 : selectValue === "Last-week" ? 30 : selectValue === "Two-weeks-ago" ? 135 : 0,
      "timeColor": palette.red.light!,
      value: "saturday",
    },
    {
      "weekDay": "Вс",
      time: selectValue === "This-week" ? 44 : selectValue === "Last-week" ? 145 : selectValue === "Two-weeks-ago" ? 25 : 0,
      "timeColor": palette.red.light!,
      value: "sunday",
    },
  ]

  const handleChange = (e: SelectChangeEvent<unknown>) => {
    setSelectValue(e.target.value as string);
  }

  return (
    <>
      <Header />
      <Container>
        <Box sx={styles.top}>
          <Typography variant="h3">
            Ваша активность
          </Typography>
          <Select
            value={selectValue}
            onChange={handleChange}
          >
            {selectItems.map((item, index) => (
              <MenuItem
                key={item.value}
                autoFocus={index === selectItems.findIndex(item => item.value !== selectValue)}
                value={item.value}
                disabled={item.value === selectValue}
              >
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={styles.content}>
          <Box sx={sx(styles.statsCard, styles.weekDay)}>
            <Typography sx={styles.weekDayTitle} variant="h3">
              Суббота
            </Typography>
            <Typography sx={styles.weekDayDescr}>
              Нет данных
            </Typography>
          </Box>
          <Box sx={sx(styles.statsCard, styles.chart)}>
            <BarChart data={mockData} />
          </Box>
          <Box sx={sx(styles.statsCard, styles.tomatosCount)}>
            <GenericIcon type={EIcons.smilingTomato} />
          </Box>

          <Box sx={sx(styles.statsCard, styles.focus)}>
            <Box sx={styles.focusText}>
              <Typography sx={styles.focusTitle} variant="h3">
                Фокус
              </Typography>
              <Typography sx={styles.focusDescr}>
                0%
              </Typography>
            </Box>
            <GenericIcon type={EIcons.target} />
          </Box>
          <Box sx={sx(styles.statsCard, styles.pauseTime)}>
            <Box sx={styles.pauseTimeText}>
              <Typography sx={styles.pauseTimeTitle} variant="h3">
                Время на паузе
              </Typography>
              <Typography sx={styles.pauseTimeDescr}>
                0м
              </Typography>
            </Box>
            <GenericIcon type={EIcons.clock} />
          </Box>
          <Box sx={sx(styles.statsCard, styles.stops)}>
            <Box sx={styles.stopsText}>
              <Typography sx={styles.stopsTitle} variant="h3">
                Остановки
              </Typography>
              <Typography sx={styles.stopsDescr}>
                0
              </Typography>
            </Box>
            <GenericIcon type={EIcons.stop} />
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default StatsPage;
