import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();


router.post('/', async (req, res) =>{
    try{
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear});
        const book = await Book.create(newBook);

        return res.status(201).send({
            message: 'Book created successfully',
            book: book
        });

    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}) 

// route to get all books
router.get("/", async(req, res) =>{
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count : books.length,
            data : books}
        );
        
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
});

// route to get a book by id
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).json(book);
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

});

// route to update a book by id
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const {id} = req.params;

        const result = await Book.findByIdAndUpdate(
            id,req.body)
        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json({
            message: 'Book updated successfully'
        });
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
});

// route to delete a book by id
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).json({
            message: 'Book deleted successfully'
        });
        
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;