import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCategories, getAllCategories } from "../../../../features/category/categorySlice.ts";
import { addProductModels, getAllProductModels } from "../../../../features/productModels/productModelSlice.ts";
import { useForm } from "react-hook-form";
import AxiosApi from "../../../../api/axiosApi.ts";
import { AxiosResponse } from "axios";

interface FormData {
    name: string;
    unit: string;
    price: number;
    quantity: number;
    categoryId: string;
    type?: string;
}

function ProductManage() {
    const categories = useSelector(getAllCategories);
    const productModels = useSelector(getAllProductModels);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({ mode: "onChange" });

    const fetchCategories = async () => {
        try {
            const response: AxiosResponse = await AxiosApi.axiosCategories.get("");
            dispatch(addCategories(response.data));
        } catch (error) {
            console.error("Błąd podczas pobierania kategorii:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const onSubmit = async (data: FormData) => {
        try {
            const response = await AxiosApi.axiosProductModels.post("", data);
            dispatch(addProductModels([...productModels, response.data]));
            alert(`Dodano produkt: ${data.name}`);
            reset();
        } catch (error) {
            console.error("Błąd podczas dodawania produktu:", error);
            alert("Nie udało się dodać produktu.");
        }
    };

    return (
        <div className="manage-content">
            <div className="title-manage">Dodaj produkt do katalogu</div>
            <form onSubmit={handleSubmit(onSubmit)} className="form-product-model-container">
                <input
                    className="form-product-model-input"
                    type="text"
                    {...register("name", {
                        required: "Nazwa produktu jest wymagana.",
                        pattern: {
                            value: /^[A-Z][a-zA-Z\s]*$/,
                            message: "Nazwa musi zaczynać się od wielkiej litery i zawierać tylko litery.",
                        },
                    })}
                    placeholder="Nazwa produktu"
                />
                {errors.name && <span className="error-message">{errors.name.message}</span>}

                <input
                    className="form-product-model-input"
                    type="text"
                    {...register("unit", {
                        required: "Jednostka jest wymagana.",
                    })}
                    placeholder="Jednostka"
                />
                {errors.unit && <span className="error-message">{errors.unit.message}</span>}

                <input
                    className="form-product-model-input"
                    type="number"
                    {...register("quantity", {
                        required: "Ilość jest wymagana.",
                        min: { value: 1, message: "Ilość musi być większa niż 0." },
                    })}
                    placeholder="Ilość"
                />
                {errors.quantity && <span className="error-message">{errors.quantity.message}</span>}

                <input
                    className="form-product-model-input"
                    type="number"
                    {...register("price", {
                        required: "Cena jest wymagana.",
                        min: { value: 0.01, message: "Cena musi być większa niż 0." },
                    })}
                    placeholder="Cena"
                />
                {errors.price && <span className="error-message">{errors.price.message}</span>}

                <select className="form-product-model-input" {...register("categoryId", { required: "Kategoria jest wymagana." })}>
                    <option value="">Wybierz kategorię</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.categoryName}</option>
                    ))}
                </select>
                {errors.categoryId && <span className="error-message">{errors.categoryId.message}</span>}

                <input
                    className="form-product-model-input"
                    type="text"
                    {...register("type")}
                    placeholder="Podkategoria (opcjonalnie)"
                />
                <div className="button-product-model-group">
                    <button type="submit" className="action-button">Dodaj produkt</button>
                </div>
            </form>
        </div>
    );
}

export default ProductManage;