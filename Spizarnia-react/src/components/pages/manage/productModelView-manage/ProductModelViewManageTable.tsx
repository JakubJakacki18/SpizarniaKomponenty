import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductModel, getAllProductModels } from "../../../../features/productModels/productModelSlice.ts";
import { DataGrid } from "@mui/x-data-grid";
import ConfirmationDialog from "../../shared/ConfirmationDialog.tsx";
import { AppDispatch } from "../../../../features/store.ts";
import EditProductModelDialog from "../../shared/EditDialog.tsx";

function ProductModelViewManageTable()
{
    const [editDialog, setEditDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
        const [deleteDialog, setDeleteDialog] = useState(false);
        const [selectedProductModelName, setSelectedProductModelName] = useState<string>(""); // Product for deletion dialog
        const [selectedProductModelId, setSelectedProductModelId] = useState<string>("-1");
    const productModels = useSelector(getAllProductModels).map(product => ({
        ...product,
        categoryName: product.category?.categoryName || "",
    }));
    const dispatch : AppDispatch= useDispatch();
    const handleDelete = (productModelId) => 
        {
            dispatch(deleteProductModel(productModelId))
        }

    const columns = [
        { field: "id", headerName: "ID", width: 50, headerClassName: 'table-header'},
        { field: "name", headerName: "Nazwa", width: 150, headerClassName: 'table-header' },
        { field: "quantity", headerName: "Ilość", width: 100, headerClassName: 'table-header', renderCell: (params) => {
            const quantity = params.row.quantity || 0;
            const unit = params.row.unit || "";
            return `${quantity} ${unit}`;} },
        { field: "categoryName", headerName: "Kategoria", width: 150 , headerClassName: 'table-header' },
        { field: "type", headerName: "Typu", width: 150, headerClassName: 'table-header' },
        { field: "price", headerName: "Cena", width: 150, headerClassName: 'table-header', renderCell: (params) => {
            const price = params.row.price || 0;
            return `${price} zł`;
        }},
        {
          field: "akcje",
          headerName: "Akcje",
          width: 300,
          headerClassName: 'table-header',
            renderCell: (params) => (
                <>
                    <button
                        onClick={() => {
                            setSelectedProduct(params.row);
                            setEditDialog(true);
                        }}
                        className="action-edit-button"
                    >
                        Edytuj
                    </button>
                <button
                    onClick={() => {
                        setSelectedProductModelName(params.row.name);
                        setSelectedProductModelId(params.row.id);
                        setDeleteDialog(true);
                    }}
                    className="action-edit-button">
                    Usuń
                </button>
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
        <>
        <div className="manage-content">
            <div className="title-manage">Zarządzaj produktami</div>
            {renderProductModels}

        </div>
        <ConfirmationDialog
        title={"Usuwanie elementu"}
        content={`Czy chcesz usunąć ${selectedProductModelName} z katalogu?`}
        openConfirmationDialog={deleteDialog}
        setConfirmationDialog={setDeleteDialog}
        actionFunction={handleDelete}
        dataToFunction={selectedProductModelId}
            />
            <EditProductModelDialog
                openEditDialog={editDialog}
                setEditDialog={setEditDialog}
                selectedProduct={selectedProduct}
            />
        </>


    )
}
export default ProductModelViewManageTable;