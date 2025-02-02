import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
  getAllCategories,
  addCategories,
} from "../../../../features/category/categorySlice.ts";
import {
  getAllProductModels,
  addProductModels,
} from "../../../../features/productModels/productModelSlice.ts";
import {
  addProducts,
  getAllProducts,
} from "../../../../features/products/productSlice.ts";
import AxiosApi from "../../../../api/axiosApi.ts";
import { AxiosResponse } from "axios";
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  ListSubheader,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Category } from "../../../../../../Spizarnia-backend/src/models/Category.ts";
import { ProductModel } from "../../../../../../Spizarnia-backend/src/models/ProductModel.ts";

interface FormData {
  productId: string;
  purchaseDate: string;
  expirationDate: string;
}

const AddProductForm = () => {
  const categories = useSelector(getAllCategories);
  const productModels = useSelector(getAllProductModels);
  const products = useSelector(getAllProducts);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response: AxiosResponse = await AxiosApi.axiosCategories.get("");
        dispatch(addCategories(response.data));
      } catch (error) {
        console.error("Błąd podczas pobierania kategorii:", error);
      }
    };
    fetchCategories();
  }, [dispatch]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedProductModel = productModels.find(
        (product) => product.id === data.productId
      );

      const response = await AxiosApi.axiosProducts.post("", {
        purchaseDate: data.purchaseDate,
        expirationDate: data.expirationDate,
        selectedProduct: selectedProductModel,
      });

      dispatch(
        addProducts([
          ...products,
          {
            id: response.data.id,
            expirationDate: data.expirationDate,
            purchaseDate: data.purchaseDate,
            productModels: [selectedProductModel],
          },
        ])
      );
      alert(`Dodano produkt do spiżarni!`);
      reset();
    } catch (error) {
      console.error("Błąd podczas dodawania produktu:", error);
      alert("Nie udało się dodać produktu.");
    }
  };

  return (
    <>
      <div className="manage-content">
        <div className="title-manage">Dodaj produkt</div>
        <Box className="form-product-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="productId"
              control={control}
              rules={{ required: "Produkt jest wymagany." }}
              render={({ field }) => (
                <>
                  {errors.productId && (
                    <span className="error-message">{errors.productId.message}</span>
                  )}
                  <TextField
                    select
                    fullWidth
                    label="Wybierz produkt"
                    {...field}
                    sx={{
                      "& .MuiInputBase-root": {
                        marginBottom: 1,
                        width: 550,
                        backgroundColor: "var(--primary-color)",
                      },
                      "& .MuiInputBase-input": {
                        color: "var(--font-color)",
                        fontFamily: "'Poppins', 'Arial Black', sans-serif",
                      },
                    }}
                  >
                    <MenuItem
                      value=""
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        color: "var(--font-color)",
                        backgroundColor: "var(--secondary-left)",
                        fontFamily: "'Poppins', 'Arial Black', sans-serif",
                      }}
                    >
                      Wybierz produkt
                    </MenuItem>
                    {categories.flatMap((category: Category) => [
                      <ListSubheader key={category.categoryName}>
                        {category.categoryName}
                      </ListSubheader>,
                      ...(category.productModels?.map((product: ProductModel) => (
                        <MenuItem key={product.id} value={product.id}>
                          {product.name}
                        </MenuItem>
                      )) || []),
                    ])}
                  </TextField>
                </>
              )}
            />

            <div className="form-product-model-row">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="purchaseDate"
                  control={control}
                  rules={{ required: "Data zakupu jest wymagana." }}
                  render={({ field }) => (
                    <>
                      <DatePicker
                        {...field}
                        label="Data zakupu"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(newValue) =>
                          field.onChange(newValue?.format("YYYY-MM-DD"))
                        }
                        sx={{
                          "& .MuiInputBase-root": {
                            width: 270,
                            backgroundColor: "var(--primary-color)",
                          },
                          "& .MuiInputBase-input": {
                            color: "var(--font-color)",
                            fontFamily: "'Poppins', 'Arial Black', sans-serif",
                          },
                        }}
                      />
                      {errors.purchaseDate && (
                        <span className="error-message">{errors.purchaseDate.message}</span>
                      )}
                    </>
                  )}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="expirationDate"
                  control={control}
                  rules={{ required: "Data ważności jest wymagana." }}
                  render={({ field }) => (
                    <>
                      <DatePicker
                        {...field}
                        label="Data ważności"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(newValue) =>
                          field.onChange(newValue?.format("YYYY-MM-DD"))
                        }
                        sx={{
                          "& .MuiInputBase-root": {
                            width: 270,
                            backgroundColor: "var(--primary-color)",
                          },
                          "& .MuiInputBase-input": {
                            color: "var(--font-color)",
                            fontFamily: "'Poppins', 'Arial Black', sans-serif",
                          },
                        }}
                      />
                      {errors.expirationDate && (
                        <span className="error-message">{errors.expirationDate.message}</span>
                      )}
                    </>
                  )}
                />
              </LocalizationProvider>
            </div>

            <div className="button-product-model-group">
              <button type="submit" className="action-button">
                Dodaj produkt
              </button>
            </div>
          </form>
        </Box>
      </div>
    </>
  );
};

export default AddProductForm;
