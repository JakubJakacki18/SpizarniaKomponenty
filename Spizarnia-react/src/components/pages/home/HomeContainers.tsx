import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategories, getAllCategories } from "../../../features/category/categorySlice.ts";
import { Link } from "react-router-dom";
import  {Category} from "../../../../../Spizarnia-backend/src/models/Category.ts";


function HomeContainers() {
  const categories =useSelector(getAllCategories);
  const [rows, setRows] = useState<Category[][]>([]);
  const numberOfContainerOnShelf = 5;
  const handleSetRows = () => {
    const newRows : Category[][] = [];
    for (let i = 0; i < categories.length; i += numberOfContainerOnShelf) {
      newRows.push(categories.slice(i, i + numberOfContainerOnShelf));
    }
    setRows(newRows);
  };
  useEffect(() => {
    handleSetRows();
  }, [categories]);
  const renderContainers = rows.length > 0 ? 
  (
    rows.map((row, rowIndex) => (<>
    
      <div className="container-row" key={rowIndex}>
        <div className="container-grid">
          {row.map((category, index) => (
            <Link
              to={`/manage/container/${category.categoryName}`}
              key={index}>
              <div className="container-box">
                <p>{category.categoryName.slice(0, 8)}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="shelf"></div>
      </div>
    </>
    ))
  ) : 
  (
    <div className="shelf-container">
      <div className="shelf-text">Brak kategorii do wyświetlenia!</div>
      <div className="shelf"></div>
    </div>
  )
  
  return (
<>
<div className="container-section">
  {renderContainers}
</div>
</>
  );
}
export default HomeContainers;



