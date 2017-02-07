require("./index.html");

import {createElement} from "react";
import {render} from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from 'redux-thunk';

import ConnectedApp from "./app";
import drumMachine from "./store";

const store = createStore(drumMachine, applyMiddleware(thunk));

const tick = () => {
  return {type: 'TICK'}
};

const alwaysTick = (tempo) => {
  setTimeout(() => {
    const {step, tempo, tracks} = store.getState();
    tracks.forEach(t =>
      t.instruments.filter(function(track) { return track.steps[step]; })
      .forEach(function(track) { track.play(); })
    );
    store.dispatch(tick());
    alwaysTick(tempo);
  }, 60000 / tempo / 4);
};

alwaysTick(store.getState().tempo);

render(
  createElement(Provider, {store: store}, createElement(ConnectedApp)),
  document.getElementById('app')
);