import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../utils/api'

const Register = () => {

  let naviagte = useNavigate();
  let [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: ""
  })

  let handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)

    try {
      let exisiting = await api.get('/register')
      if (exisiting.data.some((item) => item.email === formData.email)) {
        toast.error("This Email already Registered")
        return
      }


      api.post('/register', formData)
      toast.success("Account Created --Please Login")
      setFormData({
        username: "",
        email: "",
        password: "",
        phNum: "",
        age: "",
        gender: ""
      })
      setTimeout(() => {
        naviagte('/login')
      }, 1200)
    } catch {
      toast.error("SomeThing went Wrong")
    }


  }
  return (
    <section className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p className="auth-sub">Staff &amp; front-desk access for FitFlex</p>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Your name"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          minLength={10}
          maxLength={10}
          placeholder="10-digit number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <label htmlFor="age">Age</label>
        <input
          id="age"
          name="age"
          type="number"
          placeholder="Your Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <div className="gender-group">
          <label><input type="radio" name="gender" onChange={handleChange} value="Male" /> Male</label>
          <label><input type="radio" name="gender" onChange={handleChange} value="Female" /> Female</label>
          <label><input type="radio" name="gender" onChange={handleChange} value="Others" /> Others</label>
        </div>


        <button type="submit">Register</button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  )
}

export default Register