import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchProfile} from "./store/Slices/authSlice";

function App() {
    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(fetchProfile());
    },[dispatch]);

  return (
    <>
        <Layout>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/posts/:id" element={<FullPost />}></Route>
                <Route path="/posts/create" element={<AddPost />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Registration />}></Route>
                <Route path="*" element={ <Home/> }></Route>
            </Routes>
        </Layout>
    </>
  );
}

export default App;
