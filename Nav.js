import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './nav.css'
import Gc from './Gc'

const Nav = () => {
    let obj=useContext(Gc)
  return (
    <nav className='nav'>
        <Link to="/">Home</Link>
      {!obj.usercon.islogin&&<Link to="/login">Login</Link>}
      {!obj.usercon.islogin&&  <Link to="/reg">Register</Link>}
      {obj.usercon.islogin&&  <Link to="/cart">Cart</Link>}
      {obj.usercon.islogin&& obj.usercon.isadmin&& <Link to="/add">Addprod</Link>}
      {obj.usercon.islogin&&  <Link to="/logout">Logout</Link>}
        <div>{obj.usercon.name}</div>
    </nav>
  )
}

export default Nav