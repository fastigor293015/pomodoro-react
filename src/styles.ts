import type { SxProps, Theme } from "@mui/material";

type StylesType = (theme: Theme) => ({
  [key: string]: {
    [key: string]: SxProps;
  };
});

const styles: StylesType = (theme) => ({
  modal: {
    background: {
      position: "fixed",
      zIndex: "20",
      inset: 0,
    },
    content: {
      position: "absolute",
      zIndex: "20",
      top: "50%",
      left: "50%",
      bgcolor: theme.palette.background.default,
      boxShadow: "0px 0px 20px 7px rgba(34, 60, 80, 0.2)",
      overflow: "hidden",
    },
    closeBtn: {
      position: "absolute",
      top: "6px",
      right: "6px",
      color: theme.palette.gray.C4,
    }
  },
  slidingPanel: {
    background: {
      position: "fixed",
      zIndex: "20",
      inset: 0,
    },
    content: {
      position: "absolute",
      zIndex: "20",
      top: "0",
      bottom: "0",
      right: "0",
      bgcolor: theme.palette.background.default,
      boxShadow: "-7px 4px 8px 0px rgba(34, 60, 80, 0.2)",
    }
  },
  dropdownMenu: {
    container: {
      position: "absolute",
      zIndex: "5",
      p: "7px 0",
      border: `1px solid ${theme.palette.gray.C4}`,
      bgcolor: theme.palette.background.default,
      "&::before": {
        content: `""`,
        position: "absolute",
        top: 0,
        left: "50%",
        zIndex: 1,
        display: "block",
        width: 0,
        height: 0,
        border: "7px solid transparent",
        borderBottom: `7px solid ${theme.palette.background.default}`,
        transform: "translate(-50%, -100%)",
      },
      "&::after": {
        content: `""`,
        position: "absolute",
        top: 0,
        left: "50%",
        display: "block",
        width: 0,
        height: 0,
        border: "8px solid transparent",
        borderBottom: `8px solid ${theme.palette.gray.C4}`,
        transform: "translate(-50%, -100%)",
      },
    },
  },

  // HEADER
  header: {
    container: {
      position: "fixed",
      zIndex: "10",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "70px",
      p: "0 80px",
      boxShadow: `0px 10px 63px ${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.07)" : "rgba(255, 255, 255, 0.07)"}`,
      backdropFilter: `blur(15px)`,
      inset: "0 0 auto 0",
      "&::before": {
        content: `""`,
        position: "absolute",
        inset: 0,
        zIndex: -1,
        bgcolor: theme.palette.background.default,
        opacity: .65,
        transition: "opacity .2s ease-in-out",
      },
      [theme.breakpoints.down("lg")]: {
        p: "0 40px",
      },
      [theme.breakpoints.down("md")]: {
        p: "0 30px",
      },
      [theme.breakpoints.down("sm")]: {
        p: "0 15px",
      },
      [theme.breakpoints.down(500)]: {
        p: "0 10px",
      },
    },
    logo: {
      display: "inline-flex",
      alignItems: "center",
      gap: "12px",
      fontSize: "24px",
      color: theme.palette.red.medium,
      fontWeight: 300,
      textDecoration: "none",
    },
    right: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      [theme.breakpoints.down("sm")]: {
        gap: "10px",
      },
    },
    iconBtn: {
      color: theme.palette.red.medium,
      "& svg": {
        fontSize: "25px",
      }
    },
    statsLink: {
      display: "inline-flex",
      alignItems: "center",
      gap: "12px",
      fontSize: "16px",
      textDecoration: "none",
      color: theme.palette.red.medium,
      transition: "color .2s ease-in-out",
      "&:hover": {
        color: theme.palette.red.dark,
      },
      "& svg": {
        fontSize: "26px",
      }
    },
    settings: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "400px",
      [theme.breakpoints.down(400)]: {
        width: "100vw",
      },
    },
    settingsTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      p: "24px",
    },
    settingsTitle: {
      fontWeight: 500,
    },
    settingsCloseBtn: {
      color: theme.palette.text.primary,
      "& svg": {
        fontSize: "25px",
      }
    },
    settingsContent: {
      p: "24px",
      overflow: "auto",
    },
    settingsRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    settingsTimeInput: {
      p: "15px 15px 14px",
      bgcolor: theme.palette.gray.F4,
    },
  },

  // TIMER PAGE
  timerPage: {
    container: {
      display: "grid",
      gridTemplateColumns: "41.47% 1fr",
      gridAutoRows: "minmax(0, max-content)",
      gap: "16px",
      rowGap: "25px",
      [theme.breakpoints.down(1100)]: {
        gridTemplateColumns: "1fr",
        rowGap: "16px",
      },
    },
    title: {
      mb: "3px",

      [theme.breakpoints.down(500)]: {
        fontSize: "22px",
      },
    },
    descrList: {
      pl: "20px",
      fontSize: "16px",
      lineHeight: 2,
      "& li": {
        display: "list-item",
        p: 0,
        listStyle: "outside",
      },
      "& li::marker": {
        color: theme.palette.red.dark,
      },
      [theme.breakpoints.down(500)]: {
        fontSize: "14px",
      },
    },
    tasksBlock: {
      justifySelf: "auto",
      maxWidth: "370px",
      textAlign: "left",
      [theme.breakpoints.down(1100)]: {
        justifySelf: "center",
        maxWidth: "unset",
        width: "470px",
      },
      [theme.breakpoints.down(500)]: {
        width: "100%",
      },
    },
    taskAddForm: {
      mb: "25px",
    },
    timerBlock: {
      gridRow: "2 span",
      [theme.breakpoints.down(1100)]: {
        gridRow: "unset",
      },
    },
  },

  // CREATE TASK FORM
  createTaskForm: {
    formContainer: {
      [theme.breakpoints.down(1100)]: {
        display: "flex",
      },
    },
    input: {
      mb: "25px",
      p: "15px 15px 14px",
      bgcolor: theme.palette.gray.F4,
      [theme.breakpoints.down(1100)]: {
        display: "flex",
        flexGrow: 1,
        mb: 0,
        borderRadius: "20px 0 0 20px",
      },
    },
    submitBtn: {
      [theme.breakpoints.down(1100)]: {
        minWidth: "unset",
        width: "61px",
        height: "61px",
        p: 0,
        borderRadius: "0 20px 20px 0",
        "& svg": {
          fontSize: "25px",
        },
      },
    },
  },

  // TASKS LIST
  tasksList: {
    list: {
      mb: "19px",
      "& > li": {
        borderBottom: `1px solid ${theme.palette.gray.E4}`,
      },
      "& > li:first-of-type": {
        borderTop: `1px solid ${theme.palette.gray.E4}`,
      },
    },
    totalTime: {
      color: theme.palette.gray[99],
      fontSize: "16px",
      lineHeight: 1.0625,
      fontWeight: 300,
    },
  },

  // TASK
  task: {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      p: "8px 0",
    },
    name: {
      display: "flex",
      alignItems: "center",
      flexGrow: 1,
      gap: "10px",
      fontWeight: 300,
    },
    tomatosCount: {
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      flexShrink: 0,
      width: "25px",
      height: "25px",
      border: `1px solid ${theme.palette.gray.C4}`,
      borderRadius: "50%",
    },
    editingFormWrapper: {
      flexGrow: 1,
    },
    menuBtn: {
      ml: "15px",
      p: "5px",
      "& > svg": {
        fontSize: "30px",
        color: theme.palette.gray.C4,
      },
    },
    menuItem: {
      gap: "8px",
      p: "7px 15px",
      "& > svg": {
        color: theme.palette.green.light,
      },
    },
    modal: {
      width: "350px",
      p: "25px 50px",
      textAlign: "center",
    },
    modalTitle: {
      mb: "25px",
      lineHeight: 1.0625,
      fontWeight: "400",
    },
    modalDeleteBtnWrapper: {
      mb: "8px",
    },
    modalCancelBtn: {
      p: "2px 4px",
      color: theme.palette.text.primary,
      fontSize: "16px",
      lineHeight: 1.0625,
      fontWeight: 300,
      textDecoration: "underline",
      textTransform: "none",
  }
  },

  // TIMER
  timer: {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      p: "19px 40px",
      fontSize: "16px",
      lineHeight: 1.0625,
      color: "#FFF",
      bgcolor: theme.palette.gray.C4,
      transition: "background-color .2s ease-in-out",
      [theme.breakpoints.down(500)]: {
        p: "15px 20px",
      },
      [theme.breakpoints.down(400)]: {
        fontSize: "14px",
        "& *": {
          fontSize: "14px !important",
        },
      },
    },
    body: {
      p: "85px 15px 107px",
      textAlign: "center",
      bgcolor: theme.palette.gray.F4,
      [theme.breakpoints.down("sm")]: {
        p: "50px 0 72px",
      },
      [theme.breakpoints.down(500)]: {
        p: "30px 0 42px",
      },
      [theme.breakpoints.down(400)]: {
        p: "20px 0 32px",
      },
    },
    clockFaceWrapper: {
      mb: "15px",
      overflow: "hidden",
    },
    clockFace: {
      position: "relative",
      display: "inline-flex",
      height: "150px",
      fontSize: "150px",
      lineHeight: 1,
      fontWeight: 200,
      transition: "color .2s ease-in-out",
      [theme.breakpoints.down("sm")]: {
        height: "120px",
        fontSize: "120px",
      },
      [theme.breakpoints.down(500)]: {
        height: "100px",
        fontSize: "100px",
      },
      [theme.breakpoints.down(400)]: {
        height: "80px",
        fontSize: "80px",
      },
    },
    digitWrapper: {
      position: "relative",
    },
    colon: {
      transform: "translateY(-13%)",
    },
    addTimeBtn: {
      position: "absolute",
      left: "calc(100% + 25px)",
      alignSelf: "center",
      [theme.breakpoints.down("lg")]: {
        left: "calc(100% + 15px)",
      },
      [theme.breakpoints.down(500)]: {
        left: "calc(100% + 10px)",
        width: "30px",
        height: "30px",
        "& svg": {
          fontSize: "20px",
        },
      },
      [theme.breakpoints.down(400)]: {
        left: "calc(100% + 5px)",
      },
    },
    taskName: {
      mb: "32px",
      fontSize: "16px",
      lineHeight: 1.0625,
      color: "#333",
      "& span:first-of-type": {
        color: theme.palette.gray[99],
      },
      [theme.breakpoints.down(500)]: {
        mb: "25px",
      },
      [theme.breakpoints.down(400)]: {
        mb: "20px",
        fontSize: "14px",
      },
    },
    btnsContainer: {
      display: "inline-flex",
      gap: "25px",
      [theme.breakpoints.down("sm")]: {
        gap: 0,
      },
    },
    controlsBtn: {
      [theme.breakpoints.down("sm")]: {
        minWidth: "unset",
        width: "60px",
        height: "60px",
        p: "0",
        "& svg": {
          fontSize: "30px",
        },
        "&:first-of-type": {
          borderRadius: "20px 0 0 20px",
        },
        "&:last-of-type": {
          borderRadius: "0 20px 20px 0",
        },
      },
      [theme.breakpoints.down(400)]: {
        width: "50px",
        height: "50px",
        "& svg": {
          fontSize: "25px",
        },
      }
    }
  },

  // STATS PAGE
  statsPage: {
    top: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: "30px",
      [theme.breakpoints.down("sm")]: {
        // display: "block",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "15px",
      },
      [theme.breakpoints.down(500)]: {
        mb: "10px",
      },
    },
    title: {
      [theme.breakpoints.down(500)]: {
        fontSize: "22px",
      },
    },
    weeksSelectWrapper: {
      flexGrow: 1,
      maxWidth: "370px",
      [theme.breakpoints.down("md")]: {
        maxWidth: "270px",
      },
      [theme.breakpoints.down("sm")]: {
        maxWidth: "unset",
        width: "100%",
      },
    },
    content: {
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
      gridTemplateRows: "minmax(260px, max-content)",
      gridAutoFlow: "row dense",
      gridAutoRows: "minmax(179px, max-content)",
      gap: "32px",
      [theme.breakpoints.down(1100)]: {
        gap: "15px",
      },
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "minmax(180px, max-content)",
      },
      [theme.breakpoints.down(500)]: {
        gridTemplateRows: "minmax(140px, max-content)",
        gridAutoRows: "minmax(150px, max-content)",
        gap: "10px",
      },
    },
    statsCard: {
      p: "25px",
      color: "#333",
      fontSize: "24px",
      bgcolor: theme.palette.gray.F4,
      [theme.breakpoints.down(1100)]: {
        p: "25px 15px",
      },
      [theme.breakpoints.down(499)]: {
        p: "15px",
        fontSize: "22px",
      },
    },
    statsCardTitle: {
      fontSize: "1em",
      [theme.breakpoints.down(500)]: {
        gridColumn: "2 span",
      },
    },
    weekDay: {
      gridColumn: "3 span",
      [theme.breakpoints.down("md")]: {
        gridColumn: "1 span",
      },
      [theme.breakpoints.down(500)]: {
        gridColumn: "2 span",
      },
    },
    weekDayTitle: {
      mb: "14px",
    },
    weekDayDescr: {
      fontSize: "0.67em",
      lineHeight: 1.75,
      "& span": {
        color: theme.palette.red.medium,
        fontWeight: 700,
      }
    },
    chart: {
      gridColumn: "9 span",
      gridRow: "2 span",
      maxHeight: "471px",
      p: "0 !important",
      [theme.breakpoints.down("md")]: {
        gridColumn: "2 span",
        gridRow: "1 span",
        height: "454px",
      },
      [theme.breakpoints.down(500)]: {
        height: "354px",
      },
      [theme.breakpoints.down(400)]: {
        height: "300px",
      },
    },
    tomatosCount: {
      gridColumn: "3 span",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      p: "0 !important",
      fontSize: "24px",
      lineHeight: 1.375,
      fontWeight: 700,
      textAlign: "center",
      [theme.breakpoints.down("md")]: {
        gridColumn: "1 span",
      },
      [theme.breakpoints.down(500)]: {
        gridColumn: "2 span",
        height: "170px",
      },
    },
    tomatosCountTop: {
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      gap: "15px",
      color: theme.palette.gray[99],
    },
    tomatosCountBottom: {
      width: "100%",
      p: "9px 0",
      color: "#FFF",
      fontSize: "1em",
      bgcolor: theme.palette.red.medium,
    },
    focus: {
      position: "relative",
      gridColumn: "4 span",
      bgcolor: theme.palette.yellow.light,
      "& svg": {
        position: "absolute",
        top: "50%",
        right: "25px",
        transform: "translateY(-50%)",
        width: "5.375em",
        height: "5.375em",
        color: theme.palette.yellow.main,
      },
      [theme.breakpoints.down("md")]: {
        gridColumn: "2 span",
      },
    },
    focusText: {
      position: "relative",
      zIndex: 1,
    },
    focusTitle: {
      mb: "20px",
    },
    focusDescr: {
      fontSize: "2.67em",
      lineHeight: 1.194,
    },
    pauseTime: {
      position: "relative",
      gridColumn: "4 span",
      bgcolor: theme.palette.purple.light,
      "& svg": {
        position: "absolute",
        top: "50%",
        right: "25px",
        transform: "translateY(-50%)",
        width: "5.375em",
        height: "5.375em",
        color: theme.palette.purple.main,
      },
      [theme.breakpoints.down("md")]: {
        gridColumn: "2 span",
      },
    },
    pauseTimeText: {
      position: "relative",
      zIndex: 1,
    },
    pauseTimeTitle: {
      mb: "20px",
    },
    pauseTimeDescr: {
      fontSize: "2.67em",
      lineHeight: 1.194,
    },
    stops: {
      position: "relative",
      gridColumn: "4 span",
      bgcolor: theme.palette.cyan.light,
      "& svg": {
        position: "absolute",
        top: "50%",
        right: "25px",
        transform: "translateY(-50%)",
        width: "5.375em",
        height: "5.375em",
        color: theme.palette.cyan.main,
      },
      [theme.breakpoints.down("md")]: {
        gridColumn: "2 span",
      },
    },
    stopsText: {
      position: "relative",
      zIndex: 1,
    },
    stopsTitle: {
      mb: "10px",
    },
    stopsDescr: {
      fontSize: "3em",
      lineHeight: 1.1875,
    },
  },
});

export default styles;
