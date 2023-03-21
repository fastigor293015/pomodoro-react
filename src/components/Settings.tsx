import { useState } from "react";
import { Box, IconButton, Typography, Divider } from "@mui/material";
import { AccessTime, Close, VolumeUp } from "@mui/icons-material";
import useSxStyles from "../hooks/useSxStyles"
import SlidingPanel from "./SlidingPanel";
import Input from "./Input";
import Switch from "./Switch";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setLongBreakInterval, setLongBreakTime, setPlaySound, setShortBreakTime, setTomatoTime } from "../features/settings/settingsSlice";

const Settings = () => {
  const [isSettingsOpened, setIsSettingsOpened] = useState(false);
  const { playSound, tomatoTime, shortBreakTime, longBreakTime, longBreakInterval } = useAppSelector(state => state.settings);
  const dispatch = useAppDispatch();
  const styles = useSxStyles().header;

  return (
    <>
      <IconButton sx={styles.iconButton} onClick={() => setIsSettingsOpened(!isSettingsOpened)}>
        <Settings />
      </IconButton>
      {/* <IconButton LinkComponent={RouterLink} sx={styles.headerIconButton}>
        <Equalizer />
      </IconButton> */}

      {/* SETTINGS PANEL */}
      <SlidingPanel isOpened={isSettingsOpened} setIsOpened={setIsSettingsOpened}>
          <Box sx={styles.settings}>
            <Box sx={styles.settingsTop}>
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
                <Typography sx={styles.settingsSectionTitle} variant="h4">
                  <AccessTime />
                  Таймер
                </Typography>
                <Box sx={styles.settingsRow}>
                  Помидорка
                  <Input sx={styles.settingsTimeInput} type="number" value={tomatoTime} onChange={(e) => dispatch(setTomatoTime(Number(e.target.value)))} />
                </Box>
                <Box sx={styles.settingsRow}>
                  Короткий перерыв
                  <Input sx={styles.settingsTimeInput} type="number" value={shortBreakTime} onChange={(e) => dispatch(setShortBreakTime(Number(e.target.value)))} />
                </Box>
                <Box sx={styles.settingsRow}>
                  Длинный перерыв
                  <Input sx={styles.settingsTimeInput} type="number" value={longBreakTime} onChange={(e) => dispatch(setLongBreakTime(Number(e.target.value)))} />
                </Box>
                <Box sx={styles.settingsRow}>
                  Частота длинных перерывов
                  <Input sx={styles.settingsTimeInput} type="number" value={longBreakInterval} onChange={(e) => dispatch(setLongBreakInterval(Number(e.target.value)))} />
                </Box>
              </Box>

              <Divider />

              <Box sx={styles.settingsSection}>
                <Typography sx={styles.settingsSectionTitle} variant="h4">
                  <VolumeUp />
                  Звук
                </Typography>
                <Box sx={styles.settingsRow}>
                  Включить уведомления
                  <Switch defaultChecked={playSound} onChange={() => dispatch(setPlaySound())} />
                </Box>
              </Box>
            </Box>
          </Box>
        </SlidingPanel>
    </>
  )
}

export default Settings;
