import { Dialog, DialogContent, DialogActions, TextField, MenuItem, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, fetchCategories } from "../../../features/category/categorySlice.ts";
import { updateProductModel, fetchProductModels } from "../../../features/productModels/productModelSlice.ts";
import { AppDispatch } from "../../../features/store.ts";

export default function EditProductModelDialog({ openEditDialog, setEditDialog, selectedProduct }) {
    const dispatch : AppDispatch = useDispatch();
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
            });
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "quantity" || name === "price" ? (value ? parseFloat(value).toString() : "") : value,
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
                backgroundColor: "#F5D5C2",
                borderRadius: "10px",
                padding: "15px",
            }
        }}>
            <DialogContent>
                <h2 style={{ textAlign: "center", fontWeight: "bold" }}>EDYCJA PRODUKTU Z KATALOGU</h2>
                <TextField
                    label="Cena"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    InputProps={{ style: { backgroundColor: "white", borderRadius: "5px" } }}
                />
                <TextField
                    select
                    label="Kategoria"
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={handleCategoryChange}
                    fullWidth
                    margin="dense"
                    InputProps={{ style: { backgroundColor: "white", borderRadius: "5px" } }}
                >
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <MenuItem key={category.id} value={category.categoryName}>{category.categoryName}</MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>Brak dost�pnych kategorii</MenuItem>
                    )}
                </TextField>
                <TextField
                    label="Typ"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    InputProps={{ style: { backgroundColor: "white", borderRadius: "5px" } }}
                />
            </DialogContent>
            <DialogActions style={{ justifyContent: "center" }}>
                <Button onClick={handleSave} variant="contained" style={{ backgroundColor: "black", color: "white", borderRadius: "5px" }}>ZAPISZ</Button>
                <Button onClick={handleClose} variant="outlined" style={{ borderColor: "black", color: "black", borderRadius: "5px" }}>ANULUJ</Button>
            </DialogActions>
        </Dialog>
    );
}
