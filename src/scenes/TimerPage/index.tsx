import { Box, List, ListItem, Typography, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import type { Variants, Transition } from "framer-motion";
import Container from "../../components/Container";
import CreateTaskForm from "../../components/CreateTaskForm";
import Header from "../../components/Header";
import TasksList from "../../components/TasksList";
import Timer from "../../components/Timer";
import useSxStyles from "../../hooks/useSxStyles";

const TimerPage = () => {
  const theme = useTheme();
  const isLaptopScreen = useMediaQuery(theme.breakpoints.down(1100));
  const styles = useSxStyles().timerPage;

  const variants: Variants = (!isLaptopScreen ? {
    initial: (direction: number) => ({
      x: direction * 200,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
    },
  } : {
    initial: {
      scale: 0,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
    },
  })

  const transition = (index: number = 1): Transition => ({ delay: !isLaptopScreen ? .3 : .3 * index });

  return (
    <>
      <Header />
      <Container sx={styles.container}>
        <Box component={motion.div} variants={variants} custom={-1} initial="initial" animate="animate" transition={transition(1)}>
          <Typography sx={styles.title} variant="h3">
            Ура! Теперь можно начать работать:
          </Typography>
          <List sx={styles.descrList} disablePadding>
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
        </Box>

        <Box sx={styles.timerBlock} component={motion.div} variants={variants} custom={1} initial="initial" animate="animate" transition={transition(2)}>
          <Timer />
        </Box>

        <Box sx={styles.tasksBlock} component={motion.div} variants={variants} custom={-1} initial="initial" animate="animate" transition={transition(3)}>
          <Box sx={styles.taskAddForm}>
            <CreateTaskForm />
          </Box>
          <TasksList />
        </Box>
      </Container>
    </>
  )
}

export default TimerPage;
