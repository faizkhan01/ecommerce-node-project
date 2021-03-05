// check  user role is "User" or not
const checkUser = (req, res, next) => {
    if (req.role === "user") {
        next();
    } else {
        res.status(403).send(`You are a ${req.role}, only user can access this api`);
    }
};

// check  user role is "admin" or not
const checkAdmin = (req, res, next) => {
    if (req.role === "admin") {
        next();
    } else {
        res.status(403).send(`You are a ${req.role}, only admin can access this api`);
    }
};

// check  user role is "super admin" or not
const checkSuperAdmin = (req, res, next) => {
    if (req.role === "super admin") {
        next();
    } else {
        res.status(403).send(`You are a ${req.role}, only Super admin can access this api`);
    }
};

// export middleware
module.exports.checkUser = checkUser;
module.exports.checkSuperAdmin = checkSuperAdmin;
module.exports.checkAdmin = checkAdmin;