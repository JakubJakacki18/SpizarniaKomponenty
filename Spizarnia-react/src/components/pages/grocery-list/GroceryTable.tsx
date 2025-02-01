import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroceryEntry, editGroceryEntry, getAllListOfProductsToBuy } from "../../../features/listOfProductsToBuy/listOfProductsToBuySlice.ts";
import { DataGrid } from "@mui/x-data-grid";
import GroceryEditDialog from "./GroceryEditDialog.tsx";
import { AppDispatch } from "../../../features/store.ts";
import ConfirmationDialog from "../shared/ConfirmationDialog.tsx";

interface GroceryTableProps {
    searchTerm: string; // Prop do przechowywania terminu wyszukiwania
}

function GroceryTable({ searchTerm }: GroceryTableProps) {
    const dispatch = useDispatch<AppDispatch>();
    const groceries = useSelector(getAllListOfProductsToBuy).map((groceryItem) => ({
        ...groceryItem,
        name: groceryItem.products?.name || "",
        productQuantity: `${groceryItem.products?.quantity} ${groceryItem.products?.unit || ""}`,
        categoryName: groceryItem.products?.category?.categoryName || "",
        price: Number(groceryItem.products?.price)
            .toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 0,
        total: (groceryItem.products?.price * groceryItem.quantity)
            .toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 0,
    }));

    // Filtracja produktów na podstawie wyszukiwania
    const filteredGroceries = groceries.filter((grocery) =>
        grocery.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [openEditDialog, setEditDialog] = useState(false);
    const [openDeleteDialog, setDeleteDialog] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string>("");
    const [selectedProduct, setSelectedProduct] = useState<string>("");

    const handleDelete = (productToBuyId: string) => {
        dispatch(deleteGroceryEntry({ productToBuyId }));
        setDeleteDialog(false); // Zamknij okno dialogowe po usunięciu
    };

    const handleEdit = (productToBuyId: string, newQuantity: number) => {
        dispatch(editGroceryEntry({ productToBuyId, newQuantity }));
        setEditDialog(false); // Zamknij okno dialogowe po edytowaniu
    };

    const columns = [
        { field: "id", headerName: "ID", width: 50, headerClassName: 'table-header' },
        { field: "name", headerName: "Nazwa", width: 150, headerClassName: 'table-header' },
        { field: "productQuantity", headerName: "Ilość produktu", width: 200, headerClassName: 'table-header' },
        { field: "categoryName", headerName: "Kategoria", width: 150, headerClassName: 'table-header' },
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
                    <button
                        variant="outlined"
                        onClick={() => {
                            setSelectedProduct(params.row.name);
                            setSelectedProductId(params.row.id);
                            setEditDialog(true);
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
                    </button>
                    <button
                        variant="outlined"
                        onClick={() => {
                            setSelectedProduct(params.row.name);
                            setSelectedProductId(params.row.id);
                            setDeleteDialog(true);
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
                    </button>
                </>
            ),
        },
    ];

    const renderGroceries = filteredGroceries.length > 0 ? (
        <div className="table-container">
            <DataGrid
                rows={filteredGroceries}
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
        <div className="no-data">Brak produktów na liście zakupów.</div>
    );

    return (
        <>
            {renderGroceries}
            <GroceryEditDialog
                handleEdit={handleEdit}
                productToBuyId={selectedProductId}
                openEditDialog={openEditDialog}
                setEditDialog={setEditDialog}
            />
            <ConfirmationDialog
                title={"Usuwanie elementu"}
                content={`Czy chcesz usunąć ${selectedProduct} z listy zakupów?`}
                openConfirmationDialog={openDeleteDialog}
                setConfirmationDialog={setDeleteDialog}
                actionFunction={handleDelete}
                dataToFunction={selectedProductId}
            />
        </>
    );
}

export default GroceryTable;
