import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AxiosApi from "../../../api/axiosApi.ts";
import { addListOfProductsToBuy, deleteGroceryList } from "../../../features/listOfProductsToBuy/listOfProductsToBuySlice.ts";
import { NavLink } from "react-router-dom";
import StyleFunctions from "./../../../shared/styleFunctions.ts"
import GroceryTable from "./GroceryTable.tsx";
import { AppDispatch } from "../../../features/store.ts";
import ConfirmationDialog from "../shared/ConfirmationDialog.tsx";



function GroceryList() {
    const dispatch : AppDispatch= useDispatch();
    const [openConfirmationDialog, setConfirmationDialog] = useState(false);
    const handleDeleteList = () => {
      dispatch(deleteGroceryList());
    };
    useEffect(() => {
        const fetchListOfProductsToBuy = async () => {
        try {
            const response : AxiosResponse = await AxiosApi.axiosListOfProductsToBuy.get('')//.catch((error) => {console.error('Error: ', error)});
            dispatch(addListOfProductsToBuy(response.data));
            console.log(response.data);
        }
        catch(error) {
            console.error('Error: ', error);
        }
        }
        fetchListOfProductsToBuy();
        
    }, [dispatch]);
    return (
        <>
        <div className="header-container">
        <div className="title">Lista zakupów</div>
        <div className="search-bar">
          <input type="text"
                 placeholder="Wyszukaj przepis..."/>
          <button className="action-button" >
            Szukaj
          </button>
          <button className="action-button" onClick={()=>
          {
            setConfirmationDialog(true)
          }
          }>
          Usuń listę
          </button>
        </div>
      </div>
      <div className="site-content">
        <GroceryTable/>
      </div>
      <ConfirmationDialog
      title={"Usuwanie listy zakupów"}
      content={`Czy chcesz usunąć całą listę produktów?`}
      openConfirmationDialog={openConfirmationDialog}
      setConfirmationDialog={setConfirmationDialog}
      actionFunction={handleDeleteList}
      />
        </>
    );
}

export default GroceryList


//  <ConfirmationDialog

//         openConfirmationDialog={openConfirmationDialog}
//         setConfirmationDialog={setConfirmationDialog}
//         actionFunction={handleDelete}
//         dataToFunction={selectedProductId}
//       />
