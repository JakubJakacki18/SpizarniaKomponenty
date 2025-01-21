import React from "react";
import { Outlet } from "react-router-dom";

function Manage() {
    return (
        <div>
            <h1>Manage</h1>
            <p>To jest strona główna aplikacji.</p>
            <Outlet />
        </div>
    );
}

export default Manage
