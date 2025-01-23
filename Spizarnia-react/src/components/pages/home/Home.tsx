import { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AxiosApi from "../../../api/axiosApi.ts";
import { addCategories } from "../../../features/category/categorySlice.ts";
import HomeContainers from "./HomeContainers.tsx";

function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCategories = async () => {
        try {
            const response : AxiosResponse = await AxiosApi.axiosCategories.get('')//.catch((error) => {console.error('Error: ', error)});
            dispatch(addCategories(response.data));
            console.log(response.data);
        }
        catch(error) {
            console.error('Error: ', error);
        }
        }
        fetchCategories();
        
    }, [dispatch]);

    return (
        <>
        <div className="header-container">
        <div className="title">Strona główna</div>
        </div>
        <div className="site-content">
            <HomeContainers/>
        </div>
        </>
    );
}

export default Home;


