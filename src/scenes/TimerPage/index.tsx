import { Box, List, ListItem, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import Container from "../../components/Container";
import CreateTaskForm from "../../components/CreateTaskForm";
import Header from "../../components/Header";
import TasksList from "../../components/TasksList";
import Timer from "../../components/Timer";

const TimerPage = () => {
  const { palette } = useTheme();

  return (
    <>
      <Header />
      <Container display="flex" gap="16px">
        <Box flexBasis="calc((100%-16px)*0.42)" component={motion.div} initial={{ x: -200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: .3 }}>
          <Typography variant="h3" mb="3px">
            Ура! Теперь можно начать работать:
          </Typography>
          <List disablePadding sx={{
            mb: "25px",
            pl: "20px",
            fontSize: "16px",
            lineHeight: 2,
            "& li": {
              display: "list-item",
              p: 0,
              listStyle: "outside",
            },
            "& li::marker": {
              color: palette.red.dark,
            }
          }}>
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
          <Box mb="25px">
            <CreateTaskForm />
          </Box>
          <TasksList />
        </Box>

        <Box flexBasis="calc((100%-16px)*0.58)" component={motion.div} initial={{ x: 200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: .3 }}>
          <Timer />
        </Box>
      </Container>
    </>
  )
}

export default TimerPage;
