import { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";
import useInterval from "../hooks/useInterval";
import IconButton from "./IconButton";
import PrimaryButton from "./PrimaryButton";
import OutlinedButton from "./OutlinedButton";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { motion, AnimatePresence } from "framer-motion";
import { ESteps, nextStep, tick } from "../features/timer/timerSlice";

const tomatoTime: number = 25;
const shortBreakTime: number = 5;
const longBreakTime: number = 15;

const formatTime = (time: number) => {
  const minutesCount = Math.floor(time / 60);
  const secondsCount = time - minutesCount * 60;

  return [
    `${minutesCount / 10 >= 1 ? minutesCount : `0${minutesCount}`}`,
    `${secondsCount / 10 >= 1 ? secondsCount : `0${secondsCount}`}`
  ];
}

const Timer = () => {
  const { curTime, tomatoNumber, breakNumber, step } = useAppSelector(state => state.timer);
  const tasksList = useAppSelector(state => state.tasks.list);
  const firstTaskName = tasksList[0] ? tasksList[0].name : "Не задана";
  const dispatch = useAppDispatch();

  // const curTime = step === ESteps.work ? tomatoTime : step === ESteps.shortBreak ? shortBreakTime : longBreakTime;
  // const [time, setTime] = useState(curTime * 60);
  const [formattedMinutes, formattedSeconds] = formatTime(curTime);
  const [isStarted, setIsStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const { palette } = useTheme();
  const stepColor = !isStarted ? palette.gray.C4 : step === ESteps.work ? palette.red.medium : palette.green.main;

  const resetTimer = () => {
    setIsStarted(false);
    setIsPlaying(false);
    dispatch(nextStep());
  }

  useInterval(() => {
    curTime <= 0 ? resetTimer() : dispatch(tick());
  }, isPlaying ? 1000 : null);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" p="19px 40px" fontSize="16px" lineHeight="17px" color="#FFF" bgcolor={stepColor} sx={{ transition: "background-color .2s ease-in-out" }}>
        <Typography variant="h5">{firstTaskName}</Typography>
        { step === ESteps.work ? `Помидор ${tomatoNumber}` : `Перерыв ${breakNumber}` }
      </Box>
      <Box p="85px 15px 107px" textAlign="center" bgcolor={palette.gray.F4}>
        <Box>
          <Box position="relative" mb="15px" display="inline-block" sx={{ fontSize: "150px", lineHeight: "150px", color: !isStarted ? "#333" : stepColor, fontWeight: 200, transition: "color .2s ease-in-out" }}>
            <Box display="inline-flex" height="150px" overflow="hidden">

              {/* MM */}
              {formattedMinutes.split("").map((item, index) => (
                <Box key={`min-${index}`} position="relative">
                  <AnimatePresence>
                    <motion.div
                      key={`digit-minutes${index}${item}`}
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
              <Box sx={{ transform: "translateY(-20px)" }}>:</Box>
              {/* SS */}
              {formattedSeconds.split("").map((item, index) => (
                <Box  key={`sec-${index}`} position="relative">
                  <AnimatePresence>
                    <motion.div
                      key={`digit-seconds${index}${item}`}
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
            {!isStarted ? "Старт" : !isPlaying ? "Продолжить" : "Пауза"}
          </PrimaryButton>
          <OutlinedButton onClick={resetTimer} disabled={!isStarted}>
            Стоп
          </OutlinedButton>
        </Box>
      </Box>
    </Box>
  )
}

export default Timer;
