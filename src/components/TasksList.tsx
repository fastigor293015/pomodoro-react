import { Box, List, Typography } from "@mui/material";
import useSxStyles from "../hooks/useSxStyles";
import { useAppSelector } from "../app/hooks";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants, Transition } from "framer-motion";
import Task from "./Task";

const itemVariants: Variants = {
  initial: {
    x: -100,
    maxHeight: 0,
    opacity: 0,
  },
  animate: {
    x: 0,
    maxHeight: "300px",
    opacity: 1,
  },
  exit: {
    x: 100,
    maxHeight: 0,
    opacity: 0,
  },
};

const itemTransition: Transition = {
  type: "keyframes",
  duration: .2,
  delay: .2
};

const timeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const timeTransition: Transition = {
  type: "keyframes",
  duration: .2,
  delay: .2
};

const formatTime = (time: number) => {
  const hours = Math.floor(time / 60);
  const hoursLastFirstDigit = hours.toString().substring(hours.toString().length - 1);
  const hoursLastSecondDigit = hours.toString().substring(hours.toString().length - 2, hours.toString().length - 1);
  let outputTime: string = "";

  if (hours > 0) {
    if (hoursLastFirstDigit === "1" && hoursLastSecondDigit !== "1") {
      outputTime = `${hours} час ${time - hours * 60} мин`;
    } else if ((hoursLastFirstDigit === "2" || hoursLastFirstDigit === "3" || hoursLastFirstDigit === "4") && hoursLastSecondDigit !== "1") {
      outputTime = `${hours} часа ${time - hours * 60} мин`;
    } else {
      outputTime = `${hours} часов ${time - hours * 60} мин`;
    }
  } else {
    outputTime = `${time} мин`;
  }

  return outputTime;
}

const TasksList = () => {
  const list = useAppSelector(state => state.tasks.list);
  const totalTime = list.reduce((accumulator, task) => accumulator + task.tomatosCount * 25, 0);
  const formattedTotalTime = formatTime(totalTime);
  const styles = useSxStyles().tasksList;

  return (
    <Box>
      <List disablePadding sx={styles.list}>
        <AnimatePresence>
          {list.map((item) => (
            <motion.li
              variants={itemVariants}
              key={item.id}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={itemTransition}
            >
              <Task task={item} />
            </motion.li>
          ))}
        </AnimatePresence>
      </List>
      <AnimatePresence>
        {totalTime ? (<Typography sx={styles.totalTime} component={motion.div} variants={timeVariants} key="totaltime" initial="initial" animate="animate" exit="exit" transition={timeTransition}>
          {formattedTotalTime}
        </Typography>) : ""}
      </AnimatePresence>
    </Box>
  )
}

export default TasksList;
