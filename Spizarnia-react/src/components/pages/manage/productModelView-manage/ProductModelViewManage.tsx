import { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AxiosApi from "../../../../api/axiosApi.ts";
import { addProductModels } from "../../../../features/productModels/productModelSlice.ts";
import ProductModelViewManageTable from "./ProductModelViewManageTable.tsx";

function ProductModelViewManage() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchProductModels = async () => {
        try {
            const response : AxiosResponse = await AxiosApi.axiosProductModels.get('')//.catch((error) => {console.error('Error: ', error)});
            dispatch(addProductModels(response.data));
            console.log(response.data);
        }
        catch(error) {
            console.error('Error: ', error);
        }
        }
        fetchProductModels();
        
    }, [dispatch]);
    
    return (
        <>
        <ProductModelViewManageTable/>
        </>
    );
}

export default ProductModelViewManage;
