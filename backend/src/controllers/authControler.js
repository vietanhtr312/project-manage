const authService = require('../services/authService')

const authController = {
    register: async(req, res, next) => {
        try {
            const {name, email, password} = req.body;
            const data = await authService.registerUser(name, email, password);
            res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: data
            });
        } catch (error) {
            next(error)
        }
    },
    login: async(req, res, next) => {
        try {
            const {email, password} = req.body;
            const data = await authService.loginUser(email, password);
            res.status(200).json({
                success: true, 
                message: "Login successfully",
                data: data
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = authController;