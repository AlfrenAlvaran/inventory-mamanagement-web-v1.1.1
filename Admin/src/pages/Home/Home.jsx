import React, { useContext, useEffect, useState } from 'react'
import style from './Home.module.css'
import { managementContext } from '../../context/Context'
import axios from 'axios'
const Home = () => {
  const [counts, setCounts] = useState({
    categories: 0
  })

  const { url } = useContext(managementContext)

  const fetchCounts = async()=>{
    try {
      const [categoryRes] = await Promise.all([
        axios.get(`${url}/api/inven&sales/countCategory`)
      ])

      setCounts({
        categories: categoryRes.data.count
      })
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    fetchCounts()
  },[url])

  
  return (
    <main className={style.main}>
      <div className={style.transformEffect}>
        <div className={style.flexContainer}>
          <h3 className={style.heading}>Dashboard</h3>
        </div>
        <div className={style.row}>
          <div className={`${style.col} ${style.colMd6} ${style.colXl3}`}>
            <div className={`${style.card} ${style.borderLeftPrimary} ${style.shadow} ${style.h100} ${style.py2}`}>
              <div className={style.cardBody}>
                <div className={`${style.row} ${style.noGutters} ${style.alignItemsCenter}`}>
                  <div className={`${style.col} ${style.mr2}`}>
                    <div className={`${style.textXs} ${style.fontWeightBold} ${style.textPrimary} ${style.textUppercase} ${style.mb1}`}>
                      categories
                    </div>
                    <h5 className={`${style.h5} ${style.fontWeightBold} ${style.textGray800} ${style.mb0}`}>
                      {counts.categories}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home