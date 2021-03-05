var express = require('express');
var router = express.Router();
var usersModule = require('../models/userSchema');
const checkLoginUser = require('../middlewares/checkLoginUser');
const bcrypt = require('bcrypt');
const checkRole = require('../middlewares/checkingRole');


/* post sing up */
router.post('/create-user', async (req, res, next) => {
    try {
        // create user object
        const userDetails = new usersModule({
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10)
        });
        // Save user in database
        await userDetails.save();
        res.status(202).send(`Wow "${req.body.name}" you successfully registered.`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

/* Post User Update. */
router.patch('/update-user',
    checkLoginUser,
    async (req, res, next) => {
        try {
            await usersModule.findByIdAndUpdate(req.userId, {
                ...req.body,
                password: bcrypt.hashSync(req.body.password, 10)
            })
            res.status(205).send('user update successfully');
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

/* GET Delete. */
router.delete('/delete-user',
    checkLoginUser,
    checkRole.checkSuperAdmin,
    async (req, res, next) => {
        try {
            const userId = req.body.userId;
            // find user by id and delete
            const deleteUser = await usersModule.findByIdAndDelete(userId);
            if (deleteUser === null) {
                res.send('userId is not valid/already deleted');
            }
            res.status(200).json()
        } catch (error) {
            res.status(500).send(error.message);
        }
    });



module.exports = router;
