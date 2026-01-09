const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { UserRepository } = require('../repository/index');
const { JWT_KEY } =require('../config/serverConfig');

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

    async signIn(email, plainPassword) {
        try {
            const user = await this.UserRepository.getByEmail(email);
            const passwordMatch = this.checkPassword(plainPassword, user.password);
            if(!passwordMatch) {
                console.log('Password doesnt match');
                throw { error: 'Incorrect Password'};
            };

            const newJwt = this.createToken({
                email: user.email,
                id: user.id,
            })
            return newJwt;
        } catch (error) {
            console.log('Something went wrong in user repo while singin:', error);
            throw { error };
        }
    };

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response) {
                throw { error: 'Invalide token' };
            };
            const user = this.UserRepository.getById(response.id);
            if(!user) {
                throw { error: 'No user with this corresponding token' };
            };
            return user.id;
        } catch (error) {
            console.log('Something went wrong at service layer in token authentication:', error);
            throw { error };
        };
    };

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: '1h'});
            return result;
        } catch (error) {
            console.log('Something went wrong at service layer in token creation:', error);
            throw { error };
        }
    };

    verifyToken(token) {
        try {
            const result = jwt.verify(token, JWT_KEY);
            return result;
        } catch (error) {
            console.log('Something went wrong at service layer in token verification:', error);
            throw { error };
        }
    };

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log('Something went wrong at service layer in password comparison:', error);
            throw { error };
        };
    };

    isAdmin(userId) {
        try {
            return this.UserRepository.isAdmin(userId)
        } catch (error) {
            console.log('Something went wrong at service layer while check user is admin or not:', error);
            throw { error };
        }
    }
};

module.exports = UserService;