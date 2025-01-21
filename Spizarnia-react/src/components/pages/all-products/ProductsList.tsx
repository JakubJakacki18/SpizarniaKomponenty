import React from 'react';
import { useSelector } from 'react-redux';
import { getAllProducts } from '../../../features/products/productSlice.ts';
function ProductList()
{
    const products = useSelector(getAllProducts);
    console.log("Produkty",products);
    let renderProducts =<p></p>;
    renderProducts = products.Response === "True" ? (<p></p>) : (<p>"Brak produktów"</p>);
    return (<p>renderProducts</p>);
}

export default ProductList;