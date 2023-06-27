import express from "express"
import productManager from "./productManager.js"

const path = "./src/allProducts.json"
const handleProducts = new productManager(path)

const app = express()
const port = 3019
let allProducts = []

const getAllProducts = async() => {
    try {
        allProducts = await handleProducts.getProducts()
    } catch (error) {
        console.log(error)
    }
} 

getAllProducts()

app.get("/productos", (req, res) => {
    const limit = req.query.limit; // Obtener el valor del query parameter 'limit'
    const limitedProducts = limit ? allProducts.slice(0, limit) : allProducts; // Limitar los productos según el parámetro 'limit' o devolver todos los productos
    //slice es un metodo q devuelve un nuevo array recortado. El primer parametro
    //indica el indice desde donde se comienza a contar, el otro el final. 
    //en este caso el final es el limite de numero que le pongo como query param
    //http://localhost:3017/productos?limit=1
    res.send(limitedProducts);
})

app.listen(port, () => console.log("levantando puerto 3000"))



