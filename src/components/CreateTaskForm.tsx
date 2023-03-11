import { useState } from "react";
import { Box } from "@mui/material";
import { useAppDispatch } from "../app/hooks";
import { add } from "../features/tasks/tasksSlice";
import Input from "./Input";
import PrimaryButton from "./PrimaryButton";
import useSxStyles from "../hooks/useSxStyles";

const CreateTaskForm = () => {
  const [taskValue, setTaskValue] = useState("");
  const dispatch = useAppDispatch();
  const styles = useSxStyles().createTaskForm;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(add(taskValue.trim()));
    setTaskValue("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={styles.inputWrapper}>
        <Input
          fullWidth
          value={taskValue}
          placeholder="Название задачи"
          onChange={e => setTaskValue(e.target.value)}
          required
        />
      </Box>
      <PrimaryButton type="submit">Добавить</PrimaryButton>
    </form>
  )
}

export default CreateTaskForm;
