import { GameState, Mode } from "../types";
import { AnyAction } from "redux";

const initialState: GameState = {
  mode: Mode.Title,
  score: 0,
};

//=============================================================================
//Reducers
//=============================================================================
export default (state: GameState = initialState, action: AnyAction): GameState => {
  switch (action.type) {
    case 'GAME_SET_CURRENT_SCORE':
      return {
        ...state,
        score: action.payload
      };
    case 'GAME_SET_MODE': {
      console.log('GAME_SET_MODE', action.payload)
      const score = (action.payload as Mode === Mode.Retry) ? 0 : state.score;
      return {
        ...state,
        mode: action.payload,
        score: score,
      };
    }
    default:
      return state;
  }
};

//=============================================================================
//Action creators
//=============================================================================
export const setScore = (value: number) => ({
  type: 'GAME_SET_CURRENT_SCORE',
  payload: value
});

export const setMode = (mode: Mode) => ({
  type: 'GAME_SET_MODE',
  payload: mode
});