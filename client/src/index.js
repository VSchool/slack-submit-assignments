import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { Provider } from "riddl-js";
import globalState from "./riddl";

render(
    <Provider globalState={globalState}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById("root"));