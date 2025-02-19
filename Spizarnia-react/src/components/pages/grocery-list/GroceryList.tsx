import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AxiosResponse } from "axios";
import { addListOfProductsToBuy, addOrUpdateGroceryEntry, deleteGroceryList } from "../../../features/listOfProductsToBuy/listOfProductsToBuySlice.ts";
import AxiosApi from "../../../api/axiosApi.ts";
import { AppDispatch } from "../../../features/store.ts";
import GroceryTable from "./GroceryTable.tsx";
import ConfirmationDialog from "../shared/ConfirmationDialog.tsx";
import { deleteProduct, getAllProducts } from "../../../features/products/productSlice.ts";
import { Product } from "../../../../../Spizarnia-backend/src/models/Product.ts";

function deleteProductFromPantry(product : Product, dispatch : AppDispatch)
{
    dispatch(deleteProduct(product.id.toString()))
}
function addProductToShoppingCart(product : Product, dispatch : AppDispatch)
{
    
    const newEntry = {
        idProductModel: product.productModel?.id ?? -1,
        quantity: 1
    };
    dispatch(addOrUpdateGroceryEntry(newEntry));

}


function GroceryList() {
    const dispatch: AppDispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [openDeleteListDialog, setDeleteListDialog] = useState(false);
    const [openOutdatedProductsDialog, setOutdatedProductsDialog] = useState(false);
    const currentDate = new Date();
    const expiredProducts = useSelector(getAllProducts).filter(product  => {
        const expirationDate = new Date(product.expirationDate);
        return expirationDate.getTime() < currentDate.getTime();
      });
      useEffect(() => {

        if (expiredProducts.length > 0  && !openOutdatedProductsDialog) {
            setOutdatedProductsDialog(true);
        }
    }, [expiredProducts.length,openOutdatedProductsDialog]);


    const handleDeleteExpiredProducts = () => {
        expiredProducts.forEach((product) => {
            try{
                deleteProductFromPantry(product,dispatch);
                addProductToShoppingCart(product,dispatch)
            }
            catch(error)
            {
                console.error("Wystąpił błąd: ",error)
            }

        })
    }

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
                    <button className="action-button" onClick={() => setDeleteListDialog(true)}>
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
                openConfirmationDialog={openDeleteListDialog}
                setConfirmationDialog={setDeleteListDialog}
                actionFunction={handleDeleteList}
            />
            <ConfirmationDialog
                title={"Przeterminowane produkty"}
                content={"Masz przeterminowane produkty. Czy chciałbyś/chciałabyś usunąć je ze spiżarni i dodać je do listy zakupów?"}
                openConfirmationDialog={openOutdatedProductsDialog}
                setConfirmationDialog={setOutdatedProductsDialog}
                actionFunction={handleDeleteExpiredProducts}

            />
        </>
    );
}

export default GroceryList;