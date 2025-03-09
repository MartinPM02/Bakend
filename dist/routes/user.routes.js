"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = require("../services/user.service");
const user_controller_1 = require("../controllers/user.controller");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const adminMiddleware_1 = require("../middlewares/adminMiddleware");
const router = (0, express_1.Router)();
// Login de usuario
router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const data = await (0, user_service_1.loginUser)(email, password);
        res.json(data);
    }
    catch (error) {
        next(error);
    }
});
// Registro de usuario
router.post("/register", user_controller_1.registerUserController);
// Obtener todos los usuarios (solo admin)
router.get("/", authMiddleware_1.authMiddleware, adminMiddleware_1.adminMiddleware, user_controller_1.getUsersController);
// Obtener un usuario por ID
router.get("/:id", authMiddleware_1.authMiddleware, user_controller_1.getUserController);
// Perfil del usuario autenticado
router.get("/profile", authMiddleware_1.authMiddleware, (req, res) => {
    res.json({ message: "Acceso permitido", user: req.user });
});
// Actualizar usuario
router.put("/:id", authMiddleware_1.authMiddleware, user_controller_1.updateUserController);
// Eliminar usuario (soft delete)
router.delete("/:id", authMiddleware_1.authMiddleware, adminMiddleware_1.adminMiddleware, user_controller_1.deleteUserController);
exports.default = router;
