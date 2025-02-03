import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import {
  addProducts,
  getAllProducts,
} from "../../../../features/products/productSlice.ts";
import { AppDispatch } from "../../../../features/store.ts";
import { AxiosResponse } from "axios";
import AxiosApi from "../../../../api/axiosApi.ts";
import dayjs from "dayjs";
import { Product } from "../../../../../../Spizarnia-backend/src/models/Product.ts";

const ContainerManage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response: AxiosResponse = await AxiosApi.axiosProducts.get(
          "NoMap"
        );
        dispatch(addProducts(response.data));
      } catch (error) {
        console.error("Błąd pobierania produktów:", error);
      }
    };
    fetchProducts();
  }, [dispatch]);

  const products = useSelector(getAllProducts)
    .filter(
      (product) => product.productModel.category?.categoryName === categoryName
    )
    .map((product: Product) => ({
      id: product.id,
      purchaseDate: product.purchaseDate,
      expirationDate: product.expirationDate,
      name: product.productModel?.name ?? "",
      type: product.productModel?.type ?? "",
      price: product.productModel?.price ?? "",
      quantity:
        product.productModel?.quantity && product.productModel?.unit
          ? product.productModel.quantity + " " + product.productModel.unit
          : "",
      categoryName: product.productModel?.category?.categoryName,
    }));

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
      headerClassName: "table-header",
    },
    {
      field: "name",
      headerName: "Nazwa",
      width: 150,
      headerClassName: "table-header",
    },
    {
      field: "quantity",
      headerName: "Ilość",
      width: 100,
      headerClassName: "table-header",
    },
    {
      field: "type",
      headerName: "Podkategoria",
      width: 150,
      headerClassName: "table-header",
    },
    {
      field: "purchaseDate",
      headerName: "Data Zakupu",
      width: 150,
      headerClassName: "table-header",
    },
    {
      field: "expirationDate",
      headerName: "Data Ważności",
      width: 180,
      headerClassName: "table-header",
    },
  ];

  const today = dayjs();
  const table =
    products.length > 0 ? (
      <div className="table-container">
        <DataGrid
          rows={products}
          columns={columns}
          disableRowSelectionOnClick
          autoHeight
          getRowClassName={(params) => {
            const expirationDate = dayjs(params.row.expirationDate);
            const daysToExpiration = expirationDate.diff(today, "day");

            if (daysToExpiration < 0) return "expired";
            if (daysToExpiration < 1) return "almost-expired";
            if (daysToExpiration <= 3) return "soon-expiring";
            return "expiring";
          }}
          sx={{
            border: "1px solid var(--background-color)",
            fontFamily: '"Poppins", "Arial Black"',
            "& .MuiDataGrid-cell": {
              border: "1px solid var(--font-color)",
              backgroundColor: "var(--font-color)",
              fontFamily: '"Poppins", "Arial Black"',
            },
            "& .MuiDataGrid-columnHeader": {
              border: "1px solid var(--font-color)",
              backgroundColor: "var(--font-color)",
              fontFamily: '"Poppins", "Arial Black"',
            },
            "& .MuiDataGrid-row": {
              borderBottom: "1px solid var(--font-color)",
              backgroundColor: "var(--font-color)",
              fontFamily: '"Poppins", "Arial Black"',
            },
          }}
        />
      </div>
    ) : (
      <div className="no-data">Brak produktów w kategorii {categoryName}.</div>
    );

  return (
    <>
      <div className="manage-content">
        <div className="title-manage">Produkty z kategorii {categoryName}</div>
        <div>{table}</div>
      </div>
    </>
  );
};

export default ContainerManage;
