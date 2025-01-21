import { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AxiosApi from "../../../api/axiosApi.ts";
import { addCategories } from "../../../features/category/categorySlice.ts";

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
        <div>
            <h1>Home Page</h1>
            <p>To jest strona główna aplikacji.</p>
        </div>
    );
}

export default Home;


