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
    let renderProductModels =<p></p>;
    renderProductModels = productModels.length > 0 ? (
    <div className="table-container">
        <DataGrid
            rows={productModels}
            columns={columns}
            disableRowSelectionOnClick
            autoHeight
                sx={{
                    border: "1px solid var(--background-color)",
                    fontFamily: '"Poppins", "Arial Black"',
                    color:'var(--primary-color)',
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

    return (
        <div className="manage-content">
            <div className="title-manage">Zarządzaj produktami</div>

            {renderProductModels}

        </div>
    )
}
export default ProductModelViewManageTable;