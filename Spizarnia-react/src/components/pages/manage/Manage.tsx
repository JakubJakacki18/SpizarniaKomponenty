import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function classNameSelectorNavButton(isActive : boolean)
{
    return isActive ? "active-link" : "action-button"
}

function Manage() {
    return (
        <>        
        <div className="manage-header-container">
            <div className="title">Zarządzaj</div>
                <div className="button-group">
                    <NavLink to="/manage/productModelView" className={({ isActive }) => classNameSelectorNavButton(isActive)}>Zarządzaj produktami w katalogu</NavLink >
                    <NavLink to="/manage/productModel" className={({ isActive }) => classNameSelectorNavButton(isActive)}>Dodaj produkt do katalogu</NavLink >
                    <NavLink to="/manage/product" className={({ isActive }) => classNameSelectorNavButton(isActive)}>Dodaj produkt do spiżarni</NavLink >
                    <NavLink to="/manage/recipe" className={({ isActive }) => classNameSelectorNavButton(isActive)}>Dodaj przepis</NavLink >
                    <NavLink to="/manage/category" className={({ isActive }) => classNameSelectorNavButton(isActive)}>Dodaj kategorię</NavLink >
                </div>
        </div>

        <div className="site-content">
            <Outlet />
        </div>    
        </>
    );
}

export default Manage
