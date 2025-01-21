import React from 'react';
import { useSelector } from 'react-redux';
import { getAllProducts } from '../../../features/products/productSlice.ts';
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

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
          onClick={() => {}}
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
    renderProducts = products.length>0 ? 
    (<div>
        <DataGrid
        rows={products} 
        columns={columns} />
    </div>) : 
    (
    <p>"Brak produktów w spiżarni"</p>
    );
    return (
        <div>
            {renderProducts}

        </div>
    );
}

export default ProductList;