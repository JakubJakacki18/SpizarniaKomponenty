import { Dialog, DialogContent, DialogActions, TextField, MenuItem, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, fetchCategories } from "../../../features/category/categorySlice.ts";
import { updateProductModel, fetchProductModels } from "../../../features/productModels/productModelSlice.ts";

export default function EditProductModelDialog({ openEditDialog, setEditDialog, selectedProduct }) {
    const dispatch = useDispatch();
    const categories = useSelector(getAllCategories) || [];

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
                categoryId: selectedProduct.category?.id ? selectedProduct.category.id.toString() : "",
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

    const handleClose = () => {
        setEditDialog(false);
    };

    const handleSave = async () => {
        const updatedProduct = {
            id: formData.id,
            name: formData.name,
            quantity: parseInt(formData.quantity, 10) || 0,
            price: parseFloat(formData.price) || 0,
            categoryId: parseInt(formData.categoryId, 10) || null,
            type: formData.type,
            unit: formData.unit,
        };

        console.log("Sending update request with data:", updatedProduct); // Debugging log

        await dispatch(updateProductModel(updatedProduct));
        await dispatch(fetchProductModels()); 
        setEditDialog(false);
    };


    return (
        <Dialog open={openEditDialog} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogContent>
                <h2 className="title-dialog">Edytuj produkt</h2>
                <TextField
                    label="Nazwa"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Iloœæ"
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Cena"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    select
                    label="Kategoria"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                >
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <MenuItem key={category.id} value={category.id.toString()}>{category.categoryName}</MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>Brak dostêpnych kategorii</MenuItem>
                    )}
                </TextField>
                <TextField
                    label="Typ"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Jednostka"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSave} variant="contained" color="primary">Zapisz</Button>
                <Button onClick={handleClose} variant="outlined" color="secondary">Anuluj</Button>
            </DialogActions>
        </Dialog>
    );
}
