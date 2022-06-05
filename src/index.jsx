import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reducer from "./components/reducer"
import { initialState } from "./components/reducer";
import { StateProvider } from "./components/StateProvider";

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById("root")
);
