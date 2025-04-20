const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.get('/', (req, res) => {
    res.send('Hello World');
});

    // Create a new user with register
    app.post('/register', async (req, res) => {
        try {
            const { name, password } = req.body;
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                },
            });
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create user' });
        }
    });

    // Create a new user with login
    app.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if (!user || user.password !== password) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to login' });
        }
    });

    // Read all users
    app.get('/users', async (req, res) => {
        try {
            const users = await prisma.user.findMany();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    });

app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}`);
});
