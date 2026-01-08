const { User } = require('../models/index');

class UserRepository {
    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log('Something went wrong in user repo while create:', error);
            throw { error };
        };
    };

    async destroy(userId) {
        try {
            await User.destroy({
                where: {
                    id: userId
                }
            });
            return true;
        } catch (error) {
            console.log('Something went wrong in user repo while destroy:', error);
            throw { error };
        }
    };
};

module.exports = UserRepository;