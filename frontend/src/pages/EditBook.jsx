import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { BackButton } from '../Components/BackButton'
import { Spinner } from '../Components/Spinner'

export const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/books/${id}`)
      .then((response) => {
        const book = response.data;
        setTitle(book.title);
        setAuthor(book.author);
        setPublishYear(book.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('Error fetching book details: ' + error.response.data.message);
        console.log('Error fetching book details:', error);
      });
  }, []);

  const handleEditBook = () =>{
    const data = {
      title,
      author,
      publishYear
    }
    setLoading(true);
    axios.put(`http://localhost:3000/books/${id}`, data)
    .then(() =>{
      setLoading(false);
      navigate('/');
    })
    .catch((error) => {
      setLoading(false);
      alert('Error creating book: ' + error.response.data.message);
      console.log('Error creating book:', error);
    });
  }

  return (
    <div>
      <BackButton/>
      <h1 className='text-3xl my-4'>Edit Book</h1>
      { loading ? 
        <Spinner />: ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input 
            type="text" 
            className='border-2 border-gray-500 px-4 py-2 w-full ' 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}/>
      </div>
      <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input 
            type="text" 
            className='border-2 border-gray-500 px-4 py-2 w-full ' 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)}/>
      </div>
      <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>publish year</label>
          <input 
            type="text" 
            className='border-2 border-gray-500 px-4 py-2 w-full ' 
            value={publishYear} 
            onChange={(e) => setPublishYear(e.target.value)}/>
      </div>
      <button 
        className='bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600'
        onClick={handleEditBook}>
          Save </button>
    </div>
    </div>
  )
}
