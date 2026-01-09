
const validateUserAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            data: {},
            message: 'Something went wrong',
            err: 'email or password is missing in signin requesst',
        });
    };
    next();
};

const validateIsAdminRequest = (req, res, next) => {
    if(!req.body.id) {
        return res.status(400).json({
            success: false,
            data: {},
            message: 'Something went wrong',
            err: 'Please provide the UserId',
        });
    };
    next();
};

module.exports = {
    validateUserAuth,
    validateIsAdminRequest,
};