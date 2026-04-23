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

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: [{ result: err.message || 'Internal Server Error' }]
    });
};
