const productTypeDefs = `
    type Product {
        id: ID!
        title: String
        description: String
        type: String
        brand: String
        collections: [String]
        category: String
        price: String
        sale: Boolean
        discount: String
        picture:Int
        stock: String
        newP: Boolean
        tags: [String]
        variants: [Variants]
        
        sortBy: _SortBy
      }

 
      type Images {
        image_id: Int
        id: Float
        alt: String
        image: String
        variant_id: [Int]
    }

    type Variants {
      
      sku:String
      size:[String]
      color:[String]
      image: String
     }

     type Currency {
      currency : String
      name : String
      symbol : String
      value : Int
    }
    
    type Instagram {
      type:String
      img:String
    }

    type Brand {
      brand:[String]
    }

    type Color {
      colors:[String]
    }

    type Size {
      size : [String]
    }

    enum _SortBy {
      HighToLow,
      LowToHigh,
      Newest,
      AscOrder,
      DescOrder,
    }

    enum _CategoryType {
      electronics,
      vegetables,
      furniture,
      jewellery,
      fashion,
      beauty,
      flower,
      tools,
      watch,
      metro,
      shoes,
      bags,
      kids,
      game,
      gym,
      pets,
      portfolio,
      goggles,
      videoslider,
      marijuana,
      nursery,
      christmas,
      marketplace,
      light,
      all
      
    }

    type ProductResponse {
      items:[Product],
      total:Int,
      hasMore:Boolean
    }
    type DeleteResponse{
      deletedCount: Int
    }

    type Blog {
      type:String,
      img:String,
      link:String,
      title:String,
      desc:String,
      date:String,
      shortDesc:String,
      longDesc:String
    }
    
    scalar Date

    type Order {
      id: ID
      firstName: String
      lastName: String
      email: String
      phone: String
      address: String
      city: String
      state: String
      country: String
      postalCode: String
      orderID: String
      status: String,
      order_status: String,
      deliveryDate: String
      paymentMethod: String
      cartItems: [CartItem]
      cartTotal: Float
      createdAt: Date
    }

    type CartItem {
      id: String
      title: String
        description: String
        type: String
        brand: String
        category: String
        price: String
        sale: Boolean
        discount: String
        
        stock: String
        newP: Boolean
        variants: [Variants]
      qty:  Int
      total: Float
      
    }

type Category {
  id: ID
  name: String
  subCategories: [String]
  icon: String
}

type Page {
  id: ID
  title: String
  description: String
  slug: String
  createdAt: Date

}



input VariantsInput{
    
      sku:String
      size:[String]
      color:[String]
      image: String
    }

    input CartItemInput{
      id: String
      title: String
        description: String
        type: String
        brand: String
        category: String
        price: String
        sale: Boolean
        discount: String
    
        stock: String
        newP: Boolean
        
        variants: [VariantsInput]
      qty:  Int
      total: Float
      
    }

    input ImagesInput {
      image_id: Int
      id: Float
      alt: String
      image: String
      variant_id: [Int]
    }
    
    
    type Coupon {
      category: String
      code: String
      customer: String
      discountType: String
      freeShipping: Boolean
      limit: String
      maxSpend: String
      minSpend: String
      name: String
      products: String
      qty: String
      status: Boolean
      }

      type Transaction{
        orderID: String
        transactionID: String
        paymentMethod: String
        status: String
        amount: String
        createdAt: Date
      }

      type Menu{
        id: ID
        name: String
        primary: Boolean
        createdAt: Date
        menuList: String,
      }

      

    type Query {
        product(id: ID!): Product
        products(indexFrom:Int , limit:Int ,type:String ,text :String ,brand: [String],size:[String] , color:String ,sortBy:_SortBy ,priceMin:Int ,priceMax:Int ): ProductResponse
        productByType(type:String):[Product]
        productByCategory(category:String):[Product]
        instagram(type:String):[Instagram]
        blog(type:String):[Blog]
        getBrands(type:String):Brand!
        getColors(type:String):Color!
        getSize(type:String):Size!
        newProducts(type:String):[Product]
        getProducts(limit:Int):[Product]
        getCurrency:[Currency]

        getOrders(indexFrom:Int): [Order]
        getOrder(id: String!):Order

        getCategories(indexFrom:Int):[Category]
        
        getTransactions(indexFrom:Int):[Transaction]

        getCoupons(indexFrom:Int):[Coupon]

        getPages(indexFrom:Int):[Page]

        getPage(slug:String):Page

        getMenus(indexFrom:Int):[Menu]
      }
  
     type Mutation {
         
         createProduct(
          title: String
          description: String
          type: String
          brand: String
          collections: [String]
          category: String
          price: String
          sale: Boolean
          discount: String
          picture:Int
          stock: String
          newP: Boolean
          tags: [String]
          variants: [VariantsInput]
          images:[ImagesInput]
          sortBy: _SortBy
          ) : Product

          createOrder(
            firstName: String
            lastName: String
            email: String
            phone: String
            address: String
            city: String
            state: String
            country: String
            postalCode: String
            orderID: String
            deliveryDate: String
            paymentMethod: String
            cartItems: [CartItemInput]
            cartTotal: Float
          ): Order

          createCategory(
            icon: String 
            subCategories: [String] 
            name: String
            ): Category

          deleteCategory(id: ID): DeleteResponse

          createCoupon(
            category: String
            code: String
            customer: String
            discountType: String
            freeShipping: Boolean
            limit: String
            maxSpend: String
            minSpend: String
            name: String
            products: String
            qty: String
            status: Boolean
        ): Coupon

        createTransaction(
          orderID: String
          transactionID: String
          paymentMethod: String
          status: String
          amount: String): Transaction

          createPage(
            title:String
            description: String
            slug: String
            ): Page

            createMenu(
              name: String      
              primary: Boolean
              menuList: String,
              ): Menu
     }

`;

// createUser(name: String, email: String, password: String): User
// createRecipe(
//   userId: Int
//            title: String
//            ingredients: String
//            direction: String
// ): Recipe

module.exports = productTypeDefs;
