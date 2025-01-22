import React, { useState } from "react";

function CategoryManage() {
    const [categoryName, setCategoryName] = useState(""); // Stan dla nazwy kategorii

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!categoryName.trim()) {
            alert("Nazwa kategorii jest wymagana!");
            return;
        }

        console.log("Dodano kategorię:", categoryName);
        alert(`Dodano kategorię: ${categoryName}`);
        setCategoryName("");
    };

    return (
        <div className="manage-content">
            <div className="title-manage">Dodaj kategorię</div>

            <form onSubmit={handleSubmit} className="form-category-container">
                <input
                    id="categoryName"
                    className="form-category-input"
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Nazwa kategorii"
                    style={{
                        backgroundColor: 'var(--primary-color)',
                        color: 'var(--font-color)',
                        fontFamily: '"Poppins", "Arial Black", sans-serif',
                        border: '1px solid var(--background-color)',
                        borderRadius: '5px',
                        padding: '10px',
                        fontSize: '16px',
                        width: '100%',
                        boxSizing: 'border-box',
                    }}
                />
                <button type="submit" className="action-button">
                    Dodaj kategorię
                </button>
            </form>
        </div>
    );
}

export default CategoryManage;
