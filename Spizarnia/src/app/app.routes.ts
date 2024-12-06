import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AllProductsComponent } from './components/pages/all-products/all-products.component';
import { ManageComponent } from './components/pages/manage/manage.component';
import { RecipesComponent } from './components/pages/recipes/recipes.component';
import { GroceryListComponent } from './components/pages/grocery-list/grocery-list.component';
import { ProductModelComponent } from './components/pages/manage/product-model/product-model.component';
import { ProductComponent } from './components/pages/manage/product/product.component';
import { ContainerComponent } from './components/pages/manage/container/container.component';
import { CategoryComponent } from './components/pages/manage/category/category.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent },
  { path: 'all-products', component: AllProductsComponent },
  { path: 'manage', component: ManageComponent },
  { path: 'manage/product', component: ProductComponent },
  { path: 'manage/productModel', component: ProductModelComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'grocery-list', component: GroceryListComponent },
  { path: 'manage/container/:id', component: ContainerComponent },
  { path: 'manage/category', component: CategoryComponent }
];
