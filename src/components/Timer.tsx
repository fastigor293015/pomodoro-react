import { useState } from "react";
import useInterval from "../hooks/useInterval";
import useSxStyles from "../hooks/useSxStyles";
import { Box, Typography, useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ESteps, increaseTime, nextStep, stop, tick } from "../features/timer/timerSlice";
import { timerDecrement } from "../features/tasks/tasksSlice";
import { pauseTick } from "../features/stats/statsSlice";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants, Transition } from "framer-motion";
import IconButton from "./IconButton";
import PrimaryButton from "./PrimaryButton";
import OutlinedButton from "./OutlinedButton";

import useSound from "use-sound";
import alarmSound from "../assets/audio/alarm.mp3";


const digitVariants: Variants = {
  initial: {
    y: -120,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: {
    position: "absolute",
    y: 120,
    opacity: 0,
  },
};

const digitTransition: Transition = {
  type: "keyframes",
  duration: .3,
  delay: .1
};

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
  const playSound = useAppSelector(state => state.settings.playSound);
  const tasksList = useAppSelector(state => state.tasks.list);
  const firstTaskName = tasksList[0] ? tasksList[0].name : "Не задана";
  const dispatch = useAppDispatch();

  const [formattedMinutes, formattedSeconds] = formatTime(curTime);
  const [isStarted, setIsStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, soundTools] = useSound(alarmSound);

  const { palette } = useTheme();
  const styles = useSxStyles().timer;
  const stepColor = !isStarted ? palette.gray.C4 : step === ESteps.work ? palette.red.medium : palette.green.main;

  const updateTimer = () => {
    setIsStarted(false);
    setIsPlaying(false);
    if (step === ESteps.work && tasksList[0]) dispatch(timerDecrement(tasksList[0].id));
    dispatch(nextStep());
  }

  const resetTimer = () => {
    setIsStarted(false);
    setIsPlaying(false);
    dispatch(stop());
  }

  const playAlarmSound = () => {
    if (!playSound) return;
    setTimeout(() => {
      play();
      if (confirm("Пора переходить к следующему шагу")) {
        soundTools.stop();
      } else {
        soundTools.stop();
      }
    }, 50);
  }

  useInterval(() => {
    if (curTime <= 0) {
      updateTimer();
      playAlarmSound();
    } else {
      dispatch(tick());
    }
  }, isPlaying ? 1000 : null);

  useInterval(() => {
    dispatch(pauseTick());
  }, (isStarted && !isPlaying) ? 1000 : null);

  return (
    <Box>
      <Box sx={{
        ...styles.header,
        bgcolor: stepColor,
      }}>
        <Typography variant="h5">{firstTaskName}</Typography>
        { step === ESteps.work ? `Помидор ${tomatoNumber}` : `Перерыв ${breakNumber}` }
      </Box>
      <Box sx={styles.body}>
        <Box sx={styles.clockFaceWrapper}>
          <Box sx={{
            ...styles.clockFace,
            color: !isStarted ? "#333" : stepColor,
          }}>
            {/* MM */}
            {formattedMinutes.split("").map((item, index) => (
              <Box sx={styles.digitWrapper} key={`min-${index}`}>
                <AnimatePresence>
                  <motion.div
                    key={`digit-minutes${index}${item}`}
                    variants={digitVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={digitTransition}
                  >
                    {item}
                  </motion.div>
                </AnimatePresence>
              </Box>
            ))}
            <Box sx={styles.colon}>:</Box>
            {/* SS */}
            {formattedSeconds.split("").map((item, index) => (
              <Box sx={styles.digitWrapper} key={`sec-${index}`}>
                <AnimatePresence>
                  <motion.div
                    key={`digit-seconds${index}${item}`}
                    variants={digitVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={digitTransition}
                  >
                    {item}
                  </motion.div>
                </AnimatePresence>
              </Box>
            ))}

            <IconButton sx={styles.addTimeBtn} onClick={() => dispatch(increaseTime())}>
              <Add />
            </IconButton>
          </Box>
        </Box>

        <Typography sx={styles.taskName}>
          <span>Задача 1 -</span> {firstTaskName}
        </Typography>

        <Box sx={styles.btnsContainer}>
          <PrimaryButton onClick={() => {
            setIsStarted(true);
            setIsPlaying(!isPlaying);
          }}>
            {!isStarted ? "Старт" : !isPlaying ? "Продолжить" : "Пауза"}
          </PrimaryButton>
          <OutlinedButton onClick={(!isStarted || (isPlaying && step === ESteps.work)) ? resetTimer : updateTimer} disabled={!isStarted}>
            {(!isStarted || (isPlaying && step === ESteps.work)) ? "Стоп" : (step === ESteps.shortBreak || step === ESteps.longBreak) ? "Пропустить" : "Сделано"}
          </OutlinedButton>
        </Box>
      </Box>
    </Box>
  )
}

export default Timer;
