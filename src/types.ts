import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type AppDispatch = ThunkDispatch<AppState, undefined, AnyAction>;

export type AppState = {
  game: GameState,
};

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

