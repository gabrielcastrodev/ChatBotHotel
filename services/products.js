var _ = require('lodash');
var Promise = require('bluebird');

var allCategories = _.times(1)
    .map(function (i) {
        return {
            name: 'Quarto Executivo ' + (i + 1),
            imageUrl: 'https://raw.githubusercontent.com/gabrielcastrodev/ChatBotHotel/master/images/Hotel_' + (i + 1) + '.jpg'
        };
    });

var allProducts = _.times(3)
    .map(function (i) {
        return {
            name: 'Quarto Executivo ' + (i + 1) + '\u2122',
            imageUrl: 'https://raw.githubusercontent.com/gabrielcastrodev/ChatBotHotel/master/images/Hotel_' + (i + 1) + '.jpg',
            price: Math.floor(Math.random() * 100) + 10 + .99
        };
    });

var productsService = {
    // Categories
    getCategories: function (pageNumber, pageSize) {
        return pageItems(pageNumber, pageSize, allCategories);
    },

    // Get Single Category
    getCategory: function (categoryName) {
        var category = _.find(allCategories, ['name', categoryName]);
        return Promise.resolve(category);
    },

    // Products
    getProducts: function (categoryName, pageNumber, pageSize) {
        return pageItems(pageNumber, pageSize, allProducts);
    },

    // Get Single Product
    getProduct: function (productName) {
        var product = _.find(allProducts, ['name', productName]);
        return Promise.resolve(product);
    }
};

// helpers
function pageItems(pageNumber, pageSize, items) {
    var pageItems = _.take(_.drop(items, pageSize * (pageNumber - 1)), pageSize);
    var totalCount = items.length;
    return Promise.resolve({
        items: pageItems,
        totalCount: totalCount
    });
}

// export
module.exports = productsService;