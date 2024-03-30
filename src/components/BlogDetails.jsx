import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IMAGE_PATH } from '../utils/constant';

const BlogDetails = () => {
    const [blog, setBlog] = useState(null);
    const [message, setMessage] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (!id) return; // Check if id is not null or undefined
        getBlog();
    }, [id]); // Include id in the dependency array to re-fetch when id changes

    const getBlog = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/get-blog/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch blog post');
            }
            const jsonData = await response.json();
            if(jsonData.status==true){
                setBlog(jsonData.data);
            }else{
                setMessage(jsonData.message);
            }
            
        } catch (error) {
            console.error('Error fetching blog post:', error);
            // Handle error (e.g., display error message)
        }
    };
    // console.log(message);
    // Render loading state if blog is null

    if (message !== null) {
        return <h1>{message}</h1>;
    }

    if (blog === null) {
        return <h1>Loading...</h1>;
    }

    // console.log(blog);
    
    const { title,author, desc, image, created_at} = blog;

    const formattedDate = formatDate(created_at);

    return (
        <div className='container'>
            <div className="d-flex justify-content-between pt-5 mb-4">
                <h2>{title}</h2>
                <div>
                    <a href='/' className='btn btn-dark'>back to blogs</a>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-12'>
                    <p>by <strong>{author}</strong> on {formattedDate}</p>
                    { 
                        image && <img className='w-100' src={IMAGE_PATH+image} alt={image}/>
                    }
                    <div className='mt-5' dangerouslySetInnerHTML={{ __html: desc }}>
                    </div>
                </div>
            </div>
        </div>
    ); // Replace with your blog post UI
};
const formatDate = (rawDate) => {
    // Parse the raw date string into a Date object
    const dateObject = new Date(rawDate);
    
    // Format the date as needed
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    return dateObject.toLocaleString('en-US', options);
};


export default BlogDetails;