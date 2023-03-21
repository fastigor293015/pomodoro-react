import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, IconButton, Link as MUILink, Typography, Divider, useTheme, useMediaQuery } from "@mui/material";
import { LightMode, DarkMode, Equalizer, Close, Settings, AccessTime, VolumeUp } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setMode } from "../features/theme/themeSlice";
import { setLongBreakInterval, setLongBreakTime, setPlaySound, setShortBreakTime, setTomatoTime } from "../features/settings/settingsSlice";
import useSxStyles from "../hooks/useSxStyles";
import { GenericIcon, EIcons } from "./GenericIcon";
import SlidingPanel from "./SlidingPanel";
import Switch from "./Switch";
import Input from "./Input";
import { motion, Transition, Variants } from "framer-motion";

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

const Header = () => {
  const [isSettingsOpened, setIsSettingsOpened] = useState(false);
  const { playSound, tomatoTime, shortBreakTime, longBreakTime, longBreakInterval } = useAppSelector(state => state.settings);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isTabletScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const styles = useSxStyles().header;

  return (
    <Box sx={styles.container}>
      <MUILink component={RouterLink} to="/" sx={styles.logo}>
        <GenericIcon type={EIcons.tomato} />
        {!isMobileScreen && "pomodoro_box"}
      </MUILink>

      <Box sx={styles.right}>
        <IconButton onClick={() => dispatch(setMode())} sx={styles.iconBtn}>
          {
            theme.palette.mode === "light"
              ? <LightMode />
              : <DarkMode />
          }
        </IconButton>
        <IconButton sx={styles.iconBtn} onClick={() => setIsSettingsOpened(!isSettingsOpened)}>
          <Settings />
        </IconButton>
        {
          !isTabletScreen
            ?
            <MUILink component={RouterLink} to="/stats" sx={styles.statsLink}>
              <Equalizer />
              Статистика
            </MUILink>
            :
            <IconButton sx={styles.iconBtn} onClick={() => navigate("/stats")}>
              <Equalizer />
            </IconButton>
        }

        {/* SETTINGS PANEL */}
        <SlidingPanel isOpened={isSettingsOpened} setIsOpened={setIsSettingsOpened}>
          <Box sx={styles.settings}>
            <Box sx={styles.settingsTop} component={motion.div} variants={variants} initial="initial" animate="animate" transition={transition(1)}>
              <Typography sx={styles.settingsTitle} variant="h3">
                Настройки
              </Typography>
              <IconButton sx={styles.settingsCloseBtn} onClick={() => setIsSettingsOpened(false)}>
                <Close />
              </IconButton>
            </Box>

            <Divider />

            <Box sx={styles.settingsContent}>
              <Box sx={styles.settingsSection}>
                <Typography sx={styles.settingsSectionTitle} variant="h4" component={motion.h4} variants={variants} initial="initial" animate="animate" transition={transition(2)}>
                  <AccessTime />
                  Таймер
                </Typography>
                <Box sx={styles.settingsRow} component={motion.div} variants={variants} initial="initial" animate="animate" transition={transition(3)}>
                  Помидорка
                  <Input sx={styles.settingsTimeInput} type="number" value={tomatoTime} onChange={(e) => dispatch(setTomatoTime(Number(e.target.value)))} />
                </Box>
                <Box sx={styles.settingsRow} component={motion.div} variants={variants} initial="initial" animate="animate" transition={transition(4)}>
                  Короткий перерыв
                  <Input sx={styles.settingsTimeInput} type="number" value={shortBreakTime} onChange={(e) => dispatch(setShortBreakTime(Number(e.target.value)))} />
                </Box>
                <Box sx={styles.settingsRow} component={motion.div} variants={variants} initial="initial" animate="animate" transition={transition(5)}>
                  Длинный перерыв
                  <Input sx={styles.settingsTimeInput} type="number" value={longBreakTime} onChange={(e) => dispatch(setLongBreakTime(Number(e.target.value)))} />
                </Box>
                <Box sx={styles.settingsRow} component={motion.div} variants={variants} initial="initial" animate="animate" transition={transition(6)}>
                  Частота длинных перерывов
                  <Input sx={styles.settingsTimeInput} type="number" value={longBreakInterval} onChange={(e) => dispatch(setLongBreakInterval(Number(e.target.value)))} />
                </Box>
              </Box>

              <Divider />

              <Box sx={styles.settingsSection}>
                <Typography sx={styles.settingsSectionTitle} variant="h4" component={motion.h4} variants={variants} initial="initial" animate="animate" transition={transition(7)}>
                  <VolumeUp />
                  Звук
                </Typography>
                <Box sx={styles.settingsRow} component={motion.div} variants={variants} initial="initial" animate="animate" transition={transition(8)}>
                  Включить уведомления
                  <Switch defaultChecked={playSound} onChange={() => dispatch(setPlaySound())} />
                </Box>
              </Box>
            </Box>
          </Box>
        </SlidingPanel>
      </Box>
    </Box>
  )
}

export default Header;
