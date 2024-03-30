import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import { Link } from 'react-router-dom'

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(()=>{
    getAllBlogs();
  },[])

  const getAllBlogs = async()=>{
    const data = await fetch("http://127.0.0.1:8000/api/get-all-blogs");
    const jsonData = await data.json();
    setBlogs(jsonData.data);
  }
  if(blogs.length==0) return <h1>Loading...</h1>;
  return (
    <div className="container">
        <div className="d-flex justify-content-between py-3">
          <h4>Blog</h4>
          <Link to="/create"><button className="btn btn-primary rounded-0">Create</button></Link>
        </div>
        <div className="row">
          {
            blogs.map((blog) => <BlogCard key={blog.id} data={blog} blogs={blogs} setBlogs={setBlogs}/>)
          }
        </div>
    </div>
  )
}

export default Blog
