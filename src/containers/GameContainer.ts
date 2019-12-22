import { connect } from 'react-redux';
import GameContainer from '../components/GameContainer';
import { AppState, AppDispatch, Mode } from '../types';
import { setMode, setScore } from '../modules/game';

export const mapStateToProps = (state: AppState) => ({
  mode: state.game.mode,
});

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setScore: (value: number) => dispatch(setScore(value)),
  setMode: (mode: Mode) => dispatch(setMode(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);