import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: 3307,
    password: '123456',
    database: 'nodejsbase'
});



export default pool;