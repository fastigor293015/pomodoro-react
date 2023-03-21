import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { Box, Typography, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import sx from "mui-sx";
import useSxStyles from "../../hooks/useSxStyles";
import { motion } from "framer-motion";
import type { Transition, Variants } from "framer-motion";
import Container from "../../components/Container";
import Header from "../../components/Header";
import Select from "../../components/Select";
import BarChart from "../../components/BarChart";
import { GenericIcon, EIcons } from "../../components/GenericIcon";

const selectItems = [
  {
    label: "Эта неделя",
    value: 2,
  },
  {
    label: "Прошедшая неделя",
    value: 1,
  },
  {
    label: "2 недели назад",
    value: 0,
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

const transition = (index: number = 1): Transition => ({
  delay: .2 * index,
})

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = time >= 3600 ? Math.round((time - hours * 3600) / 60) : Math.floor((time - hours * 3600) / 60);

  return (time >= 3600)
    ? `${hours ? `${hours} ч ` : ""}${minutes ? `${minutes} мин` : ""}`
    : `${minutes ? `${minutes} мин ` : ""}${time - minutes * 60} с`;
}

const formatPauseTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = time >= 3600 ? Math.round((time - hours * 3600) / 60) : Math.floor((time - hours * 3600) / 60);

  return (time >= 3600)
    ? `${hours ? `${hours}ч ` : ""}${minutes ? `${minutes}м` : ""}`
    : `${minutes ? `${minutes}м ` : ""}${time - minutes * 60}с`;
}

const formatTomatoLabel = (count: number, label: string = "помидор") => {
  let ending: string;
  const lastFirstDigit = count % 10;
  const lastSecondDigit = count % 100;

  if (lastFirstDigit === 1 && lastSecondDigit !== 11) {
    ending = "";
  } else if ((lastFirstDigit === 2 && lastSecondDigit !== 12) || (lastFirstDigit === 3 && lastSecondDigit !== 13) || (lastFirstDigit === 4 && lastSecondDigit !== 14)) {
    ending = "а";
  } else {
    ending = "ов";
  }

  return label + ending;
}

const StatsPage = () => {
  const stats = useAppSelector(state => state.stats);
  const [selectValue, setSelectValue] = useState(selectItems[0].value);
  const [activeBar, setActiveBar] = useState<number>(stats.weekDayIndex);
  const curDay = stats.statsData.length !== 0 ? stats.statsData[selectValue][activeBar] : null;
  const styles = useSxStyles().statsPage;

  const handleChange = (e: SelectChangeEvent<unknown>) => {
    setSelectValue(e.target.value as number);
  }

  return (stats.statsData.length === 0)
    ? null
    : (
        <>
          <Header />
          <Container>
            <Box sx={styles.top} component={motion.div} variants={variants} initial="initial" animate="animate" transition={transition(1)}>
              <Typography sx={styles.title} variant="h3">
                Ваша активность
              </Typography>
              <Box sx={styles.weeksSelectWrapper}>
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
            </Box>

            <Box sx={styles.content}>
              <Box sx={sx(styles.statsCard, styles.weekDay)} key={`time-${curDay?.weekDay}-${curDay?.time}`} component={motion.div} variants={variants} initial="initial" animate="animate" transition={transition(2)}>
                <Typography sx={sx(styles.statsCardTitle, styles.weekDayTitle)} variant="h3">
                  {curDay?.weekDay}
                </Typography>
                <Typography sx={styles.weekDayDescr}>
                  {
                    curDay?.time
                      ? <>
                        Вы работали над задачами в течение&nbsp;
                        <span>{formatTime(curDay?.time)}</span>
                      </>
                      : "Нет данных"
                  }
                </Typography>
              </Box>
              <Box sx={sx(styles.statsCard, styles.chart)} component={motion.div} variants={variants} initial="initial" animate="animate" transition={transition(3)}>
                <BarChart data={stats.statsData[selectValue]} activeBar={activeBar} setActiveBar={setActiveBar} />
              </Box>
              <Box sx={sx(styles.statsCard, styles.tomatosCount)} key={`tomatos-${curDay?.tomatosCount}`} component={motion.div} variants={variants} initial="initial" animate="animate" transition={transition(4)}>
                {curDay?.tomatosCount
                  ? (
                    <>
                      <Box sx={styles.tomatosCountTop}>
                        <GenericIcon type={EIcons.tomato} width="80" height="80" />
                        <span>x {curDay?.tomatosCount}</span>
                      </Box>
                      <Box sx={styles.tomatosCountBottom}>
                        {curDay?.tomatosCount} {formatTomatoLabel(curDay?.tomatosCount)}
                      </Box>
                    </>
                  )
                  : <GenericIcon type={EIcons.smilingTomato} />}
              </Box>

              <Box sx={sx(styles.statsCard, styles.focus)} key={`focus-${curDay?.pauseTime}`} component={motion.div} variants={variants} initial="initial" animate="animate" transition={transition(5)}>
                <Box sx={styles.focusText}>
                  <Typography sx={sx(styles.statsCardTitle, styles.focusTitle)} variant="h3">
                    Фокус
                  </Typography>
                  <Typography sx={styles.focusDescr}>
                    {(curDay?.pauseTime && curDay?.pauseTime) ? Math.round(curDay.time / (curDay.time + curDay.pauseTime) * 100) : 0}%
                  </Typography>
                </Box>
                <GenericIcon type={EIcons.target} />
              </Box>
              <Box sx={sx(styles.statsCard, styles.pauseTime)} key={`pause-${curDay?.pauseTime}`} component={motion.div} variants={variants} initial="initial" animate="animate" transition={transition(6)}>
                <Box sx={styles.pauseTimeText}>
                  <Typography sx={sx(styles.statsCardTitle, styles.pauseTimeTitle)} variant="h3">
                    Время на паузе
                  </Typography>
                  <Typography sx={styles.pauseTimeDescr}>
                    {formatPauseTime(curDay!.pauseTime)}
                  </Typography>
                </Box>
                <GenericIcon type={EIcons.clock} />
              </Box>
              <Box sx={sx(styles.statsCard, styles.stops)} key={`stops-${curDay?.stopsCount}`} component={motion.div} variants={variants} initial="initial" animate="animate" transition={transition(7)}>
                <Box sx={styles.stopsText}>
                  <Typography sx={sx(styles.statsCardTitle, styles.stopsTitle)} variant="h3">
                    Остановки
                  </Typography>
                  <Typography sx={styles.stopsDescr}>
                    {curDay?.stopsCount}
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
