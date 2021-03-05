var express = require('express');
var router = express.Router();
var orderModule = require('../models/orderSchema');
var productsModule = require('../models/productsSchema');
const checkLoginUser = require('../middlewares/checkLoginUser');
const checkRole = require('../middlewares/checkingRole');


/* GET All orders. */
router.get('/',
    checkLoginUser,
    checkRole.checkSuperAdmin,
    async (req, res, next) => {
        try {
            // find all orders from database
            const orders = await orderModule.find()
            res.status(200).json(orders)

        } catch (error) {
            res.status(500).send(error)
        }

    });

// Post order in database
router.post('/make-order',
    checkLoginUser,
    checkRole.checkUser,
    async (req, res, next) => {
        try {
            // create order object
            const orderDetails = new orderModule({
                ...req.body,
                userId: req.userId
            })
            await orderDetails.save()
            res.status(200).send('Ordered Successfully')
        } catch (error) {
            res.status(500).send(error)
        }
    });

// patch order status
router.patch('/update-status',
    checkLoginUser,
    checkRole.checkAdmin,
    async (req, res, next) => {
        try {
            const orderId = req.body.orderId;
            const status = req.body.status;
            // Find order by order Id and update order status
            await orderModule.findByIdAndUpdate(orderId, { status })
            res.status(205).send('order status updated successfully')
        } catch (error) {
            res.status(500).send(error)
        }
    });

// Get pending orders 
router.get('/pending-orders',
    checkLoginUser,
    checkRole.checkAdmin,
    async (req, res, next) => {
        try {
            // Find pending order from database 
            const pendingOrders = await orderModule.find({ 'status': 'pending' })
            res.status(200).json(pendingOrders)
        } catch (error) {
            res.status(500).send(error)
        }
    });

module.exports = router;
