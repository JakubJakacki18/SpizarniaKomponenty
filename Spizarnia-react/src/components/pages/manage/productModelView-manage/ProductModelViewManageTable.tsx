import React from "react";
import { useSelector } from "react-redux";
import { getAllProductModels } from "../../../../features/productModels/productModelSlice.ts";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

function ProductModelViewManageTable()
{
    const productModels = useSelector(getAllProductModels).map(product => ({
        ...product,
        categoryName: product.category?.categoryName || "",
    }));
    const columns = [
        { field: "id", headerName: "ID", width: 50, headerClassName: 'table-header'},
        { field: "name", headerName: "Nazwa", width: 150, headerClassName: 'table-header' },
        { field: "quantity", headerName: "Ilość", width: 100, headerClassName: 'table-header' },
        { field: "categoryName", headerName: "Kategoria", width: 150 , headerClassName: 'table-header' },
        { field: "type", headerName: "Typu", width: 150, headerClassName: 'table-header' },
        { field: "price", headerName: "Cena", width: 150, headerClassName: 'table-header' },
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
    let renderProductModels =<p></p>;
    renderProductModels = productModels.length > 0 ? (
    <div className="table-container">
        <DataGrid
            rows={productModels}
            columns={columns}
            disableRowSelectionOnClick
            autoHeight
        />
    </div>
    ) : (
    <div className="no-data">Brak produktów w spiżarni.</div>
    );

    return (
        <>
        {renderProductModels}
        </>
    )
}
export default ProductModelViewManageTable;