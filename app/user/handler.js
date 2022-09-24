const { User } = require('../../models');
const bcrypt = require('bcrypt');
const { 
    validateUserCreatePayload, 
    validateUserUpdatePayload,
    validateUserLoginPayload, 
} = require('../../validator/user');
const { generateAccessToken } = require('../../utils/TokenManager');

module.exports = {
    handlerGetAllUser: async (req, res, next) => {
        try {
            const users = await User.findAll();
            const user = await users.map((e) => {
                const { id, fullName, shortName, photo } = e;
                return { id, fullName, shortName, photo }
            })
            res.status(200).json({
                status : "success",
                message: "Successfully get all users",
                data: user
            });
        } catch (error) {
            next(error);
        }
    },
    handlerGetUserById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error("User not found");
            }
                res.status(200).json({ 
                    status: "success",
                    message: "Successfully get user by id",
                    data: user
                });
        } catch (error) {
            next(error); 
        }
    },
    handlerPostUser: async (req, res, next) => {
        try {
            const { email, password, fullName, shortName, biodata, angkatan, jabatan } = req.body;
        
            validateUserCreatePayload(req.body);
            const hashPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                email,
                password: hashPassword,
                fullName,
                shortName,
                biodata,
                angkatan,
                jabatan,
            });
            res.status(200).json({    
                status: "success",
                message: "Successfully create user",
                data: {
                    id: user.id,
                    email: user.email,
                    fullName: user.fullName, 
                    shortName: user.shortName, 
                    biodata: user.biodata, 
                    angkatan: user.angkatan, 
                    jabatan: user.jabatan}
            });
        } catch (error) {
            next(error);
        }
    },
    handlerPutUserById : async (req, res, next) => {
        try {
            const { id } = req.params;
            const { fullName, shortName, biodata, angkatan, jabatan } = req.body;
            validateUserUpdatePayload({ id, fullName, shortName, biodata, angkatan, jabatan });
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error("User not found");
            } 
            await user.update({
                fullName,
                shortName,
                biodata,
                angkatan,
                jabatan,
            });
            res.status(200).json({    
                status: "success",
                message: "Successfully update user"
            });
        } catch (error) {
            next(error);
        }
    },
    handlerDeleteUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                res.status(404).json({
                    message: "User not found",
                });
            } else {
                await user.destroy();
                res.status(200).json({
                    status: "success",
                    message: "Successfully delete user"
                });
            }
        } catch (error) {
            next(error);
        }
    },
    handlerGetUserByName: async (req, res) => {
        try {
            const { name } = req.query;
            const users = await User.findAll({
                where: {
                    fullName: name,
                },
            });
            res.status(200).json({
                status: "success",
                message: "Successfully get user by name",
                data: users
            }); 
        } catch(error) {
            next(error); 
        }
    },
    handlerLoginUser: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            validateUserLoginPayload(req.body);
            const user = await User.findOne({
                where: {
                    email,
                },
            });

            if (!user) {
                throw new Error("User not found");
            }
            const passwordValid = bcrypt.compareSync(password, user.password); 
            if (!passwordValid) {
                throw new Error("Password not valid");
            }
            
            const accessToken = generateAccessToken({
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                jabatan: user.jabatan,
            });
            res.status(200).json({
                status: "success",
                message: "Successfully login",
                data: {
                    user,
                    accessToken,
                },
            });
        } catch (error) {
            next(error);
        }
    },
}