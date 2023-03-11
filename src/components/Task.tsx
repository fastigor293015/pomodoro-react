import { useEffect, useRef, useState } from "react";
import { AddCircleOutlineOutlined, DeleteOutlineOutlined, EditOutlined, MoreHoriz, RemoveCircleOutlineOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, InputBase, MenuItem, Typography, useTheme } from "@mui/material";
import { useAppDispatch } from "../app/hooks";
import { decrement, edit, increment, ITask, remove } from "../features/tasks/tasksSlice";
import SecondaryButton from "./SecondaryButton";
import DropdownMenu from "./DropdownMenu";
import Modal from "./Modal";

interface ITaskProps {
  task: ITask;
}

const Task = ({ task }: ITaskProps) => {
  const dispatch = useAppDispatch();
  const [menuOpened, setMenuOpened] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editInputValue, setEditInputValue] = useState(task.name);
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
          flexGrow: 1,
          gap: "10px",
          "&::before": {
            content: `"${task.tomatosCount}"`,
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
            width: "25px",
            height: "25px",
            border: `1px solid ${palette.gray.C4}`,
            borderRadius: "50%",
          }
        }}
      >
        {!isEditing ? task.name : (
          <form style={{ flexGrow: 1 }} onSubmit={(e) => {
            e.preventDefault();
            dispatch(edit({ id: task.id, newName: editInputValue }));
            setIsEditing(false);
          }}>
            <InputBase
              autoFocus
              fullWidth
              value={editInputValue}
              onChange={(e) => setEditInputValue(e.target.value)}
              onFocus={(e) => e.target.select()}
              onBlur={() => {
                setIsEditing(false);
                setEditInputValue(task.name);
              }}
              inputProps={{ style: { padding: 0 } }}
              sx={{ fontSize: "16px", lineHeight: "17px", fontWeight: 300 }}
            />
          </form>
        )}
      </Typography>
      <IconButton ref={menuButtonRef} sx={{ ml: "15px", p: "5px" }} onClick={() => setMenuOpened(true)}>
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
        <MenuItem tabIndex={1} sx={{ gap: "8px", p: "7px 15px" }} onClick={() => setIsEditing(true)} onKeyDown={keyDownHandler}>
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
