const { UserRepository } = require('../repository/index');

class UserService {
    constructor() {
        this.UserRepository = new UserRepository();
    };

    async create(data) {
        try {
            const user = await this.UserRepository.create(data);
            return user;
        } catch (error) {
            console.log('Something went wrong in user repo while create:', error);
            throw { error };
        };
    };
};

module.exports = UserService;