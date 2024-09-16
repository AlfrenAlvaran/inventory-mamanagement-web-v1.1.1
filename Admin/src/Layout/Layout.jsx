import React from 'react'
import style from './Layout.module.css'
import Sidebar from '../Components/Sidebar/Sidebar'
import Header from '../Components/Header/Header'
import { Outlet, useLocation } from 'react-router-dom'
import BreadCrum from '../Components/BreadCrum/BreadCrum'
function Layout() {
    const location = useLocation()
    const pathname = location.pathname.toLowerCase();
    
  return (
    <div className={style.flex}>
        <Sidebar />
        <div className={style.element}>
            {location.pathname !== '/home' && <Header />}
            {location.pathname !== '/home' && <BreadCrum />}
            <Outlet />
        </div>
    </div>
  )
}

export default Layout