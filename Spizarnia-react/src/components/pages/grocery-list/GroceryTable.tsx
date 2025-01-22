import { Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getAllListOfProductsToBuy } from "../../../features/listOfProductsToBuy/listOfProductsToBuySlice.ts";
import { DataGrid } from "@mui/x-data-grid";
function GroceryTable() 
{
    const groceries = useSelector(getAllListOfProductsToBuy).map(groceryItem => ({
        ...groceryItem,
        name: groceryItem.products?.name || "",
        productQuantity: groceryItem.products?.quantity+" "+groceryItem.products?.unit || "",
        categoryName:groceryItem.products?.category?.categoryName || "",
        price: Number(groceryItem.products?.price).toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 0,
        total: (groceryItem.products?.price * groceryItem.quantity).toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 0,


    }));;
    const [openConfirmationDialog, setConfirmationDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<string>("");
    const columns = [
        { field: "id", headerName: "ID", width: 50, headerClassName: 'table-header'},
        { field: "name", headerName: "Nazwa", width: 150, headerClassName: 'table-header' },
        { field: "productQuantity", headerName: "Ilość produktu", width: 100, headerClassName: 'table-header' },
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
                    }}
                    className="action-edit-button"
                >
                    Edytuj
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => {
                    }}
                    className="action-edit-button"
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
        />
    </div>
    ) : (
    <div className="no-data">Brak produktów w spiżarni.</div>
    );

    console.log("Groceries",groceries)

    return (<>
    {renderGroceries}
    </>)
}

export default GroceryTable;


