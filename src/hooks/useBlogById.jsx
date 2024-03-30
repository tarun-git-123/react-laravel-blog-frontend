import { useEffect, useState } from 'react'
import { API_ENDPOINT } from '../utils/constant';
import { useForm } from 'react-hook-form';

const useBlogById = (id) => {
    const [desc, setDesc] = useState('');
    const [blog, setBlog] = useState(null);
    useEffect(()=>{
        getBlog();
    },[]);

    async function getBlog(){
        try {
            const data =await fetch(API_ENDPOINT+"get-blog/"+id);
            const jsonData = await data.json();
            setBlog(jsonData.data);
            setDesc(jsonData.data.desc)
            
        } catch (error) {
            console.log("Something went wrong",error)
        }
    }
    return {blog,desc,setDesc, reset};
}

export default useBlogById
