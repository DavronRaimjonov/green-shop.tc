import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ProviderConf from "./tools/provider/provider";
import Root from "./root";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ProviderConf>
      <Root />
    </ProviderConf>
  </React.StrictMode>,
);
