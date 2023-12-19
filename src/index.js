import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { store } from "./redux/Store";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import "@radix-ui/themes/styles.css";

import { Theme } from "@radix-ui/themes";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Theme>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </BrowserRouter>
  </Theme>
);
