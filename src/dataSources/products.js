const { MongoDataSource } = require('apollo-datasource-mongodb')

class Products extends MongoDataSource {
    async getProducts() {
        return await this.model.find();
    }

    async getProduct(id) {
        return await this.findOneById(id);
    }

    async createProduct({ title, description, type, brand, collection, category, price, sale, discount, picture, stock, tags, variants, images, sortBy }) {
        return await this.model.create({ title, description, type, brand, collection, category, price, sale, discount, picture, stock, tags, variants, images, sortBy });
    }
}

module.exports = Products;