import { useState } from "react";
import { Box, Typography, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import sx from "mui-sx";
import useSxStyles from "../../hooks/useSxStyles";
import { motion } from "framer-motion";
import type { Transition, Variants } from "framer-motion";
import Container from "../../components/Container";
import Header from "../../components/Header";
import Select from "../../components/Select";
import { GenericIcon, EIcons } from "../../components/GenericIcon";
import BarChart from "../../components/BarChart";
import { useAppSelector } from "../../app/hooks";

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

const transition: Transition = {
  delay: .2,
}

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

const StatsPage = () => {
  const stats = useAppSelector(state => state.stats);
  const [selectValue, setSelectValue] = useState(selectItems[0].value);
  const [activeBar, setActiveBar] = useState<number>(stats.weekDayIndex);
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
                  {stats.statsData[selectValue][activeBar].label}
                </Typography>
                <Typography sx={styles.weekDayDescr}>
                  {
                    stats.statsData[selectValue][activeBar].time
                      ? <>
                        Вы работали над задачами в течение&nbsp;
                        <span>{formatTime(stats.statsData[selectValue][activeBar].time)}</span>
                      </>
                      : "Нет данных"
                  }
                </Typography>
              </Box>
              <Box sx={sx(styles.statsCard, styles.chart)} component={motion.div} variants={variants} initial="initial" animate="animate" transition={transition}>
                <BarChart data={stats.statsData[selectValue]} activeBar={activeBar} setActiveBar={setActiveBar} />
              </Box>
              <Box sx={sx(styles.statsCard, styles.tomatosCount)} component={motion.div} variants={variants} initial="initial" animate="animate" transition={transition}>
                {stats.statsData[selectValue][activeBar].tomatosCount
                  ? (
                    <>
                      <Box sx={styles.tomatosCountTop}>
                        <GenericIcon type={EIcons.tomato} width="80" height="80" />
                        <span>x {stats.statsData[selectValue][activeBar].tomatosCount}</span>
                      </Box>
                      <Box sx={styles.tomatosCountBottom}>
                        {stats.statsData[selectValue][activeBar].tomatosCount} помидоров
                      </Box>
                    </>
                  )
                  : <GenericIcon type={EIcons.smilingTomato} />}
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
                    {formatPauseTime(stats.statsData[selectValue][activeBar].pauseTime)}
                    {/* 0м */}
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
                    {stats.statsData[selectValue][activeBar].stopsCount}
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
