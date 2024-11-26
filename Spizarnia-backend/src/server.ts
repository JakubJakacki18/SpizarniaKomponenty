import express from "express";
import cors from "cors";
import productRouter from "./routers/product.router";
import containerRouter from "./routers/container.router"
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
app.listen(port, () =>
    {
        console.log("Website served on http://localhost:"+port);
    })