import { Box, InputBase, useTheme } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { add } from "../features/tasks/tasksSlice";
import PrimaryButton from "./PrimaryButton";

const CreateTaskForm = () => {
  const { palette } = useTheme();
  const [taskValue, setTaskValue] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(add(taskValue));
    setTaskValue("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box maxWidth="370px" mb="25px" p="15px 15px 14px" bgcolor={palette.gray.F4}>
        <InputBase
          fullWidth
          value={taskValue}
          placeholder="Название задачи"
          onChange={e => setTaskValue(e.target.value)}
          sx={{
            color: "#333",
            fontSize: "16px",
            lineHeight: "17px",
            fontWeight: 300,
            "&::placeholder": {
              color: "#999999",
            }
          }}
          required
        />
      </Box>
      <PrimaryButton type="submit">Добавить</PrimaryButton>
    </form>
  )
}

export default CreateTaskForm;
