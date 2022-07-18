import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from 'react-router-dom';
import {store} from '../src/store';
import {Provider} from 'react-redux';

import "./index.scss";


import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import "../src/assets/styles/critical.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </ThemeProvider>
  </>
);
