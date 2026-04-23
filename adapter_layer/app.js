import express from "express";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Adapter layer is running."
    });
});

app.use("/user", authRoutes);

const PORT = Number(process.env.ADAPTER_PORT || process.env.PORT) || 5000;
app.listen(PORT, () => {
    console.log(`Adapter layer is running on port ${PORT}`);
});
