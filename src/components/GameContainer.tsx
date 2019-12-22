import React from 'react';
import { Game, AUTO, Scale } from 'phaser';
import { GameScene, GAME_SCENE_KEY } from '../game/GameScene';
import { TitleScene, TITLE_SCENE_KEY } from '../game/TitleScene';
import { Box } from '@material-ui/core';
import { Mode } from '../types';
import { GAME_BGCOLOR } from '../constatns';

type Props = {
  mode: Mode;
  setScore: (value:number) => void;
  setMode: (mode:Mode) => void;
};

const PARENT_ID = 'game';

const game = new Game({
  width: window.innerWidth,
  height: window.innerHeight,
  type: AUTO,
  parent: PARENT_ID,
  backgroundColor: GAME_BGCOLOR,
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

const initGameWithProps = (props: Props) => {
  console.log('###GameContainer:0 initGameWithProps()')
  game.scene.add(TITLE_SCENE_KEY, TitleScene, true);
  game.scene.add(GAME_SCENE_KEY, GameScene, false);

  game.events.on('onCaught', (starsCaught: number) => {
    console.log('onCaught')
    props.setScore(starsCaught);
  });

  game.events.on('onGameOver', () => {
    console.log('onGameOver')
    props.setMode(Mode.GameOver);
  });
}

const GameContainer: React.FC<Props> = (props) => {
  const isFirstRef = React.useRef(true);
  if (isFirstRef.current) {
    isFirstRef.current = false;
    initGameWithProps(props);   
  }

  React.useEffect(() => {
    if (game === null) { return; }
    switch (props.mode) {
      case Mode.Playing:
        game.scene.start(GAME_SCENE_KEY)
        break;
      case Mode.Retry:
        game.scene.remove(GAME_SCENE_KEY);
        game.scene.add(GAME_SCENE_KEY, GameScene, false)
        props.setMode(Mode.Playing);
        break;
    }
  }, [props.mode, props]);

  return (<Box id={PARENT_ID} />);
};
export default GameContainer;