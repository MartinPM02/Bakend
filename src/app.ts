import express from "express";
import { Router } from "express";

const app = express();

app.use(express.json());

const userRoutes = Router();

// Define your routes here
userRoutes.get("/", (req, res) => {
res.send("User route");
});

// Rutas
app.use("/api/users", userRoutes); // Se accede con /api/users en lugar de solo /users

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});

