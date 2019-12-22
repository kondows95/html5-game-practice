import { combineReducers } from 'redux';
import { GameState } from '../types';
import gameReducer from './game';

export interface State {
  game: GameState
}

export default combineReducers<State>({
  game: gameReducer,
});



