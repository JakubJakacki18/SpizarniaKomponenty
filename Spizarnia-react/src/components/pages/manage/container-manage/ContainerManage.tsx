import React from "react";
import { useParams } from 'react-router-dom';

function ContainerManage() {
    const { categoryName } = useParams();

    return (
        <div>
            <h1>Container</h1>
            <p>Category Name: {categoryName}</p>
            <p>To jest strona dodawania kategorii.</p>
        </div>
    );
}

export default ContainerManage;
