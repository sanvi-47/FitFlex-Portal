import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
    let navigate=useNavigate()

    let user = JSON.parse(localStorage.getItem('user'))
    console.log(user)


    let handleLogout=()=>{
        localStorage.removeItem('user')
        navigate('/login')
        setTimeout(()=>{
            window.location.reload()
        },100)
    }
    return (
        <nav className="navbarContainer">
            <aside className="logo">
                <span className="logo-icon">⭐</span>
                <span className="logo-text">FitFlex</span>
            </aside>
            <aside className="menu">
                <NavLink to='/'>Home Page</NavLink>
                <NavLink to='/members'>Members</NavLink>
                <NavLink to='/payment'>Payment History</NavLink>
                <NavLink to='/personTraining'>PT Requests</NavLink>

                {
                    user ? (
                        <div className='userData'>
                            <span>Hai, Admin</span>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <>
                            <NavLink to='/login'>Login</NavLink>
                            <NavLink to='/register'>Register</NavLink>
                        </>
                    )
                }

            </aside>
        </nav>
    )
}

export default Navbar