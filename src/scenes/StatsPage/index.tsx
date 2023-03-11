import { Box, MenuItem, useTheme } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { Typography } from "@mui/material";
import { useState } from "react";
import Container from "../../components/Container";
import Header from "../../components/Header";
import useSxStyles from "../../hooks/useSxStyles";
import Select from "../../components/Select";

const selectItems = [
  {
    label: "Эта неделя",
    value: "This-week",
  },
  {
    label: "Прошедшая неделя",
    value: "Last-week",
  },
  {
    label: "2 недели назад",
    value: "Two-weeks-ago",
  },
];

const StatsPage = () => {
  const [selectValue, setSelectValue] = useState(selectItems[0].value);
  const styles = useSxStyles().statsPage;

  const handleChange = (e: SelectChangeEvent<unknown>) => {
    setSelectValue(e.target.value as string);
  }

  return (
    <>
      <Header />
      <Container>
        <Box sx={styles.top}>
          <Typography variant="h3">
            Ваша активность
          </Typography>
          <Select
            value={selectValue}
            onChange={handleChange}
          >
            {selectItems.map((item, index) => (
              <MenuItem
                key={item.value}
                autoFocus={index === selectItems.findIndex(item => item.value !== selectValue)}
                value={item.value}
                disabled={item.value === selectValue}
              >
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Container>
    </>
  )
}

export default StatsPage;
