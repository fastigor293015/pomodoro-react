import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useAppDispatch } from "../app/hooks";
import { add } from "../features/tasks/tasksSlice";
import Input from "./Input";
import PrimaryButton from "./PrimaryButton";
import useSxStyles from "../hooks/useSxStyles";
import { AddTask } from "@mui/icons-material";

const CreateTaskForm = () => {
  const [taskValue, setTaskValue] = useState("");
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isLaptopScreen = useMediaQuery(theme.breakpoints.down(1100));
  const styles = useSxStyles().createTaskForm;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(add(taskValue.trim()));
    setTaskValue("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={styles.formContainer}>
        {/* <Box> */}
          <Input
            sx={styles.input}
            fullWidth
            value={taskValue}
            placeholder="Название задачи"
            onChange={e => setTaskValue(e.target.value)}
            required
          />
        {/* </Box> */}
        <PrimaryButton sx={styles.submitBtn} type="submit">{!isLaptopScreen ? "Добавить" : <AddTask />}</PrimaryButton>
      </Box>
    </form>
  )
}

export default CreateTaskForm;
