import express from "express";
import cors from "cors";
import productRouter from "./routers/product.router";
import containerRouter from "./routers/container.router";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
const app = express();


app.use(cors(
    {
        credentials:true,
        origin:["http://localhost:4200"]
    }));

app.use("/api/product",productRouter);
app.use("/api/container",containerRouter);

app.get("/api",(req,res) => 
    {
        res.send("Hello!");
    })
const port = 5000;


AppDataSource.initialize().then(async () => {

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

