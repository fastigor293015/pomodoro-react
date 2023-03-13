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
      boxShadow: "0px 10px 63px rgba(0, 0, 0, 0.07)",
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
    },
    themeSwitchBtn: {
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
    },
  },

  // TIMER PAGE
  timerPage: {
    container: {
      display: "flex",
      gap: "16px",
    },
    left: {
      flexBasis: "calc((100%-16px)*0.42)",
    },
    title: {
      mb: "3px",
    },
    taskAddForm: {
      mb: "25px",
    },
    tasksList: {
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
        color: theme.palette.red.dark,
      }
    },
    right: {
      flexBasis: "calc((100%-16px)*0.58)",
    },
  },

  // CREATE TASK FORM
  createTaskForm: {
    inputWrapper: {
      maxWidth: "370px",
      mb: "25px",
      p: "15px 15px 14px",
      bgcolor: theme.palette.gray.F4,
    },
  },

  // TASKS LIST
  tasksList: {
    list: {
      maxWidth: "370px",
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
      lineHeight: "17px",
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
      lineHeight: "17px",
      fontWeight: "400",
    },
    modalDeleteBtnWrapper: {
      mb: "8px",
    },
    modalCancelBtn: {
      p: "2px 4px",
      color: theme.palette.text.primary,
      fontSize: "16px",
      lineHeight: "17px",
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
      lineHeight: "17px",
      color: "#FFF",
      bgcolor: theme.palette.gray.C4,
      transition: "background-color .2s ease-in-out",
    },
    body: {
      p: "85px 15px 107px",
      textAlign: "center",
      bgcolor: theme.palette.gray.F4,
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
      lineHeight: "150px",
      fontWeight: 200,
      transition: "color .2s ease-in-out",
    },
    digitWrapper: {
      position: "relative",
    },
    colon: {
      transform: "translateY(-20px)",
    },
    addTimeBtn: {
      position: "absolute",
      top: "50px",
      left: "calc(100% + 25px)",
    },
    taskName: {
      mb: "32px",
      fontSize: "16px",
      lineHeight: "17px",
      "& span:first-of-type": {
        color: theme.palette.gray[99],
      },
    },
    btnsContainer: {
      display: "inline-flex",
      gap: "25px",
    }
  },

  // STATS PAGE
  statsPage: {
    top: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: "30px",
    },
    content: {
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
      gridTemplateRows: "minmax(260px, max-content)",
      gridAutoFlow: "row dense",
      gridAutoRows: "minmax(179px, max-content)",
      gap: "32px",
    },
    statsCard: {
      p: "25px",
      bgcolor: theme.palette.gray.F4,
    },
    weekDay: {
      gridColumn: "3 span",
    },
    weekDayTitle: {
      mb: "14px",
    },
    weekDayDescr: {
      fontSize: "16px",
      lineHeight: 1.75,
    },
    chart: {
      gridColumn: "9 span",
      gridRow: "2 span",
      maxHeight: "471px",
      p: 0,
      // "& svg *": {
      //   fontFamily: "SFUIDisplay, sans-serif !important",
      // }
    },
    tomatosCount: {
      gridColumn: "3 span",
      textAlign: "center",
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
        color: theme.palette.yellow.main,
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
      fontSize: "64px",
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
        color: theme.palette.purple.main,
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
      fontSize: "64px",
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
        color: theme.palette.cyan.main,
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
      fontSize: "72px",
      lineHeight: 1.1875,
    },
  },
});

export default styles;
