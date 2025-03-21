﻿import { Dialog, DialogContent, DialogActions, TextField, MenuItem, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, fetchCategories } from "../../../features/category/categorySlice.ts";
import { updateProductModel, fetchProductModels } from "../../../features/productModels/productModelSlice.ts";
import { AppDispatch } from "../../../features/store.ts";

export default function EditProductModelDialog({ openEditDialog, setEditDialog, selectedProduct }) {
    const dispatch: AppDispatch = useDispatch();
    const categories = useSelector(getAllCategories);

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }
    }, [dispatch, categories]);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        quantity: "",
        price: "",
        categoryName: "",
        categoryId: "",
        type: "",
        unit: "",
        priceError: "", // Dodajemy pole na błąd ceny
    });

    useEffect(() => {
        if (selectedProduct) {
            setFormData({
                id: selectedProduct.id,
                name: selectedProduct.name || "",
                quantity: selectedProduct.quantity ? selectedProduct.quantity.toString() : "",
                price: selectedProduct.price ? selectedProduct.price.toString() : "",
                categoryName: selectedProduct.category?.categoryName || "",
                categoryId: selectedProduct.category?.id || "",
                type: selectedProduct.type || "",
                unit: selectedProduct.unit || "",
                priceError: "", // Reset błędu ceny
            });
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Walidacja ceny
        if (name === "price") {
            const priceValue = parseFloat(value);
            if (isNaN(priceValue) || priceValue < 0.01) {
                setFormData((prevData) => ({
                    ...prevData,
                    priceError: "Cena musi być większa niż 0.01",
                    price: value, // Pozwala na edycję wartości w polu
                }));
                return;
            }
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "quantity" || name === "price" ? (value ? parseFloat(value).toString() : "") : value,
            priceError: name === "price" ? "" : prevData.priceError, // Usunięcie błędu, jeśli cena poprawna
        }));
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = categories.find(cat => cat.categoryName === e.target.value);
        setFormData((prevData) => ({
            ...prevData,
            categoryName: e.target.value,
            categoryId: selectedCategory ? selectedCategory.id : "",
        }));
    };

    const handleClose = () => {
        setEditDialog(false);
    };

    const handleSave = async () => {
        if (formData.priceError) {
            alert("Popraw błędy w formularzu przed zapisaniem.");
            return;
        }

        await dispatch(updateProductModel({
            id: formData.id,
            name: formData.name,
            quantity: parseInt(formData.quantity, 10) || 0,
            price: parseFloat(formData.price) || 0,
            categoryId: formData.categoryId,
            categoryName: formData.categoryName,
            type: formData.type,
            unit: formData.unit,
        }));

        await dispatch(fetchProductModels());
        setEditDialog(false);
    };

    return (
        <Dialog open={openEditDialog} onClose={handleClose} fullWidth maxWidth="xs" PaperProps={{
            style: {
                backgroundColor: "var(--primary-color)  ",
                borderRadius: "10px",
                padding: "15px",
            }
        }}>
            <DialogContent>
                <h2 style={{ textAlign: "center", fontWeight: "bold" }}>EDYCJA PRODUKTU Z KATALOGU</h2>
                
                {/* Pole ceny z walidacją */}
                <TextField
                    label="Cena"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    error={!!formData.priceError} // Ustawienie błędu
                    helperText={formData.priceError} // Komunikat walidacyjny
 InputProps={{ style: { backgroundColor: "white", borderRadius: "5px",  fontFamily: "'Poppins', 'Arial Black', sans-serif" , color:"var(--font-color)"} }}
                />

                {/* Pole wyboru kategorii */}
                <TextField
                    select
                    label="Kategoria"
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={handleCategoryChange}
                    fullWidth
                    margin="dense"
 InputProps={{ style: { backgroundColor: "white", borderRadius: "5px",  fontFamily: "'Poppins', 'Arial Black', sans-serif", color:"var(--font-color)" } }}                >
                    {categories.length > 0 ? (
                        categories.map((category) => (
<MenuItem key={category.id} value={category.categoryName} sx={{fontFamily: "'Poppins', 'Arial Black', sans-serif", color: "var(--font-color)"}}>{category.categoryName}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>Brak dostępnych kategorii</MenuItem>
                    )}
                </TextField>

                {/* Pole typu */}
                <TextField
                    label="Typ"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
InputProps={{ style: { backgroundColor: "white", borderRadius: "5px", fontFamily: "'Poppins', 'Arial Black', sans-serif" , color:"var(--font-color)" } }}
                />
            </DialogContent>

            <DialogActions style={{ justifyContent: "center" }}>
               <button onClick={handleSave} className="action-edit-button">ZAPISZ</button>
                <button onClick={handleClose} className="action-edit-button">ANULUJ</button>
            </DialogActions>
        </Dialog>
    );
}
