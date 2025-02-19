import "reflect-metadata"
import { DataSource } from "typeorm"
import { Category } from './models/Category';
import { Product } from "./models/Product"
import { ListOfProductsToBuy } from "./models/ListOfProductsToBuy"
import { Ingredient } from "./models/Ingredient"
import { ProductModel } from "./models/ProductModel"
import { Recipe } from "./models/Recipe"

//host: localhost - podczas uruchamiania bez dockera lokalnie
//host: spizarnia-db - podczas uruchamiania z dockerem

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "spizarnia-db",
    port: 3306,
    username: "root",
    password: "",
    database: "pantry",
    synchronize: true,
    logging: false,
    entities: [Product,Category,ListOfProductsToBuy,Ingredient,ProductModel,Recipe],
    migrations: [],
    subscribers: [],
})
