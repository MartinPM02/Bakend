"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.softDeleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "supersecreto";
const TOKEN_EXPIRATION = "5m"; // Expira en 5 minutos
// Generar Token JWT
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
};
// Crear usuario (por defecto REGULAR)
const createUser = async (data) => {
    const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
    const user = await prisma.user.create({
        data: {
            ...data,
            password: hashedPassword,
            role: data.role || "REGULAR", // Asignar REGULAR por defecto
        },
    });
    return { user, token: generateToken(user) };
};
exports.createUser = createUser;
// Obtener todos los usuarios (solo ADMIN puede ver)
const getAllUsers = async (userRole) => {
    if (userRole !== "ADMIN") {
        throw new Error("No tienes permiso para ver los usuarios");
    }
    return await prisma.user.findMany({ where: { deletedAt: null } });
};
exports.getAllUsers = getAllUsers;
// Obtener un usuario por ID
const getUserById = async (id) => {
    return await prisma.user.findUnique({ where: { id } });
};
exports.getUserById = getUserById;
// Actualizar usuario (solo ADMIN puede editar)
const updateUser = async (id, data, userRole) => {
    if (userRole !== "ADMIN") {
        throw new Error("No tienes permiso para editar usuarios");
    }
    if (data.password) {
        data.password = await bcrypt_1.default.hash(data.password, 10);
    }
    return await prisma.user.update({ where: { id }, data });
};
exports.updateUser = updateUser;
// Soft delete (solo ADMIN puede eliminar)
const softDeleteUser = async (id, userRole) => {
    if (userRole !== "ADMIN") {
        throw new Error("No tienes permiso para eliminar usuarios");
    }
    return await prisma.user.update({ where: { id }, data: { deletedAt: new Date() } });
};
exports.softDeleteUser = softDeleteUser;
// Login con JWT y refresco de token
const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt_1.default.compare(password, user.password))) {
        throw new Error("Credenciales incorrectas");
    }
    return { user, token: generateToken(user) };
};
exports.loginUser = loginUser;
