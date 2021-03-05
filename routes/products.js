var express = require('express');
var router = express.Router();
var Products = require('../models/productsSchema');
const checkLoginUser = require('../middlewares/checkLoginUser');
const checkRole = require('../middlewares/checkingRole');
const axios = require("axios");
// Get products 
router.get('/',
    checkLoginUser,
    async (req, res, next) => {
        try {
            // Find all products from database
            const products = await Products.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).send(error);
        }
    });


// Post products
router.post(
    '/add-product',
    checkLoginUser,
    checkRole.checkSuperAdmin,
    async (req, res, next) => {
        try {
            // create products object
            const productsDetails = new Products(req.body);
            // save products in database
            const addProducts = await productsDetails.save();
            console.log('successfully added products');
            res.status(200).json(addProducts);

        } catch (error) {
            res.status(500).send(error);
        }
    });

// generate-products
router.post('/generate-products',
    checkLoginUser,
    checkRole.checkSuperAdmin,
    async (req, res, next) => {
        try {
            const getProducts = await axios.get("https://fakestoreapi.com/products");
            const products = await Products.insertMany(getProducts.data);
            res.status(200).send(products);
        } catch (error) {
            res.status(500).send(error.message);
        }
    })

module.exports = router;
