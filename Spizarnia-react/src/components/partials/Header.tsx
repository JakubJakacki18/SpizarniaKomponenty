import React from "react";
import {NavLink} from "react-router-dom";

function classNameSelectorTitleButton(isActive : boolean)
{
    return isActive ? "header-active" : ""
}

function classNameSelectorNavButton(isActive : boolean)
{
    return isActive ? "active-link" : "action-button"
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
                <NavLink to="/all-products" className={({ isActive }) => classNameSelectorNavButton(isActive)}>Moja Spizarnia</NavLink >
                <NavLink to="/manage" className={({ isActive }) => classNameSelectorNavButton(isActive)}>Zarządzaj</NavLink >
                <NavLink to="/recipes" className={({ isActive }) => classNameSelectorNavButton(isActive)}>Przepisy</NavLink >
                <NavLink to="/grocery-list" className={({ isActive }) => classNameSelectorNavButton(isActive)}>Lista Zakupów</NavLink >

            </div>
        </div>
        )
    }

export default Header;
