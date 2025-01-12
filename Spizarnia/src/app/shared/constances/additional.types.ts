import { Category } from "../../../../../Spizarnia-backend/src/models/Category";
import { ProductModel } from "../../../../../Spizarnia-backend/src/models/ProductModel";

export type CategoryWithDisabledProductModels = Category & { 
    productModels?: (ProductModel & { isDisabled: boolean })[] 
  };
  