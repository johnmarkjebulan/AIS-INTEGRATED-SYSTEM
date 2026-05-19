import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DBPASSWORD || '',
    database: process.env.DATABASE || 'ais-integrated-systems',
    port: Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10
});

const connect = async () => {
    return pool.getConnection();
};

export default connect;
