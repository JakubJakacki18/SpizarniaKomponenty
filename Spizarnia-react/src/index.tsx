import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import {store} from "./features/store.ts";
const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Element o ID 'root' nie został znaleziony w DOM");
}

const root = ReactDOM.createRoot(rootElement as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
