import React from 'react'
import { Link } from 'react-router-dom'

const OtherPage = () => {
  return (
    <div>
      <div>
        Im some other page!
      </div>
      <Link to="/">Go back to Home</Link>
    </div>
  ) 
}

export default OtherPage