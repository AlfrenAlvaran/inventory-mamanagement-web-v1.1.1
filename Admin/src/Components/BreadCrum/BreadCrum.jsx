import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './BreadCrum.module.css'

const routes = {
    "/home": 'Dashboard',
    "/category": 'Category',
    "/category/AddCategory": 'Add Category'
}

const BreadCrum = () => {
    const location = useLocation()
    const pathName = location.pathname.split('/').filter(x => x)

    return (
        <div className={styles.Breadcrum}>
            {pathName.length === 0 ? (
                <Link to='/home' className={styles.link}>Dashboard</Link>
            ) : (
                <>
                    <Link className={styles.link} to='/home'>Dashboard</Link>
                    <span> / </span>
                    {pathName.map((v, i) => {
                        const to = `/${pathName.slice(0, i + 1).join('/')}`
                        return (
                            <React.Fragment key={to}>
                                <Link className={styles.link} to={to}>
                                    {routes[to] || v.charAt(0).toUpperCase() + v.slice(1)}
                                </Link>
                                {i < pathName.length - 1 && <span> / </span>}
                            </React.Fragment>
                        )
                    })}
                </>
            )}
        </div>
    )
}

export default BreadCrum