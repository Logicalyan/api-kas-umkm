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
