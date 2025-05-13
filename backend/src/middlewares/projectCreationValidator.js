const InvalidLengthError = require("../errors/InvalidLengthError");
const InvalidFormatError = require("../errors/InvalidFormatError");
const InvalidDateError = require("../errors/InvalidDateError")
const MissingFieldError = require("../errors/MissingFieldError");
const ResourceNotFoundError = require("../errors/ResourceNotFoundError");
const userService = require("../services/userService");

const projectCreationValidator = {
    validate: async(req, res, next) => {
        try {
            
            const userId = req.user.id;
            const user = await userService.getUserById(userId);
            if (!user) {
                throw new ResourceNotFoundError("User not found");
            }
            const {title, description, start_date, due_date, members = []} = req.body;
            //validate title
            if (!title) {
                throw new MissingFieldError("Missing project's title");
            }
            if (title.length > 50) {
                throw new InvalidLengthError("Title must be less than 50 characters")
            }

            //validate description

            if (!description) {
                throw new MissingFieldError("Missing project's description");
            }

            // validate date
            if (!start_date || !due_date) 
                throw new MissingFieldError("Missing start date or due date");
            
            const now = new Date();
            const startDate = new Date(start_date);
            const dueDate = new Date(due_date)
            if (startDate < now) {
                throw new InvalidDateError("Start date must be now or future")
            }
            if (startDate > dueDate) {
                throw new InvalidDateError("Start date must be before due date")
            } 
            // validate members
            if (!Array.isArray(members)) {
                throw new InvalidFormatError("Invalid members field")
            }
            next();
        } catch (error) {
            next(error)
        }
    }
};

module.exports = projectCreationValidator;