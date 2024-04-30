const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json())
app.use(express.json());
// Serve static files from the 'public' directory
app.use('/public', express.static('public'));


// Router Path



const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: "root",
  password: "",
  database: 'ebook',
  port: 3307 // Specify your database port here
});
const promisePool = pool.promise();

// Using middleware for using JSON

// Custom middleware to attach promisePool to req
app.use((req, res, next) => {
  req.promisePool = promisePool;
  next();
});


// Error handling middleware for database connection
app.use((err, req, res, next) => {
  console.error('Error connecting to the database:', err.message);
  res.status(500).json({ error: 'Check the database coneection' });
});


// Defining Routes Link----------------->

const userRouter = require('./Routes/user');
const login = require('./Routes/auth');
const books = require('./Routes/books')
const favorite = require('./Routes/favorities');
const continueReading = require('./Routes/continueReading');

// Creating the End Points---------------->
app.use('/user', userRouter);
app.use('/login', login);
app.use('/books',books);
app.use('/favorite', favorite);
app.use('/continueReading',continueReading);





app.listen(PORT, () => {
  console.log("Server is Started at 3000")
});



