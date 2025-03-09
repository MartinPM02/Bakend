"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.getUserController = exports.getUsersController = exports.registerUserController = void 0;
const user_service_1 = require("../services/user.service");
// Registrar usuario
const registerUserController = async (req, res, next) => {
    try {
        const user = await (0, user_service_1.createUser)({ ...req.body, role: "REGULAR" });
        res.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.registerUserController = registerUserController;
// Obtener todos los usuarios
const getUsersController = async (req, res, next) => {
    try {
        const users = await (0, user_service_1.getAllUsers)();
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
};
exports.getUsersController = getUsersController;
// Obtener un usuario por ID
const getUserController = async (req, res, next) => {
    try {
        const user = await (0, user_service_1.getUserById)(Number(req.params.id));
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.getUserController = getUserController;
// Actualizar usuario
const updateUserController = async (req, res, next) => {
    try {
        const userRole = req.user?.role;
        const user = await (0, user_service_1.updateUser)(Number(req.params.id), req.body, userRole);
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.updateUserController = updateUserController;
// Eliminar usuario (soft delete)
const deleteUserController = async (req, res, next) => {
    try {
        const userRole = req.user?.role;
        const user = await (0, user_service_1.softDeleteUser)(Number(req.params.id), userRole);
        res.status(200).json({ message: "Usuario eliminado (soft delete)", user });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUserController = deleteUserController;
