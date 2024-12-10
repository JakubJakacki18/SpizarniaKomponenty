import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { User } from "./models/User";
import { Ingredient } from "./models/Ingredient";
const app = express();

import categoryRouter from './routers/category.router';
import productRouter from "./routers/product.router";
import productModelRouter from "./routers/productModel.router";
import recipeRouter from "./routers/recipe.router";
import ingredientRouter from "./routers/ingredient.router";
import notificationRouter from './routers/notification.router';

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
const port = 5000;


AppDataSource.initialize().then(async () => {
    Ingredient.dataSource = AppDataSource;
    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")
    app.listen(port, () =>
        {
            console.log("Website served on http://localhost:"+port);
    
        })

}).catch(error => console.log(error))

