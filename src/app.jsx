import React from "react";
import {Component} from "react";
import {connect} from "react-redux";
import Track from './track';
import Stepper from './stepper';
import TempoSlider from './tempo-slider';

const toggleStep = (dispatch) => {
  return (track, instrument) => {
    return (beat) => {
      return () => dispatch({type: 'TOGGLE_STEP', track, instrument, beat});
    };
  };
};

const onTempoChange = (dispatch) => {
  return (e) => {
    return dispatch({type: 'SET_TEMPO', tempo: e.target.value});
  };
};

const addTrack = (dispatch) => {
  return () => {
    return dispatch({type: 'ADD_TRACK'});
  };
};

const reset = (dispatch) => {
  return () => {
    return dispatch({type: 'RESET'});
  };
};

export class App extends Component {
  render() {
    return (
      <div>
        <TempoSlider tempo={this.props.tempo} onTempoChange={this.props.onTempoChange}/>
        <button onClick={this.props.addTrack}>Add Track</button>
        <button onClick={this.props.reset}>RESET</button>
        {this.props.tracks.map((track, i) => {
          return (
            <div key={i}>
              {
                track.instruments.map((track, j) => {
                  return <Track track={track} key={j} onStepClick={this.props.toggleStep(i, j)}/>;
                })
              }
              <Stepper currentStep={this.props.step}/>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    toggleStep: toggleStep(dispatch),
    onTempoChange: onTempoChange(dispatch),
    addTrack: addTrack(dispatch),
    reset: reset(dispatch),
  }
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
