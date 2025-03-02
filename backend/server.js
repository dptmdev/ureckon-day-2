const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3001;

// Enable CORS for all origins
// Define a list of allowed origins
const allowedOrigins = ['http://localhost:5173'];

// Define CORS options with dynamic origin
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
//app.use(cors());
app.use(bodyParser.json());

// Route to trigger AR call
app.post('/tryon', (req, res) => {
    const { productName } = req.body;

    if (!productName) {
        return res.status(400).send('Product name is required');
    }

    console.log(`Running AR for product: ${productName}`);

    // Construct the command to execute the Python script
    const pythonScript = path.join(__dirname, 'scripts', 'tshirt.py');
    const command = `python "${pythonScript}" "images/${productName}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`${command} Error: ${error.message}`);
            return res.status(500).send('Error executing Python script');
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).send('Python script error');
        }
        res.json({ message: 'AR triggered successfully', output: stdout });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
