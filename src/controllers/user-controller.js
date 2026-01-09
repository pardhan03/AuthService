const { UserService } = require('../services/index');
const { ClientErrorCodes, ServerErrorCodes, SuccessCodes } = require('../utils/err-codes');
const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password,
        });
        return res.status(SuccessCodes.CREATED).json({
            message: 'Successfully created a user',
            data: response,
            success: true,
            err: {},
        });
    } catch (error) {
        console.log(error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error,
        });
    };
};

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(SuccessCodes.CREATED).json({
            message: 'Successfully signed In',
            data: response,
            success: true,
            err: {},
        });
    } catch (error) {
        console.log(error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error,
        });
    };
};

const isAuthenticated = async(req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(SuccessCodes.CREATED).json({
            data: response,
            success: true,
            err: {},
            message: 'User is Authenticated and token is valid',
        });
    } catch (error) {
        console.log(error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error,
        });
    };
}

module.exports = {
    create,
    signIn,
    isAuthenticated,
};