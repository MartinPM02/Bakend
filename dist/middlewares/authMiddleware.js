"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET || "tu_clave_secreta";
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Acceso denegado" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY); // Forzar el tipo
        req.user = decoded; // Ahora TypeScript sabe que `req.user` existe y tiene `id` y `role`
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Token inválido" });
    }
};
exports.authMiddleware = authMiddleware;
