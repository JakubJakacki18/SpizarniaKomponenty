import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { addProducts, getAllProducts } from "../../../../features/products/productSlice.ts";
import { AppDispatch } from "../../../../features/store.ts";
import { AxiosResponse } from "axios";
import AxiosApi from "../../../../api/axiosApi.ts";

function ContainerManage() {
    const { categoryName } = useParams<{ categoryName: string }>();
    const dispatch : AppDispatch = useDispatch();
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response: AxiosResponse = await AxiosApi.axiosProducts.get('');
                dispatch(addProducts(response.data));
                console.log(response.data);
            } catch (error) {
                console.error('Error: ', error);
            }
        };
        fetchProducts();
    }, [dispatch]);


    const products = useSelector(getAllProducts).filter(product => product.categoryName===categoryName)
    const columns = [
                { field: "id", headerName: "ID", width: 50, headerClassName: 'table-header' },
                { field: "name", headerName: "Nazwa", width: 150, headerClassName: 'table-header' },
                { field: "quantity", headerName: "Ilość", width: 100, headerClassName: 'table-header' },
                { field: "unit", headerName: "Jednostka", width: 50, headerClassName: 'table-header' },
                { field: "type", headerName: "Podkategoria", width: 150, headerClassName: 'table-header' },
                { field: "purchaseDate", headerName: "Data Zakupu", width: 150, headerClassName: 'table-header' },
                { field: "expirationDate", headerName: "Data Ważności", width: 180, headerClassName: 'table-header' }]

    const table = products?.length > 0 ? (
                <div className="table-container">
                    <DataGrid
                        rows={products}
                        columns={columns}
                        disableRowSelectionOnClick
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
                <div className="no-data">Brak produktów w kontenerze {categoryName}.</div>
            );
    const contentToRender = (!products) ?  
    <div className="no-data"> Dane nie zostały prawidłowo doczytane do kategorii {categoryName}.</div> : table
    console.log("Szukana kategoria: ",products)
    return (
        <div className="site-content">
            <div className="title-manage">Produkty z kategorii {categoryName}</div>
                <div className="container-wrapper">
                    {contentToRender}
                </div>
        </div>
    );
}

export default ContainerManage;