import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCategories, getAllCategories } from "../../../../features/category/categorySlice.ts";
import { useForm } from "react-hook-form";
import AxiosApi from "../../../../api/axiosApi.ts";
import { AxiosResponse } from "axios";

interface FormData {
    categoryName: string;
}

function CategoryManage() {
    const categories = useSelector(getAllCategories);
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
    });

    const handleAddCategory = async (data: FormData) => {
        const { categoryName } = data;

        if (categories.some((category) => category.categoryName === categoryName)) {
            alert("Kategoria już istnieje!");
            return;
        }

        try {
            const response = await AxiosApi.axiosCategories.post("", {
                categoryName: categoryName,
            });
            console.log(response.data.category);
            dispatch(addCategories([...categories, {id : response.data.category.id, categoryName : response.data.category.categoryName,productModels : []}]))
            alert(`Dodano kategorię: ${categoryName}`);
            reset();
        } catch (error) {


            console.error("Błąd podczas dodawania kategorii:", error);
            alert("Nie udało się dodać kategorii.");
        }
    };

    return (
        <div className="manage-content">
            {/* Tytuł */}
            <div className="title-manage">Dodaj kategorię</div>

            {/* Formularz */}
            <form
                onSubmit={handleSubmit(handleAddCategory)}
                className="form-category-container"
            >
                            {errors.categoryName && (
                    <span style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
                        {errors.categoryName.message}
                    </span>
                )}
                <input
                    id="categoryName"
                    className="form-category-input"
                    type="text"
                    {...register("categoryName", {
                        required: "Nazwa kategorii jest wymagana.", // Walidacja: pole wymagane
                        pattern: {
                            value: /^[A-Z][a-zA-Z\s]*$/,
                            message: "Nazwa musi zaczynać się od wielkiej litery i zawierać tylko litery.",
                        },
                    })}
                    placeholder="Nazwa kategorii"
                    style={{
                        backgroundColor: "var(--primary-color)",
                        color: "var(--font-color)",
                        fontFamily: '"Poppins", "Arial Black", sans-serif',
                        border: "1px solid var(--background-color)",
                        borderRadius: "5px",
                        padding: "10px",
                        fontSize: "16px",
                        width: "100%",
                        boxSizing: "border-box",
                    }}
                />
                <button type="submit" className="action-button">
                    Dodaj kategorię
                </button>
            </form>

            {/* Lista kategorii */}
            <div className="title-manage" style={{ marginTop: "20px" }}>Istniejące kategorie:</div>
            <div className="form-category-view-container" >
                {categories.length > 0 ? (
                    <ul style={{ padding: "0", listStyle: "none", width: "90%" }}>
                        {categories.map((category) => (
                            <li
                                key={category.id}
                                style={{
                                    backgroundColor: "var(--primary-color)",
                                    color: "var(--font-color)",
                                    fontFamily: '"Poppins", "Arial Black", sans-serif',
                                    border: "1px solid var(--background-color)",
                                    borderRadius: "5px",
                                    padding: "10px",
                                    fontSize: "16px",
                                    width: "100%",
                                    boxSizing: "border-box",
                                }}
                            >
                                {category.categoryName}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div
                        style={{
                            backgroundColor: "var(--primary-color)",
                            color: "var(--font-color)",
                            padding: "10px",
                            borderRadius: "5px",
                            textAlign: "center",
                            marginTop: "10px",
                        }}
                    >
                        Brak kategorii w systemie.
                    </div>
                )}
            </div>
        </div>
    );
}

export default CategoryManage;
