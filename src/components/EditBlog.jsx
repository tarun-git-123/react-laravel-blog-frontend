import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { Link,useParams } from "react-router-dom";
import Editor from "react-simple-wysiwyg";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {API_ENDPOINT, IMAGE_PATH} from '../utils/constant';

const EditBlog = () => {
    const [blog, setBlog] = useState(null);
    const [desc, setDesc] = useState(null);
    const [message, setMessage] = useState('');
    const [imageId, setImageId] = useState('');
    const [fileDataURL, setFileDataURL] = useState(null);
    const { id } = useParams();
    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    useEffect(()=>{
        getBlog();
    },[]);

    async function getBlog(){
        try {
            const data =await fetch(API_ENDPOINT+"get-blog/"+id);
            const jsonData = await data.json();
            setBlog(jsonData.data);
            setDesc(jsonData.data.desc)
            reset(jsonData.data)
        } catch (error) {
            console.log("Something went wrong",error)
        }
    }
    
    if(blog===null) return <h1>Loading...</h1>
    
    const handleFileChange = async(e)=>{
        const file = e.target.files[0];
        let url = URL.createObjectURL(file);
      setFileDataURL(url)
        const formData = new FormData();
        formData.append('image',file);
        const res = await fetch('http://127.0.0.1:8000/api/save-temp-image',{
            method:'post',
            body:formData
        })
        const result = await res.json();

        if(result.status==false){
            // console.log(result.errors.image[0]);
            setMessage(result.errors.image[0]);
            e.target.value = null
            // console.log(result.errors.image[0]);
        }else{
            setMessage('');
            setImageId(result.image.id);
        }
    }

    const formSubmit = async(data)=>{
        const newData = {...data, 'desc':desc, 'imageId':imageId}
        const option = {
            method:'put',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(newData)
        }

        const res = await fetch(`${API_ENDPOINT}update-blog/${id}`, option);

        if(res){
            toast.success("Blog Updated successfully !", {
              position: "top-right"
            }); 
            getBlog() 
            reset();  
        }
    }
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between py-3">
          <h4>Edit Blog</h4>
          <Link to="/">
            <button className="btn btn-dark rounded-0">Back</button>
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="card border-0 shadow-lg">
            <form onSubmit={handleSubmit(formSubmit)}>
              <div className="card-body">
                <div className="mb-3">
                  <label>Title</label>
                  <input
                    {...register("title", { required:"Title filed is required", minLength:5 })}
                    type="text"
                    placeholder="Title"
                    className={`form-control ${errors.title && 'is-invalid'}`}
                  />
                  {errors?.title?.type === 'required' && <p className="invalid-feedback">{errors.title?.message}</p>}
                  {errors?.title?.type === "minLength" && <p className="invalid-feedback">Title length should be grater than 5</p>}
                </div>
                <div className="mb-3">
                  <label>Short Description</label>
                  <textarea {...register("shortDesc")} rows="5" className="form-control"></textarea>
                </div>
                <div className="mb-3">
                  <label>Description</label>
                  <Editor
                    containerProps={{ style: { height: "400px" } }}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Image</label>
                  <input type="file" className="form-control" onChange={handleFileChange}/>
                  <p className="text-danger">{message}</p>
                  {fileDataURL || IMAGE_PATH+blog.image ?
                  <p className="img-preview-wrapper">
                    {
                      <img src={fileDataURL || IMAGE_PATH+blog.image} alt="preview" width={300}/>
                    }
                  </p> : null}
                </div>
                <div className="mb-3">
                  <label>Author</label>
                  <input
                    {...register("author",{required:true})}
                    type="text"
                    placeholder="Auther"
                    className={`form-control ${errors.author && 'is-invalid'}`}
                  />
                  {errors.author && <p role="alert" className="invalid-feedback">Author filed is required</p>}
                </div>
                <div className="mb-3">
                  <button className="btn btn-dark rounded-0">Update</button>
                </div>
              </div>
            </form>
            <ToastContainer/>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditBlog
