import React from 'react';
import { Game, AUTO, Scale } from 'phaser';
import { GameScene, SCENE_KEY } from '../game/GameScene';
import { Box } from '@material-ui/core';
import { Mode } from '../types';
import { GAME_BGCOLOR } from '../constatns';

type Props = {
  mode: Mode;
  setScore: (value:number) => void;
  setMode: (mode:Mode) => void;
};

const PARENT_ID = 'game';

let game: Game | null = null;
const initGame = (props: Props) => {
  console.log('###GameContainer:0 initGame()')

  game = new Game({
    width: window.innerWidth,
    height: window.innerHeight,
    type: AUTO,
    parent: PARENT_ID,
    backgroundColor: GAME_BGCOLOR,
    scene: GameScene,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      },
    },
    scale: {
      mode: Scale.FIT,
      autoCenter: Scale.CENTER_BOTH
    },
  });

  game.events.on('onCaught', (starsCaught: number) => {
    props.setScore(starsCaught);
  });
  game.events.on('onGameOver', () => {
    props.setMode(Mode.GameOver);
  });
}

const GameContainer: React.FC<Props> = (props) => {
  const isFirstRef = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false;
      initGame(props);
    }
  });
  
  React.useEffect(() => {
    if (game === null) { return; }
    switch (props.mode) {
      case Mode.Playing:
        game.scene.resume(SCENE_KEY);
        break;
      case Mode.Retry:
        game.canvas.remove();
        initGame(props);
        props.setMode(Mode.Playing);
        break;
      default: return;
    }
  }, [props.mode, props]);

  return (<Box id={PARENT_ID} />);
};
export default GameContainer;