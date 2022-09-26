const couponTypeDefs = `
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


type Mutation{
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
}
`;

module.exports = couponTypeDefs;
