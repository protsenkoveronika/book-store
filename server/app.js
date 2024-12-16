require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db.js');
const authRoutes = require('./src/routes/authRoutes');
const bookRoutes = require('./src/routes/bookRoutes');


const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use('/', authRoutes, bookRoutes);

connectDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
