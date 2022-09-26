require("dotenv/config");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
const productTypeDefs = require("./src/product/schema");
const productResolvers = require("./src/product/resolver");
const { Product: ProductModel } = require("./src/models/Product");
const Products = require("./src/dataSources/products");
const { buildSchema } = require("graphql");
const couponTypeDefs = require("./coupon/schema");
const couponResolvers = require("./coupon/resolvers");

const uri = process.env.MONGODB_LOCAL_URI;

const main = async () => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

main()
  .then(console.log("🎉 connected to database successfully"))
  .catch((error) => console.error(error));

// const dataSources = () => ({
//   products: new Products(ProductModel),
// });

// const schema = buildSchema(`
// type Query  {
//   hello: String
// }
// `)
// const root = {
//   hello: () => {
//     return " hello world!"
//   }
// }

const server = new ApolloServer({
  typeDefs: [productTypeDefs],
  resolvers: { ...productResolvers },

  // dataSources,
  introspection: true,
  playground: true,
});

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => console.log("Server is running on localhost:4000", url));
