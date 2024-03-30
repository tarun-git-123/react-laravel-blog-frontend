import React from "react";
import { Link, Navigate } from "react-router-dom";
import { API_ENDPOINT, IMAGE_PATH } from "../utils/constant";
import { toast,ToastContainer } from 'react-toastify';
const BlogCard = ({data,blogs,setBlogs}) => {
  const {id,title,shortDesc,image} = data;

  const handleDelete = async(id) => {
    event.preventDefault();
    if(window.confirm("Do you realy want to delete?")){
      try{
        const res = await fetch(`${API_ENDPOINT}delete-blog/${id}`, {
          method:'delete'
        })
  
        if(res.ok){
          const newBlogs = blogs.filter( blog=> blog.id!=id );
          setBlogs(newBlogs);
  
          toast.success("Blog Deleted successfully !", {
            position: "top-right"
          }); 
        }else{
           throw new Error('Failed to delete blog');
        }
      }catch(error){
        toast.error("Failed to delete blog. Please try again later", {
          position: "top-right"
        }); 
      }
    }
  }

  return (
      <div className="col-12 col-md-2 col-lg-3 mb-2">
        <div className="card shadow-lg">
          <img
            src={IMAGE_PATH+image}
            alt="thumb-img"
            className="card-img-top"
          />
          <div className="card-body">
            <h4>{title}</h4>
            <p>
            {shortDesc}
            </p>
            <div className="d-flex justify-content-between">
              <Link to={`/blog/${id}`}><button className="btn btn-secondary">Details</button></Link>

              <div>
                <a className="px-3" onClick={()=> handleDelete(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
  </svg>
                </a>
                <Link to={`/edit/${id}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </div>
  );
};

export default BlogCard;
