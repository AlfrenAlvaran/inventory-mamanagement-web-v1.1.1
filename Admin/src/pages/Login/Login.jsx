import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import { useNavigate } from 'react-router-dom';
import { MdOutlineMail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { toast } from 'react-toastify';
import { managementContext } from '../../context/Context';

import axios from 'axios';
import { Auth } from '../../hooks/Auth';
const Login = () => {
    const navigate = useNavigate();
    const { setAuth } = Auth()
    const { url } = useContext(managementContext)
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${url}/api/inven&sales/login`, data)
            if (response.data) {
                setAuth(response.data.token)
                localStorage.setItem('token', response.data.token)
                navigate('/home')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div className={style.container}>
            <form className={style.FormContainer} onSubmit={onSubmitHandler}>
                <div className={style.title}>
                    <h2>Sign In</h2>
                </div>
                <div className={style.inputContainer}>
                    <MdOutlineMail className={style.icon} />
                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={onChangeHandler}
                        placeholder="Enter your email address"
                    />
                </div>

                <div className={style.inputContainer}>
                    <FaLock className={style.icon} />
                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={onChangeHandler}
                        placeholder="Enter your password"
                    />
                </div>

                <button type="submit" className={style.submitButton}>
                    Sign In
                </button>
            </form>
        </div>
    )
}

export default Login