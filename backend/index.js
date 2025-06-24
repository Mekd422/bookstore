import express from 'express';
import {PORT, MONGO_URI} from './config.js';
import mongoose from 'mongoose';
import {Book }from './models/bookModel.js';
import bookRoutes from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);

  res.send('welcome to mern stack tutorial');
});
app.use(cors());

app.use("/books", bookRoutes);



// app.use(cors({
//     origin: 'http://localhost:5173', // Adjust this to your frontend URL
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'] // Allow credentials if needed
// }));


mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });