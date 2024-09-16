import React, { useState } from 'react';
import style from './Sidebar.module.css';
import { Link, useLocation } from 'react-router-dom';
import { RiHome2Fill } from 'react-icons/ri';
import { MdDashboard, MdCategory } from 'react-icons/md';
import { FaUser, FaDollarSign } from 'react-icons/fa';
import { FaTachometerAlt } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { FaTags } from "react-icons/fa";

function Sidebar() {
  const [subMenu, setSubmenu] = useState('');
  const location = useLocation();

  const toggleMenu = (menu) => {
    setSubmenu(subMenu === menu ? '' : menu);
  };

  return (
    <div className={style.sidebar}>
      <ul>
        <li className={style.menuItem}>
          <Link to='/home' className={`${style.link} ${location.pathname === '/home' ? style.active : ''}`}>
            <FaTachometerAlt className={style.icon} />
            <span className={style.text}>Home</span>
          </Link>
        </li>
      </ul>
      <div className={style.nav}>
        <div className={style.menu}>
          <p className={style.title}>Main</p>
          <NavItems
            icon={<FaClipboardList />}
            title='Category'
            isExpanded={subMenu === 'category'}
            onClick={() => toggleMenu('category')}
            links={[
              { title: "Category", href: '/category' },
              { title: "Add Category", href: '/category/AddCategory' }
            ]}
          />
          <NavItems
            icon={<FaTags />}
            title="Brands"
            isExpanded={subMenu === 'brands'}
            onClick={() => toggleMenu('brands')}
            links={[
              { title: "Brand List", href: "/brandList" },
              { title: "Add Brand", href: "/brandList/AddBrand" }
            ]}
          />

          <p className={style.title}>Expenses</p>
        </div>
      </div>
    </div>
  );
}

const NavItems = ({ icon, title, isExpanded, onClick, links, linkTo, isActive }) => {
  const location = useLocation();
  return (
    <li className={style.menuItem}>
      {linkTo ? (
        <Link to={linkTo} className={`${style.link} ${isActive ? style.active : ''}`}>
          {icon}
          <span className={style.text}>{title}</span>
        </Link>
      ) : (
        <>
          <a href="#" onClick={onClick} className={style.link}>
            {icon}
            <span className={style.text}>{title}</span>
          </a>
          <ul className={`${style.submenu} ${isExpanded ? style.active : ''}`}>
            {links.map((link, i) => (
              <li key={i}>
                <Link to={link.href} className={`${style.link} ${location.pathname === link.href ? style.active : ''}`}>
                  <span>{link.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </li>
  );
}

export default Sidebar;
