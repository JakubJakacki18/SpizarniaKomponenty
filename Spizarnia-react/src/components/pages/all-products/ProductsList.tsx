import React from 'react';
import { useSelector } from 'react-redux';
import { getAllProducts } from '../../../features/products/productSlice.ts';
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { NavLink } from "react-router-dom";

function classNameSelectorNavButton(isActive: boolean) {
    return isActive ? "active-link" : "action-button"
} 


const columns = [
    { field: "id", headerName: "ID", width: 50, headerClassName: 'table-header'},
    { field: "name", headerName: "Nazwa", width: 150, headerClassName: 'table-header' },
    { field: "quantity", headerName: "Ilość", width: 100, headerClassName: 'table-header' },
    { field: "categoryName", headerName: "Kategoria", width: 150 , headerClassName: 'table-header' },
    { field: "purchaseDate", headerName: "Data Zakupu", width: 150, headerClassName: 'table-header' },
    { field: "expirationDate", headerName: "Data Ważności", width: 150, headerClassName: 'table-header' },
    {
      field: "akcje",
      headerName: "Akcje",
      width: 150,
      headerClassName: 'table-header',
        renderCell: (params) => (
            <Button
                variant="outlined"
                color="font-color"
                onClick={() => { }}
                className="action-edit-button"
            >
                Usuń
            </Button>
        ),
    },
  ];

function ProductList()
{
    const products = useSelector(getAllProducts);
    console.log("Produkty",products);
    let renderProducts =<p></p>;
    renderProducts = products.length > 0 ? (
        <div className="table-container">
            <DataGrid
                rows={products}
                columns={columns}
                autoHeight
                sx={{
                    border: "2px solid var(--background-color)",
                    fontFamily: '"Poppins", "Arial Black"', // Global font for the entire table
                    '& .MuiDataGrid-cell': {
                        border: '2px solid var(--background-color)', // Border for each cell
                        fontFamily: '"Poppins", "Arial Black"', // Font for each cell
                    },
                    '& .MuiDataGrid-columnHeader': {
                        border: '2px solid var(--background-color)', // Border for each column header
                        fontFamily: '"Poppins", "Arial Black"', // Font for column headers
                    },
                    '& .MuiDataGrid-row': {
                        borderBottom: '2px solid var(--background-color)', // Border for each row
                        fontFamily: '"Poppins", "Arial Black"', // Font for row text
                    },
                }}
            />
        </div>
    ) : (
        <div className="no-data">Brak produktów w spiżarni.</div>
    );

    return (
        <div>
            <div className="header-container">
                <div className="title">Moja Spiżarnia</div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Wyszukaj pyszności..."
                        className="search-input"
                    />
                    <NavLink to="/search" className={({ isActive }) => isActive ? "active-link" : "action-button"}>Szukaj</NavLink>
                    <NavLink to="/add-product" className={({ isActive }) => isActive ? "active-link" : "action-button"}>Dodaj produkt</NavLink>
                </div>
            </div>
            <div className="site-content">
                {renderProducts}
            </div>
        </div>
    );
}

export default ProductList;