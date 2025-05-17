import express from 'express';
import helmet from 'helmet';

import connectDb from './config/db.config';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import { authenticateJWT } from './middleware/auth.middleware';
import { checkUserExists } from './middleware/user.middleware';

const app = express();

// connect to database
connectDb();

// for handling security vulnerabilities
// by setting HTTP headers appropriately
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for serving static files
app.use(express.static('public'));

// For views
app.set('view engine', 'ejs');
app.set('views', './views');

// Public routes
app.use('/auth', authRoutes);

// Protected routes
app.use('/users', authenticateJWT, checkUserExists, userRoutes);

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
