import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login/Login';
import Layout from './Layout/Layout';
import Home from './pages/Home/Home';
import AddCategory from './pages/Category/AddCategory/AddCategory';
import CategoryList from './pages/Category/CategoryList/CategoryList';
import { Auth } from './hooks/Auth.js';
import EditCategory from './Components/EditCategory/EditCategory.jsx';
import AddBrands from './pages/Brands/AddBrands/AddBrands.jsx';
import ListBrands from './pages/Brands/ListBrands/ListBrands.jsx';

const App = () => {
    const { isAuthenticated } = Auth();
    const [category, setCategory] = useState(null);

    return (
        <>
            <ToastContainer />
            {category && <EditCategory Editcategory={setCategory} categoryToEdit={category} />}
            <Routes>
                <Route path='/' element={<Login />} />
                <Route element={isAuthenticated ? <Layout /> : <Navigate to={'/'} />}>
                    <Route path='/home' element={<Home />} />
                    <Route path='/category' element={<CategoryList Editcategory={setCategory} />} />
                    <Route path='/category/AddCategory' element={<AddCategory />} />
                    <Route path='/brandList' element={<ListBrands />} />
                    <Route path='/brandList/AddBrand' element={<AddBrands />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
