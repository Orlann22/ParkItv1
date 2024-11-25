const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
// const { Xendit } = require('xendit-node');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Enable Cross-Origin requests
app.use(cors());

// app.post("/login", (req, res) => {
//     console.log(req.body)
// })

// Configure sessions
app.use(
  session({
    secret: 'your_secret_key', // Change to a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  })
);

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        // Replace with your MySQL username
    password: '',        // Replace with your MySQL password
    database: 'test',   // Replace with your database name
  });

// Test MySQL Connection
db.connect((err) => {
    if (err) {
      console.error('MySQL connection error:', err);
    } else {
      console.log('Connected to MySQL database.');
    }
  });

// Signup route
app.post('/signup', async (req, res) => {
    var { username, email, password, mobile } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    password = await bcrypt.hash(password, 10);
  
    const query = 'INSERT INTO users (username, email, password, mobile) VALUES (?, ?, ?, ?)';
  
    db.query(query, [username, email, password, mobile], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ message: 'Database error' });
      }
  
      res.status(201).json({ message: 'User added successfully' });
    });
  });

// Login route
app.post('/signin', (req, res) => {
  var { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length > 0) {
      const passwordDatabase = results[0].password;
      const match = await bcrypt.compare(password, passwordDatabase);
      if(!match) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      // Store user session
      req.session.user = { id: results[0].id, username: results[0].username, email: results[0].email, mobile: results[0].mobile };
      res.status(200).json({ message: 'Login successful', user: req.session.user });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  });
});

// Check if user is logged in
app.get('/session', (req, res) => {
  if (req.session.user) {
    res.status(200).json({ loggedIn: true, user: req.session.user });
  } else {
    res.status(200).json({ loggedIn: false });
  }
});

// Logout route
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      res.status(500).json({ message: 'Logout failed' });
    } else {
      res.status(200).json({ message: 'Logout successful' });
    }
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


//   // Xendit Initialization
// const xenditInstance = new Xendit({
//   secretKey: 'xnd_development_TyMqLOxvtyDJuWU2pZ7bGvyDFdeSQZsIg6MKLx6am2ZzxkZBO9cKPxUK1AKzn', // Replace with your secret key
// });

// const { Invoice } = xenditInstance; // Extract the Invoice service
// const invoiceService = new Invoice(); // Initialize Invoice service

// // Route to create an invoice
// app.post('/create-invoice', async (req, res) => {
//   const { amount, payerEmail, description } = req.body;

//   if (!amount || !payerEmail || !description) {
//     return res.status(400).json({ message: 'Amount, payerEmail, and description are required' });
//   }

//   try {
//     const invoice = await invoiceService.createInvoice({
//       externalID: `invoice-${Date.now()}`, // Unique identifier for this invoice
//       amount,
//       payerEmail,
//       description,
//     });

//     res.status(201).json(invoice); // Send back the created invoice details
//   } catch (error) {
//     console.error('Error creating invoice:', error);
//     res.status(500).json({ message: 'Error creating invoice', error: error.message });
//   }
// });