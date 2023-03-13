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
import { motion, Transition, Variants } from "framer-motion";

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

const variants: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
  },
}

const transition: Transition = {
  delay: .2,
}

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.round((time - hours * 3600) / 60);

  return `${hours ? `${hours} ч ` : ""}${minutes ? `${minutes} мин` : ""}`;
}

const StatsPage = () => {
  const [selectValue, setSelectValue] = useState(selectItems[0].value);
  const [activeBar, setActiveBar] = useState<number>(0);
  const { palette } = useTheme();
  const styles = useSxStyles().statsPage;

  const mockData = [
    {
      "weekDay": "Пн",
      time: selectValue === "This-week" ? 4400 : selectValue === "Last-week" ? 145 : selectValue === "Two-weeks-ago" ? 2500 : 0,
      "timeColor": palette.red.light!,
      value: "monday",
      label: "Понедельник",
    },
    {
      "weekDay": "Вт",
      time: selectValue === "This-week" ? 12000 : selectValue === "Last-week" ? 30 : selectValue === "Two-weeks-ago" ? 13500 : 0,
      "timeColor": palette.red.light!,
      value: "tuesday",
      label: "Вторник",
    },
    {
      "weekDay": "Ср",
      time: selectValue === "This-week" ? 1000 : selectValue === "Last-week" ? 120 : selectValue === "Two-weeks-ago" ? 4000 : 0,
      "timeColor": palette.red.light!,
      value: "wednesday",
      label: "Среда",
    },
    {
      "weekDay": "Чт",
      time: selectValue === "This-week" ? 11200 : selectValue === "Last-week" ? 35 : selectValue === "Two-weeks-ago" ? 12600 : 0,
      "timeColor": palette.red.light!,
      value: "thirsday",
      label: "Четверг",
    },
    {
      "weekDay": "Пт",
      time: selectValue === "This-week" ? 3500 : selectValue === "Last-week" ? 185 : selectValue === "Two-weeks-ago" ? 5400 : 0,
      "timeColor": palette.red.light!,
      value: "friday",
      label: "Пятница",
    },
    {
      "weekDay": "Сб",
      time: selectValue === "This-week" ? 12000 : selectValue === "Last-week" ? 30 : selectValue === "Two-weeks-ago" ? 13500 : 0,
      "timeColor": palette.red.light!,
      value: "saturday",
      label: "Суббота",
    },
    {
      "weekDay": "Вс",
      time: selectValue === "This-week" ? 4400 : selectValue === "Last-week" ? 145 : selectValue === "Two-weeks-ago" ? 2500 : 0,
      "timeColor": palette.red.light!,
      value: "sunday",
      label: "Воскресенье",
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
          <Box sx={sx(styles.statsCard, styles.weekDay)} component={motion.div} variants={variants} initial="initial" animate="animate" transition={transition}>
            <Typography sx={styles.weekDayTitle} variant="h3">
              {mockData[activeBar].label}
            </Typography>
            <Typography sx={styles.weekDayDescr}>
              {
                mockData[activeBar].time
                  ? <>
                    Вы работали над задачами в течение&nbsp;
                    <span>{formatTime(mockData[activeBar].time)}</span>
                  </>
                  : "Нет данных"
              }
            </Typography>
          </Box>
          <Box sx={sx(styles.statsCard, styles.chart)} component={motion.div} variants={variants} initial="initial" animate="animate" transition={transition}>
            <BarChart data={mockData} activeBar={activeBar} setActiveBar={setActiveBar} />
          </Box>
          <Box sx={sx(styles.statsCard, styles.tomatosCount)} component={motion.div} variants={variants} initial="initial" animate="animate" transition={transition}>
            <GenericIcon type={EIcons.smilingTomato} />
          </Box>

          <Box sx={sx(styles.statsCard, styles.focus)} component={motion.div} variants={variants} initial="initial" animate="animate" transition={transition}>
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
          <Box sx={sx(styles.statsCard, styles.pauseTime)} component={motion.div} variants={variants} initial="initial" animate="animate" transition={transition}>
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
          <Box sx={sx(styles.statsCard, styles.stops)} component={motion.div} variants={variants} initial="initial" animate="animate" transition={transition}>
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
