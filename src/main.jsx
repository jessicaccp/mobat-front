import React from "react";
import ReactDOM from "react-dom/client";
import App from "src/App";
import "assets/style.css";

// Creates a div called root, where the application will be rendered.
// Also defines the routes of the app.
const rootDiv = document.getElementById("root");
const container = ReactDOM.createRoot(rootDiv);
container.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
