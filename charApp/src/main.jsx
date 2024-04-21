import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import {store} from "./Store/Store.js"
import { Provider } from "react-redux";
import './index.css'
import { SocketProvider } from "./context/SocketProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
     <SocketProvider>
        <App />
      </SocketProvider>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
