import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { Ingredient } from "./models/Ingredient";
import categoryRouter from './routers/category.router';
import productRouter from "./routers/product.router";
import productModelRouter from "./routers/productModel.router";
import recipeRouter from "./routers/recipe.router";
import ingredientRouter from "./routers/ingredient.router";
import notificationRouter from './routers/notification.router';

const app = express();
const port = 5000;

app.use(cors(
    {
        credentials:true,
        origin:["http://localhost:4200"]
    }));

app.use(express.json());

app.use("/api/productModel",productModelRouter);
app.use("/api/product", productRouter);
app.use('/api/category', categoryRouter);
app.use("/api/ingredient", ingredientRouter);
app.use("/api/recipe", recipeRouter);
app.use('/api', notificationRouter);
app.get("/api",(req,res) => 
    {
        res.send("Hello!");
    })



AppDataSource.initialize().then(async () => {
    Ingredient.dataSource = AppDataSource;
    console.log("Server is running!")
    app.listen(port, () =>
        {
            console.log("Website served on http://localhost:"+port);
    
        })
}).catch(error => console.log(error))

