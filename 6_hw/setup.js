import connection from './db.js';
import mysql from 'mysql2';

const createUsersTable = `
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2)  NOT NULL
)
`;

connection.query(createUsersTable, (err, results) => {
  if (err) {
    console.error('Error creating products table:', err.stack);
    return;
  }
  console.log('Products table created successfully!');
});

export default connection;
