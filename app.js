import express from "express";
import "dotenv/config";
import cors from "cors";
import connect from "./Auth_System/config/db.js";
import { errorHandler } from "./Auth_System/middleware/authHandler.js";
import userRoutes from "./Auth_System/routes/UserRoutes.js";

const app = express();

const corsOptions = process.env.ORIGIN && process.env.ORIGIN !== "*"
    ? { origin: process.env.ORIGIN }
    : { origin: true };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: [{ result: 'AIS Integrated Systems API is running.' }]
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: [{ result: 'Server is healthy.' }]
    });
});

app.get('/db-check', async (req, res, next) => {
    let conn;
    try {
        conn = await connect();
        const [rows] = await conn.query('SELECT DATABASE() AS database_name');
        res.status(200).json({
            success: true,
            message: [{ result: 'Database connection successful.' }],
            data: rows[0]
        });
    } catch (error) {
        next(error);
    } finally {
        if (conn) conn.release();
    }
});

app.use('/user', userRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: [{ result: 'No such endpoint exists' }]
    });
});

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            success: false,
            message: [{ result: 'Invalid JSON body. Please send valid JSON in Postman.' }]
        });
    }

    next(err);
});

app.use(errorHandler);

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is running! Listening to port ${PORT}...`);
});
