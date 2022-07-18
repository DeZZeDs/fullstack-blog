const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/User.js');

class UserController {
    async registerUser (request, response) {
        try {
            const userExist = await userModel.findOne({email: request.body.email});
            if(userExist) {
                const errors = [];
                errors[0] = {
                    msg: 'Пользователь с таким e-mail уже существует'
                }
                return response.json({
                    errors: errors
                })
            }
            const password = request.body.passwordHash;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const document = new userModel({
                email: request.body.email,
                fullName: request.body.fullName,
                passwordHash: hashedPassword,
                avatarUrl: request.body.avatarUrl,

            });
            const user = await document.save();
            const token = jwt.sign({
                _id: user._id,
            }, 'salt', {expiresIn: '30d'});
            const { passwordHash, ...userData} = user._doc;
            response.json({
                ...userData,
                token
            });
        }
        catch(error) {
            console.log(error);
            response.status(500).json({
                error,
            });

        }
    };

    async loginUser(request, response) {
        try {
            const user = await userModel.findOne({email: request.body.email});
            if(!user) {
                return response.json({
                    msg: 'Неверный логин или пароль'
                })
            }

            const isValidPassword = await bcrypt.compare(request.body.passwordHash, user._doc.passwordHash);
            if(!isValidPassword) {
                return response.json({
                    msg: 'Неверный логин или пароль'
                })
            }
            const token = jwt.sign({
                _id: user._id,
            }, 'salt', {expiresIn: '30d'});
            const { passwordHash, ...userData} = user._doc;
            response.json({
                ...userData,
                token
            });

        }
        catch (e) {
            console.log(e);
            response.json({
                msg: "Не удалось авторизоваться"
            });
        }
    };

    async getProfile(request, response) {
        try {
            const user = await userModel.findById(request.userID)
            if(!user) {
                return response.json({
                    msg: "Пользователь не найден"
                })
            }
            const { passwordHash, ...userData} = user._doc;
            response.json({
                ...userData
            });
        }
        catch (e)
        {
            console.log(e);
            response.json({
                msg: "Нет доступа"
            });
        }
    };
}


module.exports = new UserController();
