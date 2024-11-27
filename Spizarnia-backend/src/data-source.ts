import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./models/User"
import { Product } from "./models/Product"
import { Container } from "./models/Container"
import { Shelf } from "./models/Shelf"
import { ListOfProductsToBuy } from "./models/ListOfProductsToBuy"
import { Ingredient } from "./models/Ingredient"
import { ProductModel } from "./models/ProductModel"
import { Recipe } from "./models/Recipe"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "pantry",
    synchronize: true,
    logging: false,
    entities: [User, Product, Container,Shelf,ListOfProductsToBuy,Ingredient,ProductModel,Recipe],
    migrations: [],
    subscribers: [],
})
