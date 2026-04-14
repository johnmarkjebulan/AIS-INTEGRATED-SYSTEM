import mysql from 'mysql2/promise.js';

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: "", 
  database: process.env.DATABASE,
  port:3306
});

export default pool;