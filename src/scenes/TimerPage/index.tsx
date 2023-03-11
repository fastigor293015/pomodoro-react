import { Box, List, ListItem, Typography } from "@mui/material";
import { motion } from "framer-motion";
import type { Variants, Transition } from "framer-motion";
import Container from "../../components/Container";
import CreateTaskForm from "../../components/CreateTaskForm";
import Header from "../../components/Header";
import TasksList from "../../components/TasksList";
import Timer from "../../components/Timer";
import useSxStyles from "../../hooks/useSxStyles";

const variants: Variants = {
  initial: (direction: number) => ({
    x: direction * 200,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
  },
}

const transition: Transition = { delay: .3 };

const TimerPage = () => {
  const styles = useSxStyles().timerPage;

  return (
    <>
      <Header />
      <Container sx={styles.container}>
        <Box sx={styles.left} component={motion.div} variants={variants} custom={-1} initial="initial" animate="animate" transition={transition}>
          <Typography sx={styles.title} variant="h3">
            Ура! Теперь можно начать работать:
          </Typography>
          <List sx={styles.tasksList} disablePadding>
            <ListItem>
              Выберите категорию и напишите название текущей задачи
            </ListItem>
            <ListItem>
              Запустите таймер («помидор»)
            </ListItem>
            <ListItem>
              Работайте пока «помидор» не прозвонит
            </ListItem>
            <ListItem>
              Сделайте короткий перерыв (3-5 минут)
            </ListItem>
            <ListItem>
              Продолжайте работать «помидор» за «помидором», пока задача не будет выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).
            </ListItem>
          </List>
          <Box sx={styles.taskAddForm}>
            <CreateTaskForm />
          </Box>
          <TasksList />
        </Box>

        <Box sx={styles.right} component={motion.div} variants={variants} custom={1} initial="initial" animate="animate" transition={transition}>
          <Timer />
        </Box>
      </Container>
    </>
  )
}

export default TimerPage;
