'use strict';

/**
 * Product model
 * @module Product
 */

const mongoose = require('mongoose');

let schema = mongoose.Schema({
    name: { type: String, index: true },
    location: {
        type: { type: String},
        coordinates: [Number]
    }
});

schema.index({location: '2dsphere'});

/**
 * List of products
 * @method list
 * @param filter Object with filter conditions
 * @param skip Number of rows skipped
 * @param limit Number of rows
 * @param sort Sort expression
 * @param select Field names to include, space separated
 * @return {Promise<any>}
 */
schema.statics.list = function(filter?: any,
                               skip?: number, limit?: number,
                               sort?: string, select?: string): Promise<any> {
    const query = Product.find(filter);
    query.sort(sort);
    query.skip(skip);
    query.limit(limit);
    query.select(select);
    return query.exec();
};

export const Product = mongoose.model('Product', schema);
export default Product;
