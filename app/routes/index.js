module.exports = (app) => {
    const productRoute = require('./product.route');
    const categoryRoute = require('./category.route');
    productRoute(app);
    categoryRoute(app);
};