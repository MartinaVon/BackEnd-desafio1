class productManager {
    constructor(){
        this.products = []
    } 
    addProduct(title, description, price, thumbnail, code, stock) {
        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        const newProductCode = newProduct.code

        const codeFilter = this.products.some(product => product.code === newProductCode)
        console.log(codeFilter)

        if (!codeFilter && newProduct.title && newProduct.description && newProduct.price && newProduct.thumbnail && newProduct.code && newProduct.stock) {
            
            if (this.products.length === 0) {
                newProduct.id = 1
            } else {
                ///////accedo al id del ultimo elemento del array y lo incremento en uno.
                newProduct.id = this.products[this.products.length - 1].id + 1
            } 
            this.products.push(newProduct)
       }
    }
     getProducts() {
        return this.products
    }
     getProductById(idProducto) {
        const idFilter = this.products.find(product => idProducto === product.id)

        !idFilter && console.log("product not found") 
        return
     }
}

const handleProducts = new productManager()


handleProducts.addProduct("remera", "verde", 200, "url", "0025", "7")
handleProducts.addProduct("pantalon", "verde", "url", "0084", "7")
handleProducts.addProduct("vestido", "verde", 200, "url", "0025", "7")
handleProducts.addProduct("remeron", "verde", 200, "url", "0032", "7")

handleProducts.getProductById(8)

console.log(handleProducts.getProducts())


 