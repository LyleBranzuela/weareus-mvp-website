import "./assets/fonts/MyFontsWebfontsKit/MyFontsWebfontsKit.css";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.querySelector("#root")
);
