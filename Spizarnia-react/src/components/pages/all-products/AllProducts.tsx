import React, { useEffect, useState } from "react";
import AxiosApi from "../../../api/axiosApi.ts";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, getAllProducts } from "../../../features/products/productSlice.ts";
import { AxiosResponse } from "axios";
import ProductTable from "./ProductsTable.tsx";
import { NavLink } from "react-router-dom";
import StyleFunctions from "../../../shared/styleFunctions.ts";
import { Product } from "../../../../../Spizarnia-backend/src/models/Product.ts";
import { Notify } from "../../../shared/Notify.ts";



function AllProducts() {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const products = useSelector(getAllProducts).map((product:Product) =>({
        id: product.id,
        purchaseDate: product.purchaseDate,
        expirationDate: product.expirationDate,
        name: product.productModel?.name ?? "",
        type: product.productModel?.type ?? "",
        price: product.productModel?.price ?? "",
        quantity: (product.productModel?.quantity && product.productModel?.unit) 
        ? (product.productModel.quantity +" "+ product.productModel.unit) 
        : "",
        categoryName: product.productModel?.category?.categoryName 
    }));

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response: AxiosResponse = await AxiosApi.axiosProducts.get('/NoMap');
                dispatch(addProducts(response.data));
                console.log(response.data);
            } catch (error) {
                console.error('Error: ', error);
            }
        };
        fetchProducts();
    }, [dispatch]);
    useEffect(()=>{
        if(products.some((product)=>{
            const currentDate = new Date();
            const expirationDate = new Date(product.expirationDate);
            const timeDifference = expirationDate.getTime() - currentDate.getTime();
            const daysDifference = timeDifference / (1000 * 3600 * 24);
            return daysDifference<=3
            }))
        Notify("Zbliża się termin przydatności produktów!")
    },[products])

    // Funkcja obsługująca wyszukiwanie
    function onSearch(): void {
        // Nic do zrobienia tutaj, bo wyszukiwanie jest realizowane w czasie rzeczywistym
        // przez filtrację w komponencie ProductTable
    }

    function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value);
    }

    // Filtrujemy produkty na podstawie searchTerm
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="header-container">
                <div className="title">Moja spiżarnia</div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Wyszukaj przepis..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <NavLink to="/manage/product" className={({ isActive }) => StyleFunctions.classNameSelectorNavButton(isActive)}>Dodaj produkt</NavLink>
                </div>
            </div>

            <div className="site-content">
                <ProductTable productsfilter={filteredProducts} />
            </div>
        </>
    );
}

export default AllProducts;
