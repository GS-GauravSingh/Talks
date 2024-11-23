import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRoutes from "./AppRoutes";
import store from "./redux/store";
import { Provider as ReduxProvider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ReduxProvider store={store}>
        <AppRoutes />
    </ReduxProvider>
);
