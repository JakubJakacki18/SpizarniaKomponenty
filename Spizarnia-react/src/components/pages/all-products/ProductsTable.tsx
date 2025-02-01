import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProducts } from "../../../features/products/productSlice.ts";
import { DataGrid } from "@mui/x-data-grid";
import ConfirmationDialog from "../shared/ConfirmationDialog.tsx";
import dayjs from 'dayjs';
import { AppDispatch } from './../../../features/store.ts';

type ProductsTableProps = {
    productsfilter: any[];
};

const ProductsTable = ({ productsfilter }: ProductsTableProps) => {
    const [openConfirmationDialog, setConfirmationDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<string>(""); // Product for deletion dialog
    const [selectedProductId, setSelectedProductId] = useState<string>("-1");
    const dispatch = useDispatch<AppDispatch>();

    const handleDelete = (productId: string) => {
        dispatch(deleteProduct(productId));
        setConfirmationDialog(false); // Close the confirmation dialog after deletion
    };

    const columns = [
        { field: "id", headerName: "ID", width: 50, headerClassName: 'table-header' },
        { field: "name", headerName: "Nazwa", width: 150, headerClassName: 'table-header' },
        { field: "quantity", headerName: "Ilość", width: 100, headerClassName: 'table-header' },
        { field: "categoryName", headerName: "Kategoria", width: 150, headerClassName: 'table-header' },
        { field: "purchaseDate", headerName: "Data Zakupu", width: 150, headerClassName: 'table-header' },
        { field: "expirationDate", headerName: "Data Ważności", width: 180, headerClassName: 'table-header' },
        {
            field: "akcje",
            headerName: "Akcje",
            width: 150,
            headerClassName: 'table-header',
            renderCell: (params) => (
                <button
                    onClick={() => {
                        setSelectedProduct(params.row.name);
                        setSelectedProductId(params.row.id.toString());
                        setConfirmationDialog(true);
                    }}
                    className="action-edit-button">
                    Usuń
                </button>
            ),
        },
    ];

    const today = dayjs();
    const renderProducts = productsfilter.length > 0 ? (
        <div className="table-container">
            <DataGrid
                rows={productsfilter}
                columns={columns}
                disableRowSelectionOnClick
                autoHeight
                getRowClassName={(params) => {
                    const expirationDate = dayjs(params.row.expirationDate);
                    const daysToExpiration = expirationDate.diff(today, 'day');

                    if (daysToExpiration < 0) {
                        return 'expired';
                    } else if (daysToExpiration < 1) {
                        return 'almost-expired';
                    } else if (daysToExpiration <= 3) {
                        return 'soon-expiring';
                    } else if (daysToExpiration > 3) {
                        return 'expiring';
                    }
                    return '';
                }}
                sx={{
                    border: "1px solid var(--background-color)",
                    fontFamily: '"Poppins", "Arial Black"',
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
            {renderProducts}

            <ConfirmationDialog
                title={"Usuwanie produktu"}
                content={`Czy chcesz usunąć produkt ${selectedProduct}?`}
                openConfirmationDialog={openConfirmationDialog}
                setConfirmationDialog={setConfirmationDialog}
                actionFunction={handleDelete}
                dataToFunction={selectedProductId}
            />
        </>
    );
};

export default ProductsTable;
