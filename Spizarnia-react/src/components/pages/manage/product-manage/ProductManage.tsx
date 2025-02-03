import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
  getAllCategories,
  addCategories,
} from "../../../../features/category/categorySlice.ts";
import { getAllProductModels } from "../../../../features/productModels/productModelSlice.ts";
import {
  addProducts,
  getAllProducts,
} from "../../../../features/products/productSlice.ts";
import AxiosApi from "../../../../api/axiosApi.ts";
import { AxiosResponse } from "axios";
import { Box, TextField, MenuItem, ListSubheader } from "@mui/material";
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
        selectedProduct: [selectedProductModel],
      });

      dispatch(
        addProducts([
          ...products,
          {
            id: response.data.id,
            expirationDate: data.expirationDate,
            purchaseDate: data.purchaseDate,
            productModel: [selectedProductModel],
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
  const validateExpirationDate = (value: string, purchaseDate: string) => {
    return dayjs(value).isBefore(dayjs(purchaseDate))
      ? "Data ważności nie może być wcześniejsza niż data zakupu."
      : true;
  };
  const validatePurchaseDate = (value: string) => {
    return dayjs(value).isAfter(dayjs())
      ? "Data zakupu nie może być w przyszłości."
      : true;
  };

  return (
    <>
      <div className="manage-content">
        <div className="title-manage">Dodaj produkt do spiżarni</div>
        <Box className="form-product-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="productId"
              control={control}
              rules={{ required: "Produkt jest wymagany." }}
              render={({ field }) => (
                <>
                  {errors.productId && (
                    <span className="error-message">
                      {errors.productId.message}
                    </span>
                  )}
                  <TextField
                    select
                    fullWidth
                    label="Wybierz produkt"
                    {...field}
                    sx={{
                      "& .MuiInputBase-root": {
                        marginBottom: 1,
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
                        fontSize:20,
                        backgroundColor: "var(--secondary-right)",
                        fontFamily: "'Poppins', 'Arial Black', sans-serif",
                      }}
                    >
                      Wybierz produkt
                    </MenuItem>
                    {categories.flatMap((category: Category) => [
                      <ListSubheader
                        key={category.categoryName}
                        sx={{
                          fontWeight: "bold",
                          display: "flex",
                          fontSize:18,
                          flexDirection: "column",
                              backgroundColor: "var(--secondary-left)",
                          fontFamily: "'Poppins', 'Arial Black', sans-serif",
                        }}
                      >
                        {category.categoryName}
                      </ListSubheader>,
                      ...(category.productModels?.map(
                        (product: ProductModel) => (
                          <MenuItem
                            key={product.id}
                            value={product.id}
                            sx={{
                              display: "flex",
                              color: "var(--font-color)",
                                                        backgroundColor: "var(--primary-color)",

                              fontFamily:
                                "'Poppins', 'Arial Black', sans-serif",
                            }}
                          >
                            {product.name}
                          </MenuItem>
                        )
                      ) || []),
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
                  rules={{
                    required: "Data zakupu jest wymagana.",
                    validate: validatePurchaseDate,
                  }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Data zakupu"
                      value={field.value ? dayjs(field.value) : null}
                       sx={{
                              display: "flex",
                              color: "var(--font-color)",
                              backgroundColor: "var(--primary-color)",
                              fontFamily:
                                "'Poppins', 'Arial Black', sans-serif",
                            }}
                      onChange={(newValue) =>
                        field.onChange(newValue?.format("YYYY-MM-DD"))
                      }
                      shouldDisableDate={(date) => dayjs(date).isAfter(dayjs())} // 🔹 Blokuje przyszłe daty
                    />
                  )}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="expirationDate"
                  control={control}
                  rules={{
                    required: "Data ważności jest wymagana.",
                    validate: (value) =>
                      validateExpirationDate(
                        value,
                        control._formValues.purchaseDate
                      ),
                  }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Data ważności"
                      value={field.value ? dayjs(field.value) : null}
                                             sx={{
                              display: "flex",
                              color: "var(--font-color)",
                              backgroundColor: "var(--primary-color)",
                              fontFamily:
                                "'Poppins', 'Arial Black', sans-serif",
                            }}
                      onChange={(newValue) =>
                        field.onChange(newValue?.format("YYYY-MM-DD"))
                      }
                      shouldDisableDate={(date) => {
                        const purchaseDate = control._formValues.purchaseDate;
                        return purchaseDate
                          ? dayjs(date).isBefore(dayjs(purchaseDate))
                          : false;
                      }} // 🔹 Blokuje daty wcześniejsze niż zakup
                    />
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
