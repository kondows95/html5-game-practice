import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type AppState = {
  game: GameState,
};

export type AppDispatch = ThunkDispatch<AppState, undefined, AnyAction>;

export type GameState = {
  mode: Mode;
  score: number;
};

export enum Mode {
  Title,
  Playing,
  GameOver,
  Retry,
};

