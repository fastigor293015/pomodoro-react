import { Box, List, Typography } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { AnimatePresence, motion } from "framer-motion";
import Task from "./Task";
import { useTheme } from "@mui/material";

const formatTime = (time: number) => {
  const hours = Math.floor(time / 60);
  const hoursLastFirstDigit = hours.toString().substring(hours.toString().length - 1);
  const hoursLastSecondDigit = hours.toString().substring(hours.toString().length - 2, hours.toString().length - 1);
  let outputTime: string = "";
  console.log(hoursLastSecondDigit);

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
  const { palette } = useTheme();

  return (
    <Box>
      <List disablePadding sx={{ maxWidth: "370px", mb: "19px", "& > li:first-of-type": { borderTop: `1px solid ${palette.gray.E4}`, }}}>
        <AnimatePresence>
          {list.map((item) => (
            <motion.li
              key={item.id}
              style={{
                borderBottom: `1px solid ${palette.gray.E4}`,
              }}
              initial={{ x: -100,/* scale: 0,  */maxHeight: 0, opacity: 0 }}
              animate={{ x: 0,/* scale: 1,  */maxHeight: "300px", opacity: 1 }}
              exit={{ x: 100,/* scale: 0,  */maxHeight: 0, opacity: 0 }}
              transition={{ type: "keyframes", duration: .2, delay: .2 }}
            >
              <Task task={item} />
            </motion.li>
          ))}
        </AnimatePresence>
      </List>
      <AnimatePresence>
        {totalTime ? (<Typography key="totaltime" component={motion.div} color={palette.gray[99]} fontSize="16px" lineHeight="17px" fontWeight={300} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "keyframes", duration: .2, delay: .2 }}>
          {formattedTotalTime}
        </Typography>) : ""}
      </AnimatePresence>
    </Box>
  )
}

export default TasksList;
