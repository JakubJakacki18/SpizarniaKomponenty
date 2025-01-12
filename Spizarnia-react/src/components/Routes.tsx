import {createBrowserRouter} from 'react-router-dom';
import Home from './pages/home/Home.tsx';
import React from 'react';
import Recipes from './pages/recipes/Recipes.tsx';
import Layout from './partials/Layout.tsx';
import Manage from './pages/manage/Manage.tsx';
import AllProducts from './pages/all-products/AllProducts.tsx';
import GroceryList from './pages/grocery-list/GroceryList.tsx';

export const Routes = createBrowserRouter([
    {
        path:'/',
        element:<Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/recipes", element: <Recipes /> },
            { path: "/all-products", element: <AllProducts/> },
            { path: "/grocery-list", element: <GroceryList/> },
            { path: "/manage", element: <Manage/>, children: []},
          ],
    },
]);

// export const routes: Routes = [
//       {
//       path: 'manage',
//       component: ManageComponent,
//       children: [
//         { path: 'product', component: ProductComponent },
//         { path: 'category', component: CategoryComponent },
//         { path: 'productModel', component: ProductModelComponent },
//         { path: 'recipe', component: RecipeComponent },
//         { path: 'container/:categoryName', component: ContainerComponent },
//         { path: 'productModelView', component: ProductModelViewComponent },
//         { path: '', redirectTo: '/manage/productModelView', pathMatch: 'full' } 
//       ]
//     },
//   ];
  