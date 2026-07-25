import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  let navigate = useNavigate();

  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")


  let handleSubmit = async (e) => {
    e.preventDefault();

    // let res = await axios.get('http://localhost:3000/register')
    // console.log(res)
    // let user = await res.data.find((u) => u.email === email && u.password === password)
    // console.log(user)

    if (email === "admin@fitflex.com" && password === "admin123") {
      localStorage.setItem('user', JSON.stringify("Admin"))
      toast.success(`Welcome Back "Admin`)
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } else {
      toast.error("Something went wrong")
    }


    // if (user) {
    //   localStorage.setItem('user',JSON.stringify(user))
    //   toast.success(`Welcome Back ${user.username}`)
    //   setTimeout(() => {
    //     navigate('/')
    //   }, 2000)
    // } else {
    //   toast.error("Something went wrong")
    // }

  }

  return (
    <section className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <p className="auth-sub">Sign in to manage members and payments</p>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="**********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" > Login</button>

        <p className="auth-switch">
          New here? <Link to="/register">Create an account</Link>
        </p>

        <p className="auth-hint">
          Demo login — admin@fitflex.com / admin123
        </p>
      </form>
    </section>
  )
}

export default Login