import express from 'express';
import helmet from 'helmet';

const app = express();

// for handling security vulnerabilities
// by setting HTTP headers appropriately
app.use(helmet());

// for serving static files
app.use(express.static('public'));

// For views
app.set('view engine', 'ejs');
app.set('views', './views');

// for parsing input into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
