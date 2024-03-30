import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Blog from "./components/Blog";
import CreateBlog from "./components/CreateBlog";
import BlogDetails from "./components/BlogDetails";
import EditBlog from "./components/EditBlog";
function App() {
  return (
    <>
    <Header/>
    <Routes>
    <Route path="/" element={<Blog/>}></Route>
      <Route path="/blog/:id" element={<BlogDetails/>}></Route>
      <Route path="/create" element={<CreateBlog/>}></Route>
      <Route path="/edit/:id" element={<EditBlog/>}></Route>
    </Routes>
    </>
  );
}

export default App;
