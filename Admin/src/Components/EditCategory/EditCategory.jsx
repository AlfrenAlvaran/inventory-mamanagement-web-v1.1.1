import React, { useContext, useState, useEffect } from 'react';
import styles from './EditCategory.module.css';
import { managementContext } from '../../context/Context';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditCategory = ({ Editcategory, categoryToEdit }) => {
    const [loading, setLoading] = useState(false);
    const { url } = useContext(managementContext);
    
    const [data, setData] = useState({
        categoryName: ''
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (categoryToEdit) {
            setData({ categoryName: categoryToEdit.categoryName });
            setPreview(`${url}/uploads/${categoryToEdit.image}`);
        }
    }, [categoryToEdit, url]);

    const onchangeHandler = (event) => {
        const { name, value, files } = event.target;
        if (name === 'image') {
            setImage(files[0]);
            setPreview(URL.createObjectURL(files[0]));
        } else {
            setData(prev => ({ ...prev, [name]: value }));
        }
    };

    const onSubmithandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = new FormData();
        form.append('_id', categoryToEdit._id);
        form.append('categoryName', data.categoryName);
        if (image) {
            form.append('image', image); 
        } else {
            form.append('existingImage', categoryToEdit.image); 
        }
        
        try {
            const response = await axios.put(`${url}/api/inven&sales/EditCategory`, form, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            setLoading(false);
            if (!response.data.error) {
                toast.success(response.data.message);
                setData({ categoryName: '' });
                setImage(null);
                setPreview(null);
                Editcategory(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
            console.log("Edit", error)
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.modalDialog}>
                {loading ? (
                    <div className={styles.loading}>Loading...</div>
                ) : (
                    <form className={styles.content} onSubmit={onSubmithandler}>
                        <div className={styles.modalBody}>
                            <div className={styles.containerInput}>
                                <div className={styles.group}>
                                    <input
                                        type="text"
                                        name="categoryName"
                                        value={data.categoryName}
                                        onChange={onchangeHandler}
                                        placeholder="Category Name"
                                    />
                                </div>
                                <div className={styles.group}>
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={onchangeHandler}
                                    />
                                </div>
                                {preview && (
                                    <div className={styles.preview}>
                                        <img src={preview} alt="Preview" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={styles.footer}>
                            <button
                                type="submit"
                                className={`${styles.btnPrimary} ${styles.btn}`}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className={`${styles.SecondDary} ${styles.btn}`}
                                onClick={() => Editcategory(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default EditCategory;
