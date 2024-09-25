const express = require("express");
const cors = require("cors");
const db = require("./db/server");

const app = express();
const port = 3006;

// Middleware

app.use(cors());
app.use(express.json());

// POST request to register a user
app.post("/api/v1/register", async (req, res) => {
    console.log(req.body);

    try {
        const queryText = "INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *";
        const values = [req.body.email, req.body.username, req.body.password]; // Store plain text password

        // Execute the query
        const { rows } = await db.query(queryText, values);

        console.log(rows[0]);
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST request to login a user
app.post("/api/v1/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        if (!email || !password) {
            return res.status(400).json({ msg: 'Please provide both email and password' });
        }

        // Fetch user by email
        const queryText = "SELECT * FROM users WHERE email = $1";
        const values = [email];

        const { rows } = await db.query(queryText, values);

        // Check if the user exists
        if (rows.length === 0) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const user = rows[0];

        // Compare the provided password with the stored password (plain text comparison)
        if (password !== user.password) {
            return res.status(401).json({ msg: 'Invalid Password' });
        }

        res.status(200).json({ msg: 'Login successful', user });
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
});

