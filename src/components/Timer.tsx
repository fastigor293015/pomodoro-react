import { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";
import useInterval from "../hooks/useInterval";
import IconButton from "./IconButton";
import PrimaryButton from "./PrimaryButton";
import OutlinedButton from "./OutlinedButton";
import { useAppSelector } from "../app/hooks";
import { motion, AnimatePresence } from "framer-motion";

const tomatoTime: number = 25;

const formatTime = (time: number) => {
  const minutesCount = Math.floor(time / 60);
  const secondsCount = time - minutesCount * 60;

  return [
    `${minutesCount / 10 >= 1 ? minutesCount : `0${minutesCount}`}`,
    `${secondsCount / 10 >= 1 ? secondsCount : `0${secondsCount}`}`
  ];
}

const Timer = () => {
  const tasksList = useAppSelector(state => state.tasks.list);
  const firstTaskName = tasksList[0] ? tasksList[0].name : "Не задана";

  const [isStarted, setIsStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(tomatoTime * 60);
  const [formattedMinutes, formattedSeconds] = formatTime(time);

  const { palette } = useTheme();

  useInterval(() => {
    setTime(prev => prev - 1);
  }, isPlaying ? 1000 : null);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" p="19px 40px" fontSize="16px" lineHeight="17px" color="#FFF" bgcolor={palette.gray.C4}>
        <Typography variant="h5">{firstTaskName}</Typography>
        Помидор 1
      </Box>
      <Box p="85px 15px 107px" textAlign="center" bgcolor={palette.gray.F4}>
        <Box>
          <Box position="relative" mb="15px" display="inline-block" sx={{ fontSize: "150px", lineHeight: "150px", color: "#333", fontWeight: 200 }}>
            <Box display="inline-flex" height="150px" overflow="hidden" sx={{ transition: "width .3s ease-in-out" }}>

              {/* MM */}
              {formattedMinutes.split("").map(item => (
                <Box position="relative">
                  <AnimatePresence>
                    <motion.div
                      key={`minutes${item}`}
                      initial={{ y: -120, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ position: "absolute", y: 120, opacity: 0 }}
                      transition={{ type: "keyframes", duration: .3, delay: .1 }}
                    >
                      {item}
                    </motion.div>
                  </AnimatePresence>
                </Box>
              ))}
              <Box>:</Box>
              {/* SS */}
              {formattedSeconds.split("").map(item => (
                <Box position="relative">
                  <AnimatePresence>
                    <motion.div
                      key={`seconds${item}`}
                      initial={{ y: -120, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ position: "absolute", y: 120, opacity: 0 }}
                      transition={{ type: "keyframes", duration: .3, delay: .1 }}
                    >
                      {item}
                    </motion.div>
                  </AnimatePresence>
                </Box>
              ))}
            </Box>
            <IconButton sx={{ position: "absolute", top: "50px", left: "calc(100% + 25px)" }}>
              <Add />
            </IconButton>
          </Box>
        </Box>

        <Typography mb="32px" color="#333" fontSize="16px" lineHeight="17px">
          <span style={{ color: palette.gray[99] }}>Задача 1 -</span> {firstTaskName}
        </Typography>

        <Box display="inline-flex" gap="25px">
          <PrimaryButton onClick={() => {
            setIsStarted(true);
            setIsPlaying(!isPlaying);
          }}>
            {!isPlaying ? "Старт" : "Пауза"}
          </PrimaryButton>
          <OutlinedButton onClick={() => setIsPlaying(false)} disabled={!isStarted}>
            Стоп
          </OutlinedButton>
        </Box>
      </Box>
    </Box>
  )
}

export default Timer;
