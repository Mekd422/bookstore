import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { BackButton } from '../Components/BackButton'
import { Spinner } from '../Components/Spinner'

export const ShowBook = () => {
    const {id} = useParams()
    const [book, setBook] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:3000/books/${id}`)
            .then((response) => {
                setBook(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("There was an error fetching the book!", error);
                setLoading(false);
            });
    }, [id]);
  return (
    <div className='p-4'>
        <BackButton />
        <h1 className='text-3xl my-4'>Show Book</h1>
        {
            loading ? (
                <Spinner />
            ) : (
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Id</span>
                        <span>{book._id}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Title</span>
                        <span>{book.title}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Author</span>
                        <span>{book.author}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>publish Year</span>
                        <span>{book.publishYear}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Create Time</span>
                        <span>{new Date(book.createdAt).toString()}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Last Updated Time</span>
                        <span>{new Date(book.updatedAt).toString()}</span>
                    </div>
                </div>
            )
        }
    </div>
  )
}
