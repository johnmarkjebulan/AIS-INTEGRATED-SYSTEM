import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: [{ result: 'Authorization token is required. Login first, then send Bearer token.' }]
        });
    }

    try {
        const secret = process.env.SECRET || 'ais_dev_secret_2026';
        const decoded = jwt.verify(token, secret);
        req.userId = decoded.id;
        next();
    } catch {
        return res.status(401).json({
            success: false,
            message: [{ result: 'Invalid or expired token. Please login again.' }]
        });
    }
};

export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.code === 'ECONNREFUSED') {
        return res.status(500).json({
            success: false,
            message: [{ result: 'Cannot connect to MySQL. Start XAMPP Apache and MySQL, then try again.' }]
        });
    }

    if (err.code === 'ER_BAD_DB_ERROR') {
        return res.status(500).json({
            success: false,
            message: [{ result: 'Database not found. Create the database in phpMyAdmin using the name from .env.' }]
        });
    }

    if (err.code === 'ER_NO_SUCH_TABLE') {
        return res.status(500).json({
            success: false,
            message: [{ result: 'Table `user` was not found. Import schema.sql or create the table in phpMyAdmin.' }]
        });
    }

    if (err.code === 'ER_BAD_FIELD_ERROR') {
        return res.status(500).json({
            success: false,
            message: [{ result: 'Database column missing. Import schema.sql or run migration_add_legacy_student_id.sql.' }]
        });
    }

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: [{ result: err.message || 'Internal Server Error' }]
    });
};
