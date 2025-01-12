import React from "react";
import { RouterProvider } from "react-router-dom";

import { Routes } from "./components/Routes.tsx";
import "./styles.css"


const App: React.FC = () => {
    return (
        <>
        <RouterProvider router = {Routes}/>
        </>
    );
};

export default App;
