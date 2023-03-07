import { AddCircleOutlineOutlined, DeleteOutlineOutlined, EditOutlined, MoreHoriz, RemoveCircleOutlineOutlined } from "@mui/icons-material";
import { MenuItem, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { decrement, increment, ITask, remove } from "../features/tasks/tasksSlice";
import DropdownMenu from "./DropdownMenu";
import Modal from "./Modal";
import SecondaryButton from "./SecondaryButton";
import { Button } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

interface ITaskProps {
  task: ITask;
}

const Task = ({ task }: ITaskProps) => {
  const dispatch = useAppDispatch();
  const [menuOpened, setMenuOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [coords, setCoords] = useState({
    left: 0,
    top: 0,
  });

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { palette } = useTheme();

  const getCoords = () => {
    const box = menuButtonRef.current?.getBoundingClientRect();

    if (box && menuButtonRef.current?.offsetWidth) {
      return {
        left: box.left + menuButtonRef.current?.offsetWidth / 2,
        top: box.top + box.height + document.documentElement.scrollTop,
      };
    }
  }

  useEffect(() => {
    if (!menuOpened) return;

    const coords = getCoords();
    console.log(coords);
    setCoords(coords ? coords : { left: 0, top: 0 });
  }, [menuOpened]);

  const keyDownHandler = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.code === "Tab") {
      e.preventDefault();
      setMenuOpened(false);
      menuButtonRef.current?.focus();
    };
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        p: "8px 0",
      }}
    >
      <Typography
        variant="h5"
        fontWeight={300}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          "&::before": {
            content: `"${task.tomatosCount}"`,
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            width: "25px",
            height: "25px",
            border: `1px solid ${palette.gray.C4}`,
            borderRadius: "50%",
          }
        }}
      >
        {/* <Box
          component={motion.div}
          sx={{
            position: "relative",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            width: "25px",
            height: "25px",
            border: `1px solid ${palette.gray.C4}`,
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <AnimatePresence>
            {task.tomatosCount.toString().split("").map(item => (
              <motion.div
              key={item}
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ position: "absolute", y: 20 }}
            >
              {item}
            </motion.div>
            ))}
          </AnimatePresence>
        </Box> */}
        {task.name}
      </Typography>
      <IconButton ref={menuButtonRef} sx={{ p: "5px" }} onClick={() => setMenuOpened(true)}>
        <MoreHoriz sx={{ fontSize: "30px", color: palette.gray.C4 }} />
      </IconButton>

      {/* Dropdown menu */}
      <DropdownMenu isOpened={menuOpened} setIsOpened={setMenuOpened} coords={coords}>
        <MenuItem tabIndex={1} sx={{ gap: "8px", p: "7px 15px" }} onClick={() => dispatch(increment(task.id))} onKeyDown={keyDownHandler}>
          <AddCircleOutlineOutlined sx={{ color: palette.green.light }} />
          Увеличить
        </MenuItem>
        <MenuItem tabIndex={1} sx={{ gap: "8px", p: "7px 15px" }} onClick={() => dispatch(decrement(task.id))} onKeyDown={keyDownHandler} disabled={task.tomatosCount <= 1 ? true : undefined}>
          <RemoveCircleOutlineOutlined sx={{ color: palette.green.light }} />
          Уменьшить
        </MenuItem>
        <MenuItem tabIndex={1} sx={{ gap: "8px", p: "7px 15px" }} onKeyDown={keyDownHandler}>
          <EditOutlined sx={{ color: palette.green.light }} />
          Редактировать
        </MenuItem>
        <MenuItem tabIndex={1} sx={{ gap: "8px", p: "7px 15px" }} onClick={() => setDeleteModalOpened(true)} onKeyDown={keyDownHandler}>
          <DeleteOutlineOutlined sx={{ color: palette.green.light }} />
          Удалить
        </MenuItem>
      </DropdownMenu>

      {/* Delete modal */}
      <Modal isOpened={deleteModalOpened} setIsOpened={setDeleteModalOpened}>
        <Box width="350px" p="25px 50px" textAlign="center">
          <Typography mb="25px" variant="h3" lineHeight="17px" fontWeight="400">
            Удалить задачу?
          </Typography>
          <Box mb="8px">
            <SecondaryButton onClick={() => dispatch(remove(task.id))}>
              Удалить
            </SecondaryButton>
          </Box>
          <Button disableRipple sx={{ p: "2px 4px", color: palette.text.primary, fontSize: "16px", lineHeight: "17px", fontWeight: 300, textDecoration: "underline", textTransform: "none" }} onClick={() => setDeleteModalOpened(false)}>
            Отмена
          </Button>
        </Box>
      </Modal>
    </Box>
  )
}

export default Task;
