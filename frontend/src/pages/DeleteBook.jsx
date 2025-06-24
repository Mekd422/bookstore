import React,{useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { BackButton } from '../Components/BackButton'
import { Spinner } from '../Components/Spinner'

export const DeleteBook = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate();

  const handleDeleteBook = () => {
    setLoading(true);
    axios.delete(`http://localhost:3000/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('Error deleting book: ' + error.response.data.message);
        console.log('Error deleting book:', error);
      });
  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      { loading ? 
        <Spinner />: ''}
      <div className='flex flex-col border-2 border-red-400 rounded-xl w-[600px] p-4 mx-auto'>
        <p className='text-xl text-red-600 mb-4'>Are you sure you want to delete this book?</p>
        <button 
          onClick={handleDeleteBook} 
          className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'>
          Confirm Delete
        </button>
      </div>
    </div>
  )
}
