
## Advantages of GraphQL
- REST API => If you go to productPage, then it will fetch all the data of productDetails like title and data 
{
    title: "", "data:""
}
- But in the GraphQL => You can fetch only title, if you don't need the data in the productPage.
- GraphQL solves the problem of REST API i.e. over-fetching.

## Basic Concepts
- Tut video => 09:16:43 - 9:51:00
- npm i @apollo/server graphql graphql-tag

## Code flow of Basics => 
products.js(Dummy data like models) -> schema.js (controllers) -> resolvers.js (routes) -> server.js

## Output is not saved in MongoDB, as we have used the dummy data. MongoDB is connected in next folder.
- List of all products -> As you can see that, we can get only "title" key from all the products.
[!Alt](./1.png) 

- List of product by ID
[!Alt](./2.png)

- Add new product
[!Alt](./3.png)

- Delete a product by ID
[!Alt](./4.png)

- Update a product by ID
[!Alt](./5.png)



