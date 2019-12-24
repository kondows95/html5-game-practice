import { connect } from 'react-redux';
import Page from '../components/Page';
import { AppState, AppDispatch, Mode } from '../types';
import { setMode } from '../modules/game';

export const mapStateToProps = (state: AppState) => ({
  mode: state.game.mode,
  score: state.game.score
});

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setMode: (mode: Mode) => dispatch(setMode(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);