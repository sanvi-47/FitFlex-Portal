import React from 'react'
import Card1 from '../components/Card1'
import Card2 from '../components/Card2'

const HomePage = () => {
  return (
      <section className="homepage-container">
        <section className="homepage">
          <h1>FitFlex Gym Memmbership Management</h1>
          <p>Manage members,payments and PT requests at one place</p>
        </section>
        <Card1/>
        <Card2/>
      </section>
  )
}

export default HomePage