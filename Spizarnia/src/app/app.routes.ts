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
import { RecipeComponent } from './components/pages/manage/recipe/recipe.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent },
  { path: 'all-products', component: AllProductsComponent },
    {
    path: 'manage',
    component: ManageComponent,
    children: [
      { path: 'product', component: ProductComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'productModel', component: ProductModelComponent },
      { path: 'recipe', component: RecipeComponent },
      { path: 'container/:categoryName', component: ContainerComponent },
      { path: '', redirectTo: '/manage/category', pathMatch: 'full' } 
    ]
  },
  { path: 'recipes', component: RecipesComponent },
  { path: 'grocery-list', component: GroceryListComponent },
];
