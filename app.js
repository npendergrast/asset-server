const express = require('express');
const cors = require('cors');
const controller = require('./controllers/controllers');
const authController = require('./controllers/auth-controller');
const PORT = process.env.PORT || 5000;

const app = express();

const isAuthenticated = require('./middleware/is-authenticated');

// Use json parser for incoming/outgoing json http
app.use(express.json());
app.use(cors());

// Auth Route
app.post('/login', authController.loginUser);

// Assests Routes
app.get('/user_assets', isAuthenticated, controller.getUserAssets);
//app.get('/user_assets', isAuthenticated, controller.getUserAssets);

app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production')
    console.log(`running on port ${PORT}`);
});
