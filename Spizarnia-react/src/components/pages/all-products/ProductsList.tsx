import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getAllProducts } from "../../../features/products/productSlice.ts";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ConfirmationDialog from "../shared/ConfirmationDialog.tsx";
import { Category } from "../../../../../Spizarnia-backend/src/models/Category.ts";
import { NavLink } from "react-router-dom";
import dayjs from 'dayjs';


function ProductList() {
  const products = useSelector(getAllProducts);
  const [openConfirmationDialog, setConfirmationDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>(""); // Product for deletion dialog

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
                onClick={() => {
                  setSelectedProduct(params.row.name); // Store selected product name
                  setConfirmationDialog(true); // Open delete dialog
                }}
                className="action-edit-button"
            >
                Usuń
            </Button>
        ),
    },
  ];

function ProductList()
{
    const today = dayjs(); 
    const products = useSelector(getAllProducts);
    console.log("Produkty",products);
    let renderProducts =<p></p>;
    renderProducts = products.length > 0 ? (
    <div className="table-container">
        <DataGrid
            rows={products}
            columns={columns}
                autoHeight
                getRowClassName={(params) => {
                    const expirationDate = dayjs(params.row.expirationDate);
                    const daysToExpiration = expirationDate.diff(today, 'day');

                    if (daysToExpiration < 0) {
                        return 'expired';
                    } else if (daysToExpiration < 1) {
                        return 'almost-expired';
                    } else if (daysToExpiration < 3) {
                        return 'soon-expiring';
                    } else if (daysToExpiration <= 7) {
                        return 'expiring';
                    }
                    return ''; 
                }}
            sx={{
                border: "2px solid var(--background-color)",
                fontFamily: '"Poppins", "Arial Black"', 
                '& .MuiDataGrid-cell': {
                    border: '2px solid var(--background-color)', 
                    fontFamily: '"Poppins", "Arial Black"',
                },
                '& .MuiDataGrid-columnHeader': {
                    border: '2px solid var(--background-color)', 
                    fontFamily: '"Poppins", "Arial Black"', 
                },
                '& .MuiDataGrid-row': {
                    borderBottom: '2px solid var(--background-color)', 
                    fontFamily: '"Poppins", "Arial Black"',
                },
            }}
        />
    </div>
) : (
    <div className="no-data">Brak produktów w spiżarni.</div>
);

return (
  <>
      {renderProducts}
      
      <ConfirmationDialog
        title={"produktu"}
        content={"mleko - testowo"}
        openConfirmationDialog={openConfirmationDialog}
        setConfirmationDialog={setConfirmationDialog}
      />
  </>
);
}     
}
export default ProductList;
