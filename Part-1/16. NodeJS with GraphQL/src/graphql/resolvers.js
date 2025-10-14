const products = require("../data/products")

// It's like the routes
const resolvers={
    // Get method
    Query:{
        products:() => products,  // list of all products
        product:(_,{id}) => products.find((item) => item.id === id)
    },

    // Post method
    Mutation:{
        createProduct:(_,{title,category,price,inStock}) => {
            const newlyCreatedProduct = {
                id:String(products.length + 1),  // in empty collection, the first data will have id is "1" as (0+1)
                title,
                category,
                price,
                inStock
            }

            products.push(newlyCreatedProduct)
            return newlyCreatedProduct;
        },
        
        // Delete method
        deleteProduct: (_, { id }) => {
            const index = products.findIndex((product) => product.id === id);
            if (index === -1) return false;
            
            products.splice(index, 1);
            
            return true;
        },

        // Update method
         updateProduct: (_, { id, ...updates }) => {
      const index = products.findIndex((product) => product.id === id);
      if (index === -1) return null;

      const updatedProduct = {
        ...products[index],
        ...updates,
      };

      products[index] = updatedProduct;

      return updatedProduct;
    }
    }
}

module.exports=resolvers