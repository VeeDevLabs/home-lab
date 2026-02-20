const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'mysql',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL');
});

app.get('/', (req, res) => {
  connection.query('SELECT NOW() as now', (err, results) => {
    if (err) {
      return res.status(500).send('Database error');
    }
    res.send(`Database time: ${results[0].now}`);
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
