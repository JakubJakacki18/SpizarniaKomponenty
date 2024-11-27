import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Product } from "./entity/Product"
import { Container } from "./entity/Container"
import { Shelf } from "./entity/Shelf"
import { ListOfProductsToBuy } from "./entity/ListOfProductsToBuy"
import { Ingredient } from "./entity/Ingredient"
import { ProductModel } from "./entity/ProductModel"
import { Recipe } from "./entity/Recipe"

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
