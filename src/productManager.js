
const fs = require("fs")

const path = "./allProducts.json"

class productManager {
    constructor(path){
        this.path = path
    } 

    addProduct = async(title, description, price, thumbnail, code, stock) => {
        try {
            const allProducts = await this.getProducts()

            const newProduct = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }

            const newProductCode = newProduct.code
            const codeFilter = allProducts.some(product => product.code === newProductCode)

            if (!codeFilter 
                && newProduct.title 
                && newProduct.description 
                && newProduct.price 
                && newProduct.thumbnail 
                && newProduct.code 
                && newProduct.stock) {
                if (allProducts.length === 0) {
                    newProduct.id = 1
                } else {
                    ///////accedo al id del ultimo elemento del array y lo incremento en uno.
                    newProduct.id = allProducts[allProducts.length - 1].id + 1
                } 
                allProducts.push(newProduct)
                await fs.promises.writeFile(this.path, JSON.stringify(allProducts, null, '\t'));
           }
        } catch (error) {
            console.log(error);
        }
    }

    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const allProducts = await JSON.parse(data);
                return allProducts;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    getProductById = async(idProducto) => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const allProducts = await JSON.parse(data);

                const idFilter = allProducts.find(product => idProducto === product.id)
                !idFilter && console.log("product not found") 
                return
            } 
        } catch (error) {
            console.log(error);
        }
    }

    updateProduct = async(id, field) => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8")
                const allProducts = await JSON.parse(data)

                const productIndex = allProducts.findIndex(item => item.id = id)
                if (productIndex === -1) {
                    console.log("El producto no existe")
                    return;
                }

                allProducts[productIndex].field = "no se que poner aca"

                await fs.promises.writeFile(this.path, JSON.stringify(allProducts, null, '\t'))
            }
        } catch(error) {
            console.log(error)
        }
    }

    deleteProduct = async(id) => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8")
                const allProducts = await JSON.parse(data)

                const productIndex = allProducts.findIndex(item => item.id = id)

                if (productIndex === -1) {
                    console.log("El producto no existe")
                    return;
                } else {
                    allProducts.splice(productIndex, 1)
                }

                await fs.promises.writeFile(this.path, JSON.stringify(allProducts, null, '\t'))
            }
        }  catch(error) {
            console.log(error)
        }
    }
}

const handleProducts = new productManager(path)


handleProducts.addProduct("remera", "verde", 200, "url", "0025", "7")
handleProducts.addProduct("pantalon", "verde", "url", "0084", "7")
handleProducts.addProduct("vestido", "verde", 200, "url", "0025", "7")
handleProducts.addProduct("remeron", "verde", 200, "url", "0032", "7")

handleProducts.getProductById(8)

console.log(handleProducts.getProducts())


