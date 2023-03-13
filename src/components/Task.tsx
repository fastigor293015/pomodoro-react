import { useEffect, useRef, useState } from "react";
import { AddCircleOutlineOutlined, DeleteOutlineOutlined, EditOutlined, MoreHoriz, RemoveCircleOutlineOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, MenuItem, Typography, useTheme } from "@mui/material";
import { useAppDispatch } from "../app/hooks";
import { decrement, edit, increment, ITask, remove } from "../features/tasks/tasksSlice";
import SecondaryButton from "./SecondaryButton";
import DropdownMenu from "./DropdownMenu";
import Modal from "./Modal";
import useSxStyles from "../hooks/useSxStyles";
import Input from "./Input";

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
  const styles = useSxStyles().task;

  const getCoords = () => {
    const box = menuButtonRef.current?.getBoundingClientRect();

    if (box && menuButtonRef.current?.offsetWidth) {
      return {
        left: box.left + menuButtonRef.current?.offsetWidth / 2,
        top: box.top + box.height + document.documentElement.scrollTop,
      };
    }
  };

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
  };

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.name} variant="h5">
        <Box sx={styles.tomatosCount}>{task.tomatosCount}</Box>
        {!isEditing ? task.name : (
          <Box sx={styles.editingFormWrapper}>
            <form onSubmit={(e) => {
              e.preventDefault();
              dispatch(edit({ id: task.id, newName: editInputValue }));
              setIsEditing(false);
            }}>
              <Input
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
              />
            </form>
          </Box>
        )}
      </Typography>
      <IconButton sx={styles.menuBtn} ref={menuButtonRef} onClick={() => setMenuOpened(true)}>
        <MoreHoriz />
      </IconButton>

      {/* Dropdown menu */}
      <DropdownMenu isOpened={menuOpened} setIsOpened={setMenuOpened} coords={coords}>
        <MenuItem sx={styles.menuItem} tabIndex={1} onClick={() => dispatch(increment(task.id))} onKeyDown={keyDownHandler}>
          <AddCircleOutlineOutlined />
          Увеличить
        </MenuItem>
        <MenuItem sx={styles.menuItem} tabIndex={1} onClick={() => dispatch(decrement(task.id))} onKeyDown={keyDownHandler} disabled={task.tomatosCount <= 1 ? true : undefined}>
          <RemoveCircleOutlineOutlined />
          Уменьшить
        </MenuItem>
        <MenuItem sx={styles.menuItem} tabIndex={1} onClick={() => setIsEditing(true)} onKeyDown={keyDownHandler}>
          <EditOutlined />
          Редактировать
        </MenuItem>
        <MenuItem sx={styles.menuItem} tabIndex={1} onClick={() => setDeleteModalOpened(true)} onKeyDown={keyDownHandler}>
          <DeleteOutlineOutlined />
          Удалить
        </MenuItem>
      </DropdownMenu>

      {/* Delete modal */}
      <Modal isOpened={deleteModalOpened} setIsOpened={setDeleteModalOpened}>
        <Box sx={styles.modal}>
          <Typography sx={styles.modalTitle} variant="h3">
            Удалить задачу?
          </Typography>
          <Box sx={styles.modalDeleteBtnWrapper}>
            <SecondaryButton onClick={() => dispatch(remove(task.id))}>
              Удалить
            </SecondaryButton>
          </Box>
          <Button disableRipple sx={styles.modalCancelBtn} onClick={() => setDeleteModalOpened(false)}>
            Отмена
          </Button>
        </Box>
      </Modal>
    </Box>
  )
}

export default Task;
