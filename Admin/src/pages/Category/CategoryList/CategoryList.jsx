import React, { useContext, useEffect, useState } from 'react';
import style from './CategoryList.module.css';
import { managementContext } from '../../../context/Context';
import axios from 'axios';
import { MdEdit } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const CategoryList = ({ Editcategory }) => {
    const [category, setCategory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoryPerPage] = useState(10);

    const { url } = useContext(managementContext);

    const fetchCategory = async () => {
        try {
            const response = await axios.get(`${url}/api/inven&sales/listCategory`);
            setCategory(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, [url]);

    const indexOfLast = currentPage * categoryPerPage;
    const indexOfFirst = indexOfLast - categoryPerPage;
    const current = category.slice(indexOfFirst, indexOfLast);
    const total = category.length;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const removeCategory = async (id) => {
        try {
            const response = await axios.post(`${url}/api/inven&sales/removeCategory`, { id });
            await fetchCategory();
            if (!response.data.error) {
                toast.success(response.data.message);
            }
        } catch (error) {
            console.error("Error removing category:", error);
        }
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <p>Category List</p>
            </div>
            <div className={style.listTable}>
                <b>Image</b>
                <b>Name</b>
                <b>Action</b>
            </div>
            {current.map(cat => (
                <div className={style.listTable} key={cat._id}>
                    <p><img src={`${url}/uploads/${cat.image}`} alt="" /></p>
                    <p>{cat.categoryName}</p>
                    <p className={style.icons}>
                        <MdEdit onClick={() => Editcategory(cat)} className={style.icon} />
                        <FaTrash className={`${style.icon} ${style.trash}`} onClick={() => removeCategory(cat._id)} />
                    </p>
                </div>
            ))}

            <Pagination 
                categoryPerPage={categoryPerPage} 
                total={total} 
                paginate={paginate} 
                currentPage={currentPage}
            />
        </div>
    );
};

const Pagination = ({ categoryPerPage, total, paginate, currentPage }) => {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(total / categoryPerPage); i++) {
        pageNumber.push(i);
    }

    return (
        <nav className={style.pagination}>
            <ul className={style.paginationList}>
                <li className={style.paginationItem}>
                    <button 
                        onClick={() => paginate(currentPage - 1)} 
                        className={`${style.pageLink} ${currentPage === 1 ? style.disabled : ''}`}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                </li>
                {pageNumber.map(number => (
                    <li key={number} className={style.paginationItem}>
                        <button 
                            onClick={() => paginate(number)} 
                            className={`${style.pageLink} ${currentPage === number ? style.active : ''}`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li className={style.paginationItem}>
                    <button 
                        onClick={() => paginate(currentPage + 1)} 
                        className={`${style.pageLink} ${currentPage === pageNumber.length ? style.disabled : ''}`}
                        disabled={currentPage === pageNumber.length}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default CategoryList;
