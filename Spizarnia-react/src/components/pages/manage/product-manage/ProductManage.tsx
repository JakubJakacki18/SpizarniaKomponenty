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
  Button,
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
  productId: ProductModel;
  purchaseDate: string;
  expirationDate: string;
}

const AddProductForm = () => {
  const categories = useSelector(getAllCategories); // Pobieranie kategorii
  const productModels = useSelector(getAllProductModels); // Produkty do dodania do spiżarni
  const products = useSelector(getAllProducts); // Produkty już w spiżarni
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
        dispatch(addCategories(response.data)); // Aktualizacja store
      } catch (error) {
        console.error("Błąd podczas pobierania kategorii:", error);
      }
    };

    const fetchProductModels = async () => {
      try {
        const response: AxiosResponse = await AxiosApi.axiosProductModels.get(
          ""
        );
        dispatch(addProductModels(response.data)); // Pobieranie dostępnych produktów
      } catch (error) {
        console.error("Błąd podczas pobierania produktów:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response: AxiosResponse = await AxiosApi.axiosProducts.get("");
        dispatch(addProducts(response.data)); // Pobieranie produktów w spiżarni
      } catch (error) {
        console.error("Błąd podczas pobierania produktów w spiżarni:", error);
      }
    };

    fetchCategories();
    fetchProductModels();
    fetchProducts();
  }, [dispatch]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedProductModel = productModels.find(
        (product) => product.id === data.productId
      );
      const productModelList = [selectedProductModel];

      const response = await AxiosApi.axiosProducts.post("", {
        purchaseDate: data.purchaseDate,
        expirationDate: data.expirationDate,
        selectedProduct: productModelList,
      });
      dispatch(
        addProducts([
          ...products,
          {
            id: response.data.id,
            expirationDate: data.expirationDate,
            purchaseDate: data.purchaseDate,
            productModels: productModelList,
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
  const validatePurchaseDate = (value: string) => {
    return dayjs(value).isAfter(dayjs())
      ? "Data zakupu nie może być późniejsza niż dzisiaj!"
      : true;
  };

  const validateExpirationDate = (value: string, purchaseDate: string) => {
    return dayjs(value).isBefore(dayjs(purchaseDate))
      ? "Data ważności musi być późniejsza niż data zakupu!"
      : true;
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f9ece6",
        borderRadius: 2,
        padding: 3,
        maxWidth: 500,
        margin: "auto",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{ fontWeight: "bold", marginBottom: 3, color: "#5d4037" }}
      >
        DODAJ PRODUKT DO SPIŻARNI
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Wybór produktu (kategorie jako nagłówki) */}
        <Controller
          name="productId"
          control={control}
          rules={{ required: "Produkt jest wymagany." }}
          render={({ field }) => (
            <TextField
              select
              fullWidth
              label="Wybierz produkt"
              {...field}
              error={!!errors.productId}
              helperText={errors.productId?.message}
              sx={{ marginBottom: 3 }}
            >
              <MenuItem value="">Wybierz produkt</MenuItem>
              {categories.flatMap((category: Category) => [
                <ListSubheader
                  key={`header-${category.categoryName}`}
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "var(--primary-color)",
                    fontFamily: "'Poppins', 'Arial Black', sans-serif",
                  }}
                >
                  {category.categoryName}
                </ListSubheader>,
                ...(category.productModels?.map((product: ProductModel) => (
                  <MenuItem
                    key={product.id}
                    value={product.id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      color: "var(--font-color)",
                      backgroundColor: "var(--secondary-left)",
                      fontFamily: "'Poppins', 'Arial Black', sans-serif",
                    }}
                  >
                    {product.name}
                  </MenuItem>
                )) || []),
              ])}
            </TextField>
          )}
        />

        {/* Data zakupu */}
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
                onChange={(newValue) =>
                  field.onChange(newValue?.format("YYYY-MM-DD"))
                }
                shouldDisableDate={(date) => dayjs(date).isAfter(dayjs())} // 🔹 Blokuje przyszłe daty
              />
            )}
          />
        </LocalizationProvider>

        {/* Data ważności */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="expirationDate"
            control={control}
            rules={{
              required: "Data ważności jest wymagana.",
              validate: (value) =>
                validateExpirationDate(value, control._formValues.purchaseDate),
            }}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Data ważności"
                value={field.value ? dayjs(field.value) : null}
                onChange={(newValue) =>
                  field.onChange(newValue?.format("YYYY-MM-DD"))
                }
                shouldDisableDate={(date) => {
                  const purchaseDate = control._formValues.purchaseDate;
                  return purchaseDate
                    ? dayjs(date).isBefore(dayjs(purchaseDate))
                    : false;
                }}
              />
            )}
          />
        </LocalizationProvider>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          sx={{ marginTop: 2 }}
        >
          Dodaj produkt
        </Button>
      </form>
    </Box>
  );
};

export default AddProductForm;
