import React from 'react';
import { Box, Button } from '@material-ui/core';
import GameContainer from '../containers/GameContainer';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Mode } from '../types';
import { GAME_BGCOLOR } from '../constatns';

const outline = `1px 1px 0 ${GAME_BGCOLOR}, -1px -1px 0 ${GAME_BGCOLOR}, -1px 1px 0 ${GAME_BGCOLOR}, 1px -1px 0 ${GAME_BGCOLOR}, 0px 1px 0 ${GAME_BGCOLOR}, 0-1px 0 ${GAME_BGCOLOR}, -1px 0 0 ${GAME_BGCOLOR}, 1px 0 0 ${GAME_BGCOLOR}`;
const getCommonLabelContainer = (theme: Theme): any => ({
  display: "flex",
  width: "100%",
  position: "absolute",
  color: theme.palette.secondary.main,
  alignItems: "center",
  textShadow: outline,
  zIndex: 2,
  justifyContent: "center",
  textAlign: "center",
});

const useStyles = makeStyles(theme => ({
  rootContainer: {
    position: "relative",
    height: "100vh"
  },
  titleContainer: {
    ...getCommonLabelContainer(theme),
    top: "48%",
    bottom: "52%",
  },
  scoreContainer: {
    ...getCommonLabelContainer(theme),
    top: "2vh",
  },
  button: {
    boxShadow: outline
  },
}));

type Props = {
  mode: Mode;
  score: number;
  setMode: (mode:Mode) => void;
};

const GamePage: React.FC<Props> = (props) => {
  const classes = useStyles();

  const handleClickStart = () => {
    props.setMode(Mode.Playing);
  };

  const handleClickRetry = () => {
    props.setMode(Mode.Retry);
  };

  const getLabelComponent = (props: Props) => {
    switch (props.mode) {
      case Mode.Playing:
      case Mode.Retry:
        return (
          <Box display="flex" className={classes.scoreContainer}>
            <Box fontWeight={600}>Score: {props.score}</Box>
          </Box>
        );
      default:
        //for Mode.Title
        let buttonLabel = "START";
        let mainText = "Tap falling objects.";
        let callback = handleClickStart;
        if (props.mode === Mode.GameOver) {
          //for Mode.GameOver
          buttonLabel = "RETRY";
          mainText = "GAME OVER";
          callback = handleClickRetry;
        }
        return (
          <Box display="flex" flexDirection="column" className={classes.titleContainer}>
            <Box p={2} fontSize="h4.fontSize" fontWeight={800}>{mainText}</Box>
            <Box my={1}>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={callback}
                className={classes.button}
              >
                <Box fontWeight={800}>{buttonLabel}</Box>
              </Button>
            </Box>
          </Box>
        );
    }
  }
  
  return (
    <Box className={classes.rootContainer} bgcolor="red" >
      <GameContainer />
      {getLabelComponent(props)}
    </Box>
  );
};

export default GamePage;