import {createBrowserRouter} from 'react-router-dom';
import Home from './pages/home/Home.tsx';
import React from 'react';
import Recipes from './pages/recipes/Recipes.tsx';
import Layout from './partials/Layout.tsx';
import Manage from './pages/manage/Manage.tsx';
import AllProducts from './pages/all-products/AllProducts.tsx';
import GroceryList from './pages/grocery-list/GroceryList.tsx';
import ProductManage from './pages/manage/product-manage/ProductManage.tsx';
import CategoryManage from './pages/manage/category-manage/CategoryManage.tsx';
import ProductModelManage from './pages/manage/productModel-manage/ProductModelManage.tsx';
import RecipeManage from './pages/manage/recipe-manage/RecipeManage.tsx';
import ContainerManage from './pages/manage/container-manage/ContainerManage.tsx';
import ProductModelViewManage from './pages/manage/productModelView-manage/ProductModelViewManage.tsx';

export const Routes = createBrowserRouter([
    {
        path:'/',
        element:<Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/recipes", element: <Recipes /> },
            { path: "/all-products", element: <AllProducts/> },
            { path: "/grocery-list", element: <GroceryList/> },
            { path: "/manage", element: <Manage/>, 
                      children: [
        { path: '/manage/product', element: <ProductManage/> },
        { path: '/manage/category', element: <CategoryManage/> },
        { path: '/manage/productModel', element: <ProductModelManage/>},
        { path: '/manage/recipe', element: <RecipeManage/> },
        { path: '/manage/productModelView', element: <ProductModelViewManage/> },
        { path: '/manage/container/:categoryName', element: <ContainerManage/> },
      ]},
          ],
    },
]);


  