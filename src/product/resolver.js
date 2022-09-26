// const products = require('./data');
const loadCurrency = require("../currency/data");
const InstagramData = require("../instagram/data");
const BlogData = require("../Blogs/data");

const _ = require("lodash");
const ProductResponse = require("./schema");
const Fuse = require("fuse.js");
const Product = require("../models/Product");
// const products = require("./data");
const Products = require("../dataSources/products");
const Order = require("../models/order");
const Category = require("../models/Category");
const Coupon = require("../models/Coupon");
const Transaction = require("../models/Transaction");
const Page = require("../models/Page");
const Menu = require("../models/Menu");

var allProducts;
const pro = async () => {
  allProducts = await Product.find({});
};
pro();
// .then(() => console.log("All products:", allProducts));
const productResolvers = {
  Query: {
    products: (root, args, context, info) => {
      console.log("I call", args);
      const fuse = new Fuse(allProducts, {
        threshold: 0.6,
        minMatchCharLength: 2,
        keys: ["title", "brand", "category", "type"],
      });

      if (args.text && args.text !== "") {
        Products = fuse.search(args.text);
      }
      const getVisibleproducts = () => {
        const filtered = allProducts
          .filter((product) => {
            console.log("products", product.title);
            console.log("type", args.type, product.type);
            let typeMatch;

            if (args.type && product.type)
              typeMatch = product.type === args.type;
            else typeMatch = true;

            console.log("typeMatch: ", typeMatch);

            let categoryMatch;
            if (args.category && product.category)
              categoryMatch = args.category.includes(product.category);
            else categoryMatch = true;

            let brandMatch;
            if (
              undefined !== args.brand &&
              args.brand?.length &&
              product.brand
            ) {
              console.log("I call if", args.brand, product.brand);
              brandMatch = args.brand.includes(product.brand);
            } else {
              console.log("I call else");
              brandMatch = true;
            }

            let colorMatch;
            if (args.color && product.variants) {
              colorMatch = product.variants.some(
                (vari) => vari.color === args.color
              );
            } else {
              colorMatch = true;
            }

            let sizeMatch;
            if (args.size && product.variants) {
              sizeMatch = product.variants.some(
                (vari) => vari.size === args.size
              );
            } else {
              sizeMatch = true;
            }

            const startPriceMatch =
              typeof args.priceMin !== "number" ||
              args.priceMin <= product.price;
            const endPriceMatch =
              typeof args.priceMax !== "number" ||
              product.price <= args.priceMax;

            return (
              typeMatch &&
              brandMatch &&
              colorMatch &&
              sizeMatch &&
              startPriceMatch &&
              endPriceMatch
            );
          })
          .sort((product1, product2) => {
            if (args.sortBy === "HighToLow") {
              return product2.price < product1.price ? -1 : 1;
            } else if (args.sortBy === "LowToHigh") {
              return product2.price > product1.price ? -1 : 1;
            } else if (args.sortBy === "Newest") {
              return product2.id < product1.id ? -1 : 1;
            } else if (args.sortBy === "AscOrder") {
              return product1.title.localeCompare(product2.title);
            } else if (args.sortBy === "DescOrder") {
              return product2.title.localeCompare(product1.title);
            } else {
              return product2.id > product1.id ? -1 : 1;
            }
          });
        // console.log('Product with filter:', filtered)
        return filtered;
      };
      // console.log("products:", allProducts.length)
      const items = allProducts;
      const types = args.type !== "all" ? args.type : items;
      const brands = args.brand !== [] ? args.brand : items;
      const colors = args.color !== "" ? args.color : items;
      const sortBy = args.sortBy !== [] ? args.sortBy : items;
      const sizes = args.size !== [] ? args.size : items;
      console.log("brands", brands);
      console.log("items..........", items?.length);

      const filterData = getVisibleproducts(
        items,
        types,
        brands,
        colors,
        sortBy,
        sizes
      );
      const total = filterData?.length;

      console.log("filter data", total);
      const slice = filterData.slice(
        args.indexFrom,
        args.indexFrom + args.limit
      );
      // console.log("products:", slice.length, slice,)

      if (args.type === "all") {
        return {
          items: allProducts.slice(args.indexFrom, args.indexFrom + args.limit),
          total: allProducts.length,
          hasMore: allProducts.length > args.indexFrom + args.limit,
        };
      } else {
        return {
          items: filterData.slice(args.indexFrom, args.indexFrom + args.limit),
          hasMore: total > args.indexFrom + args.limit,
          total,
        };
      }
    },

    // product: (root, args, context, info) => products.find(e => e.id === args.id),
    product: async (root, args, context, info) => {
      const product = await Product.findOne({ _id: args.id });
      console.log("product", product);
      return product;
    },
    productByType: (root, args, context, info) =>
      products.filter((e) => e.type === args.type),
    productByCategory: (root, args, context, info) => {
      console.log("args", args);
      return products.filter((e) => e.category === args.category);
    },

    instagram: (root, args, context, info) =>
      InstagramData.filter((e) => e.type === args.type),
    blog: (root, args, context, info) =>
      BlogData.filter((e) => e.type === args.type),

    getBrands: (root, args, context, info) => {
      const data = products.filter((item) => item.type === args.type);
      const brands = [...new Set(data.map((item) => item.brand))];
      return { brand: brands };
    },
    getColors: (root, args, context, info) => {
      const color = [];
      const data = products.filter(
        (item) => item.type === "fashion" || item.type === args.type
      );
      data.filter((product) => {
        product.variants.filter((variant) => {
          if (variant.color) {
            const index = color.indexOf(variant.color);
            if (index === -1) color.push(variant.color);
          }
        });
      });
      return { colors: color };
    },
    getSize: (root, args, context, info) => {
      const sizes = [];
      const data = products.filter(
        (item) => item.type === "fashion" || item.type === args.type
      );
      data.filter((product) => {
        product.variants.filter((variant) => {
          if (variant.size) {
            const index = sizes.indexOf(variant.size);
            if (index === -1) sizes.push(variant.size);
          }
        });
      });
      return { size: sizes };
    },
    newProducts: (root, args, context, info) => {
      return allProducts.filter((item) => {
        var cond = Boolean;
        if (args.type) cond = item.type === args.type && item.newP === true;
        else cond = item.newP === true;

        return cond;
      });
    },
    getProducts: async (root, args, context, info) => {
      const indexFrom = 0;
      // console.log(`getProducts:`, products)
      // return products.splice(indexFrom, indexFrom + args.limit);
      const products = await Product.find({}).limit(args.limit);
      return products;
    },
    getCurrency: () => {
      return loadCurrency;
    },
    getOrders: async (root, args, context, info) => {
      const orders = await Order.find({});

      return orders;
    },
    getOrder: async (root, args, context, info) => {
      console.log("args,", args);
      const order = await Order.findOne({ orderID: args.id });
      console.log("order", order);
      return order;
    },
    getCategories: async (root, args, context, info) => {
      console.log("args,", args);
      const categories = await Category.find({});

      return categories;
    },
    getTransactions: async (root, args, context, info) => {
      const transaction = await Transaction.find({});
      return transaction;
    },
    getCoupons: async (root, args, context, info) => {
      const coupon = await Coupon.find({});
      return coupon;
    },
    getPages: async (root, args, context, info) => {
      const newPage = await Page.find({});

      return newPage;
    },
    getPage: async (root, args, context, info) => {
      console.log(args);

      const page = await Page.findOne({ slug: args.slug });
      console.log("page", page);
      return page;
    },
    getMenus: async (root, args, context, info) => {
      const allMenus = await Menu.find({});
      console.log(allMenus);
      return allMenus;
    },
  },

  Product: {
    id: (parent) => parent.id,
    title: (parent) => parent.title,
  },

  Mutation: {
    // create a new product
    createProduct: async (
      _,
      {
        title,
        description,
        type,
        brand,
        collections,
        category,
        price,
        sale,
        discount,
        stock,
        newP,
        tags,
        variants,
        images,
      }
    ) => {
      const newProduct = await Product.create({
        title,
        description,
        type,
        brand,
        collections,
        category,
        price,
        sale,
        discount,
        stock,
        newP,
        tags,
        variants,
        images,
      });

      console.log(
        "order created",
        // sale,
        // title,
        // brand,
        // discount,
        // stock,
        // collections,
        // newP,
        // description
        // tags,
        variants
        // images
      );

      return newProduct;
    },
    // create a order

    createOrder: async (
      _,
      {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        country,
        postalCode,
        orderID,
        deliveryDate,
        paymentMethod,
        cartItems,
        cartTotal,
        status,
        order_status,
      }
    ) => {
      const cart = cartItems?.map((i) => {
        const product = {
          id: i.id,
          qty: i.qty,
          total: i.total,
          title: i.title,
          description: i.description,
          // type: i.type,
          brand: i.brand,
          category: i.category,
          price: i.price,
          sale: i.sale,
          discount: i.discount,
          stock: i.stock,
          newP: i.newP,

          variants: i.variants,
        };
        return product;
      });
      console.log("cartItems", cartItems, email);

      const newOrder = await Order.create({
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        country,
        postalCode,
        orderID,
        deliveryDate,
        paymentMethod,
        status: "Cash On Delivery",
        order_status: "Paid",
        // cartMins: cart,
        cartItems: [...cart],
        cartTotal,
      });

      console.log("order", newOrder);
      return newOrder;
    },

    // create Category
    createCategory: async (_, { name, subCategories, icon }) => {
      const category = await Category.create({ name, subCategories, icon });
      console.log("createCategory", name, subCategories, icon);
      console.log("category", category, icon);
    },

    deleteCategory: async (_, { id }) => {
      console.log("deleteCategory", id);

      const dlt = await Category.deleteOne({ _id: id });
      console.log("dlt", dlt);
      return dlt;
    },
    createTransaction: async (
      _,
      { orderID, transactionID, paymentMethod, status, amount }
    ) => {
      const newTransaction = await Transaction.create({
        orderID,
        transactionID,
        paymentMethod,
        status,
        amount,
      });
      console.log("createTransaction:", transactionID);
      return newTransaction;
    },
    createCoupon: async (
      _,
      {
        category,
        code,
        customer,
        discountType,
        freeShipping,
        limit,
        maxSpend,
        minSpend,
        name,
        products,
        qty,
        status,
      }
    ) => {
      const newCoupon = await Coupon.create({
        category,
        code,
        customer,
        discountType,
        freeShipping,
        limit,
        maxSpend,
        minSpend,
        name,
        products,
        qty,
        status,
      });
      console.log("newCoupon:", newCoupon);
      return newCoupon;
    },
    createPage: async (_, { title, description, slug }) => {
      console.log(title, description, slug);
      const newPage = await Page.create({ title, description, slug });
      return newPage;
    },
    createMenu: async (_, { name, primary, status, menuList }) => {
      const newMenu = await Menu.create({ name, primary, menuList });

      console.log(newMenu);
      return newMenu;
    },
  },
};

module.exports = productResolvers;
