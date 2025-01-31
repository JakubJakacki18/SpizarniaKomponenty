import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AxiosResponse } from "axios";
import { addListOfProductsToBuy, deleteGroceryList } from "../../../features/listOfProductsToBuy/listOfProductsToBuySlice.ts";
import AxiosApi from "../../../api/axiosApi.ts";
import { AppDispatch } from "../../../features/store.ts";
import GroceryTable from "./GroceryTable.tsx";
import ConfirmationDialog from "../shared/ConfirmationDialog.tsx";

function GroceryList() {
    const dispatch: AppDispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState<string>(""); // Stan do wyszukiwania
    const [openConfirmationDialog, setConfirmationDialog] = useState(false);

    const handleDeleteList = () => {
        dispatch(deleteGroceryList());
    };

    useEffect(() => {
        const fetchListOfProductsToBuy = async () => {
            try {
                const response: AxiosResponse = await AxiosApi.axiosListOfProductsToBuy.get('');
                dispatch(addListOfProductsToBuy(response.data));
            } catch (error) {
                console.error('Error: ', error);
            }
        };
        fetchListOfProductsToBuy();
    }, [dispatch]);

    return (
        <>
            <div className="header-container">
                <div className="title">Lista zakupów</div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Wyszukaj produkt..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="action-button" onClick={() => setConfirmationDialog(true)}>
                        Usuń listę
                    </button>
                </div>
            </div>
            <div className="site-content">
                <GroceryTable searchTerm={searchTerm} />
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

export default GroceryList;



//  <ConfirmationDialog

//         openConfirmationDialog={openConfirmationDialog}
//         setConfirmationDialog={setConfirmationDialog}
//         actionFunction={handleDelete}
//         dataToFunction={selectedProductId}
//       />
