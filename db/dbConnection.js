const mongoose = require('mongoose');

const mongoDB =  `http://localhost:27017/e-shop`;

// Connecting database
module.exports.connectDB = async () => {
    try {
        await mongoose.connect(
            mongoDB,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            },
            () => console.log('database connected successfully'))
    } catch (err) {
        console.error(err)
    }
};
