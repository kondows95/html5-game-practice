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
  textShadow: outline,
  zIndex: 2,
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  backgroundColor: GAME_BGCOLOR,
});

const useStyles = makeStyles(theme => ({
  rootContainer: {
    position: "relative",
    height: "100vh",
    backgroundColor: GAME_BGCOLOR,
  },
  titleContainer: {
    ...getCommonLabelContainer(theme),
    top: "48%",
    bottom: "52%",
  },
  scoreContainer: {
    ...getCommonLabelContainer(theme),
    top: "3%",
    bottom: "97%",
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

const Page: React.FC<Props> = (props) => {
  const classes = useStyles();

  const getScoreLabel = (props: Props) : React.ReactElement | null => {
    if (props.mode === Mode.Title) { return null; }
    return (
      <Box className={classes.scoreContainer} fontSize="subtitle1.fontSize">
        <Box fontWeight={600}>
          Score: {props.score}   
        </Box>
      </Box>
    );
  }

  const getTitleLabel = (props: Props) : React.ReactElement | null => {
    if (props.mode === Mode.Playing || props.mode === Mode.Retry) { return null; }

    //for Mode.Title
    let buttonLabel = "START";
    let mainText = "Tap falling objects.";
    let callback = () => {
      props.setMode(Mode.Playing);
    };
    if (props.mode === Mode.GameOver) {
      //for Mode.GameOver
      buttonLabel = "RETRY";
      mainText = "GAME OVER";
      callback = () => {
        props.setMode(Mode.Retry);
      };
    }
    return (
      <Box flexDirection="column" className={classes.titleContainer}>
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
  
  return (
    <Box className={classes.rootContainer} bgcolor={GAME_BGCOLOR} >
      <GameContainer />
      {getScoreLabel(props)}
      {getTitleLabel(props)}
    </Box>
  );
};

export default Page;