const { User, Role } = require('../models/index');

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

    async getById(userId) {
        try {
            const user = await User.findByPk(userId, {
                attributes: ['email', 'id']
            });
            return user;
        } catch (error) {
            console.log('Something went wrong in user repo while fetch user by id:', error);
            throw { error };
        }
    };

    async getByEmail(userEmail) {
        try {
            const user = await User.findOne({
                where: {
                    email: userEmail,
                }
            });
            return user;
        } catch (error) {
            console.log('Something went wrong in user repo while fetch user by email:', error);
            throw { error };
        }
    };

    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where: {
                    name: 'ADMIN'
                }
            });
            return user.hasRole(adminRole);
        } catch (error) {
            console.log('Something went wrong in user repo while check user is admin or not:', error);
            throw { error };
        }
    }
};

module.exports = UserRepository;