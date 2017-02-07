import {combineReducers} from "redux";
import {kickGenerator, noteGenerator, audioContext, hihatGenerator, snareGenerator} from "./audio";

function newSteps() {
  return new Array(TICKS).fill(false);
}

function createInstrument(id, play) {
  return {
    id,
    play,
    steps: newSteps(),
  }
}

export const TICKS = 16;
const defaultTrack = (id) => {
  return {
    id,
    instruments: [
      createInstrument(1, noteGenerator(audioContext, 880)),
      createInstrument(2, noteGenerator(audioContext, 659)),
      createInstrument(3, noteGenerator(audioContext, 587)),
      createInstrument(4, noteGenerator(audioContext, 523)),
      createInstrument(5, noteGenerator(audioContext, 440)),
      createInstrument(6, kickGenerator(audioContext)),
      createInstrument(7, snareGenerator(audioContext)),
      createInstrument(8, hihatGenerator(audioContext)),
    ]
  };
};

function tempo(state = 60, action) {
  switch (action.type) {
    case 'SET_TEMPO':
      return action.tempo;
    default:
      return state;
  }
}

function step(state = 0, action) {
  switch (action.type) {
    case 'TICK':
      return (state + 1) % TICKS;
    default:
      return state;
  }
}

function toggleBeat(track, stepIndex) {return {
    id: track.id,
    play: track.play,
    steps: [
      ...track.steps.slice(0, stepIndex),
      !track.steps[stepIndex],
      ...track.steps.slice(stepIndex+1),
    ]
  };
}

function track(state, action) {
  if (action.track != state.id) return state;

  switch (action.type) {
    case 'TOGGLE_STEP':
      return Object.assign({}, state, {
        instruments: [
          ...state.instruments.slice(0, action.instrument),
          toggleBeat(state.instruments[action.instrument], action.beat),
          ...state.instruments.slice(action.instrument + 1),
        ]
      });
    default:
      return state;
  }
}

function tracks(state = [defaultTrack(0)], action) {
  switch (action.type) {
    case 'RESET':
      return (new Array(state.length).fill(0)).map((_, i) => defaultTrack(i));
    case 'ADD_TRACK':
      return [
        ...state,
        defaultTrack(state.length)
      ];
    default:
      return state.map(t => track(t, action));
  }
}

export default combineReducers({
  tempo,
  step,
  tracks
});