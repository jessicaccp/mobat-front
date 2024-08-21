import React from "react";
import ReactDOM from "react-dom/client";
import App from "src/App";
import "assets/style.css";

// Define the root div where the app will be rendered
const rootDiv = document.getElementById("root");
const container = ReactDOM.createRoot(rootDiv);

// Render the app
container.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
