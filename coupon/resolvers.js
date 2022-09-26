const couponResolvers = {
  Query: {},
  Coupon: {
    // create a new coupon
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
      console.log("firstName:", name);
    },
  },
};

module.exports = couponResolvers;
