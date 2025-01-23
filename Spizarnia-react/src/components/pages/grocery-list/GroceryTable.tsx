import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editGroceryEntry, getAllListOfProductsToBuy } from "../../../features/listOfProductsToBuy/listOfProductsToBuySlice.ts";
import { DataGrid } from "@mui/x-data-grid";
import GroceryEditDialog from "./GroceryEditDialog.tsx";
import { Product } from "../../../../../Spizarnia-backend/src/models/Product.ts";
import { AppDispatch } from "../../../features/store.ts";
function GroceryTable() 
{
    const dispatch = useDispatch<AppDispatch>();
    const groceries = useSelector(getAllListOfProductsToBuy).map(groceryItem => ({
        ...groceryItem,
        name: groceryItem.products?.name || "",
        productQuantity: groceryItem.products?.quantity+" "+groceryItem.products?.unit || "",
        categoryName:groceryItem.products?.category?.categoryName || "",
        price: Number(groceryItem.products?.price).toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 0,
        total: (groceryItem.products?.price * groceryItem.quantity).toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 0,
    }));;
    const [openConfirmationDialog, setConfirmationDialog] = useState(false);
    const [openEditDialog, setEditDialog] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string>("");

    const handleDelete = (productToBuyId) => {
        //dispatch(deleteProduct(productId));
      };
    const handleEdit = (productToBuyId,newQuantity) => {
        dispatch(editGroceryEntry({productToBuyId,newQuantity}));
    };

    const columns = [
        { field: "id", headerName: "ID", width: 50, headerClassName: 'table-header'},
        { field: "name", headerName: "Nazwa", width: 150, headerClassName: 'table-header' },
        { field: "productQuantity", headerName: "Ilość produktu", width: 200, headerClassName: 'table-header' },
        { field: "categoryName", headerName: "Kategoria", width: 150 , headerClassName: 'table-header' },
        { field: "quantity", headerName: "Ilość", width: 150, headerClassName: 'table-header' },
        { field: "price", headerName: "Cena", width: 150, headerClassName: 'table-header' },
        { field: "total", headerName: "Suma", width: 150, headerClassName: 'table-header' },
        {
          field: "akcje",
          headerName: "Akcje",
          width: 300,
          headerClassName: 'table-header',
            renderCell: (params) => (
                <>
                <Button
                    variant="outlined"
                    onClick={() => {
                        setEditDialog(true);
                        setSelectedProductId(params.row.id);
                    }}
                    className="action-edit-button"
                    sx={{
                        color: 'var(--font-color)',
                        backgroundColor: 'var(--primary-color)',
                        borderColor: 'var(--font-color)',
                        margin: '0 10px',
                        fontFamily: '"Poppins", "Arial Black", sans-serif',
                        '&:hover': {
                            backgroundColor: 'var(--secondary-left)',
                            background: 'linear-gradient(90deg, var(--secondary-left) 0%, var(--secondary-right) 100%)',
                            color: 'var(--font-color-hover)',
                        },
                    }}
                >
                    Edytuj
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => {
                    }}
                    className="action-edit-button"
                    sx={{
                        color: 'var(--font-color)',
                        backgroundColor: 'var(--primary-color)',
                        borderColor: 'var(--font-color)',
                        fontFamily: '"Poppins", "Arial Black", sans-serif',
                        '&:hover': {
                            backgroundColor: 'var(--secondary-left)',
                            background: 'linear-gradient(90deg, var(--secondary-left) 0%, var(--secondary-right) 100%)',
                            color: 'var(--font-color-hover)',
                        },
                    }}
                >
                    Usuń
                </Button>
                </>
            ),
        },
      ];
    let renderGroceries =<p></p>;
    renderGroceries = groceries.length > 0 ? (
    <div className="table-container">
        <DataGrid
            rows={groceries}
            columns={columns}
            disableRowSelectionOnClick
            autoHeight
                sx={{
                    border: "1px solid var(--background-color)",
                    fontFamily: '"Poppins", "Arial Black"',
                    color: 'var(--primary-color)',
                    '& .MuiDataGrid-cell': {
                        border: '1px solid var(--font-color)',
                        backgroundColor: 'var(--font-color)',
                        fontFamily: '"Poppins", "Arial Black"',
                    },
                    '& .MuiDataGrid-columnHeader': {
                        border: '1px solid var(--font-color)',
                        backgroundColor: 'var(--font-color)',
                        fontFamily: '"Poppins", "Arial Black"',
                    },
                    '& .MuiDataGrid-row': {
                        borderBottom: '1px solid var(--font-color)',
                        backgroundColor: 'var(--font-color)',
                        fontFamily: '"Poppins", "Arial Black"',
                    },
                }}
        />
    </div>
    ) : (
    <div className="no-data">Brak produktów w spiżarni.</div>
    );

    console.log("Groceries",groceries)

    return (<>
    {renderGroceries}
    <GroceryEditDialog
    handleEdit = {handleEdit}
    productToBuyId = {selectedProductId}
    openEditDialog = {openEditDialog}
    setEditDialog = {setEditDialog}
    />
    </>)
}

export default GroceryTable;


function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}

