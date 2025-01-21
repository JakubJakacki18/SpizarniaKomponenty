import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getAllProducts } from "../../../features/products/productSlice.ts";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ConfirmationDialog from "../shared/ConfirmationDialog.tsx";
import { Category } from "../../../../../Spizarnia-backend/src/models/Category.ts";

function ProductList() {
  const products = useSelector(getAllProducts);
  const [openConfirmationDialog, setConfirmationDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>(""); // Product for deletion dialog

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Nazwa", width: 150 },
    { field: "quantity", headerName: "Ilość", width: 100 },
    { field: "categoryName", headerName: "Kategoria", width: 150 },
    { field: "purchaseDate", headerName: "Data Zakupu", width: 150 },
    { field: "expirationDate", headerName: "Data Ważności", width: 150 },
    {
      field: "akcje",
      headerName: "Akcje",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            setSelectedProduct(params.row.name); // Store selected product name
            setConfirmationDialog(true); // Open delete dialog
          }}
        >
          Usuń
        </Button>
      ),
    },
  ];

  return (
    <div>
      {products.length > 0 ? (
        <div>
          <DataGrid rows={products} columns={columns} />
        </div>
      ) : (
        <p>Brak produktów w spiżarni</p>
      )}
      <ConfirmationDialog
        title={"produktu"}
        content={"mleko - testowo"}
        openConfirmationDialog={openConfirmationDialog}
        setConfirmationDialog={setConfirmationDialog}
      />
    </div>
  );
}

export default ProductList;
