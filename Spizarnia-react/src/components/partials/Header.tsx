import React from "react";
import {NavLink} from "react-router-dom";
import StyleFunctions from "../../shared/styleFunctions.ts";

function classNameSelectorTitleButton(isActive : boolean)
{
    return isActive ? "header-active" : ""
}

const Header = () => 
    {
        return (
            <div className="header-container">
                <div className="title-section">
                    <div className="header-title">
                        <NavLink to="/" className={({ isActive }) => classNameSelectorTitleButton(isActive)}>Spiżarnia domowa</NavLink >
                    </div>
                </div>
            <div className="button-section">
                <NavLink to="/all-products" className={({ isActive }) => StyleFunctions.classNameSelectorNavButton(isActive)}>Moja Spizarnia</NavLink >
                <NavLink to="/manage" className={({ isActive }) => StyleFunctions.classNameSelectorNavButton(isActive)}>Zarządzaj</NavLink >
                <NavLink to="/recipes" className={({ isActive }) => StyleFunctions.classNameSelectorNavButton(isActive)}>Przepisy</NavLink >
                <NavLink to="/grocery-list" className={({ isActive }) => StyleFunctions.classNameSelectorNavButton(isActive)}>Lista Zakupów</NavLink >

            </div>
        </div>
        )
    }

export default Header;
