import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import MembersCard from '../Members/MembersCard'
import { toast } from 'react-toastify'
import api from '../utils/api'

const Members = () => {

  let location = useLocation();
  let [members, setMembers] = useState([])
  let [loading, setLoading] = useState(true)

  let loadMembers = async () => {

    setLoading(false)
    api.get('/members')
      .then((res) => {
        console.log(res.data)
        setMembers(res.data)
      })
  }
  useEffect(() => {
    loadMembers()
  }, [location.pathname])

  let onPageLocation = location.pathname === '/members/addMembers'
  return (
    <section className="members-container">

      {
        !onPageLocation && (
          <>
            <aside className="members-header">
              <h2>Members</h2>
              <button><NavLink to='/members/addMembers'>Add Member</NavLink></button>
            </aside>
            <aside className="member-card-container">
              {
                loading ? (
                  <p className='loadingState'> Loading.....</p>
                ) : members.length == 0 ? (
                  <p>No Members are added</p>
                ) : (
                  members.map((m) => {
                    console.log(m, "Data is comming from backend")
                    return (
                      <MembersCard key={m.id} member={m}  />
                    )
                  })
                )
              }
            </aside>
          </>
        )
      }

      <Outlet />
    </section>
  )
}

export default Members