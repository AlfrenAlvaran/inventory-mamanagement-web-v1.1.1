import React, { useContext, useState } from 'react'
import style from './AddCategory.module.css'
import axios from 'axios'
import { managementContext } from '../../../context/Context'
import { toast } from 'react-toastify'

const AddCategory = () => {
    const [data, setData] = useState({
        categoryName: ""
    })

    const [image, setImage] = useState(null)

    const onChangeHandler = (e) => {
        const { name, value, files } = e.target
        if (name === 'image') {
            setImage(files[0])
        } else {
            setData(prev => ({ ...prev, [name]: value }))
        }
    }

    const { url } = useContext(managementContext)

    const onsubmit = async (e) => {
        e.preventDefault()
        const form = new FormData()

        form.append('categoryName', data.categoryName)
        form.append('image', image)

        try {
            const response = await axios.post(`${url}/api/inven&sales/addCategory`, form)
            if (!response.data.error) {
                toast.success(response.data.message)
                setData({
                    categoryName: ''
                })
                setImage(null)
            } else {
                toast.error(response.data.error)
            }
        } catch (error) {
            toast.error(error.response ? error.response.data : error.message)
        }
    }

    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={onsubmit}>

                <div className={style.group}>
                    <input
                        type="text"
                        name="categoryName"
                        placeholder='Add Category'
                        value={data.categoryName}
                        onChange={onChangeHandler}
                    />
                </div>

                <div className={style.group}>
                    <input type="file" name="image" onChange={onChangeHandler} />

                </div>
                <button className={style.btn} type="submit">Add Category</button>
            </form>
        </div>
    )
}

export default AddCategory
