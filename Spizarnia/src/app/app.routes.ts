import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductModelComponent } from './components/pages/manage/product-model/product-model.component';
import { ProductComponent } from './components/pages/manage/product/product.component';

export const routes: Routes = 
[
    { path: 'home', component: HomeComponent },
  { path: 'manage/productModel', component: ProductModelComponent },
  { path: 'manage/product', component: ProductComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

];
