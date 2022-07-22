import React from 'react'
import './ManagementArea.css'
import NewCategory from './NewCategory/NewCategory'
import NewItem from './NewItem/NewItem'

const ManagementArea = () => {
  return (
    <div className="ManagementAreaWrapper">
        <h1> Management Area</h1>
        <NewCategory />
        <NewItem />
    </div>
  )
}

export default ManagementArea