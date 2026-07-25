import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../utils/api'

const PTRequest = () => {

  let [showForm, setShowForm] = useState(false)
  let [members, setMembers] = useState([])
  let [ptRequets, setPtRequest] = useState([])
  let [loading, setLoading] = useState(true)
  let [formData, setFormData] = useState({
    memberId: "",
    trainerPreference: "",
    slot: "Any Available Slot",
    goal: ""
  })

  let hanldeChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  let handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.memberId === "") {
      toast.error("Select a Member");
      return;
    }

    try {
      let newRequest = await api.post('/ptRequest', {
        memberId: formData.memberId,
        trainerPreference: formData.trainerPreference,
        slot: formData.slot,
        goal: formData.goal,
        status: "PENDING",
        date: new Date().toLocaleDateString()
      })

      toast.success("Request Sent")
      setFormData({
        memberId: "",
        trainerPreference: "",
        slot: "Any Available Slot",
        goal: ""
      })
      setShowForm(false)
    } catch {
      toast.error("Unable to Proceed")
    }

  }

  let loadData = async () => {
    setLoading(true)
    await api.get('/members')
      .then((res) => {
        setMembers(res.data)
      }).catch(() => {
        toast.error("Unable to fetch Data")
      }).finally(() => {
        setLoading(false)
      })

    await api.get('/ptRequest')
      .then((res) => {
        setPtRequest(res.data)
      }).catch(() => {
        toast.error("Unable to fetch Data")
      }).finally(() => {
        setLoading(false)
      })
  }
  let handleStatus = async (id, newStatus) => {

    try {
      await api.patch(`/ptRequest/${id}`, {
        status: newStatus
      })
      toast.success("Status Updated")
    } catch {
      toast.error("Unable to proceed")
    }
  }
  useEffect(() => {
    loadData()
  }, [])
  return (
    <section className="pt-container">
      <aside className="pt-header">
        <h2>Personal Training Requests</h2>
        <button onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "New Request"}</button>
      </aside>
      {
        showForm && (
          <form onSubmit={handleSubmit}>
            <div className="pt-field">
              <label htmlFor="memberId">Member ID</label>
              <select name="memberId" id="memberId" onChange={hanldeChange}>
                {
                  members.map((m) => {
                    return (
                      <option key={m.memberId} value={m.memberId}>{m.memberName} - {m.id}</option>
                    )
                  })
                }
              </select>
            </div>

            <div className="pt-field">
              <label htmlFor="trainerPreference">Trainer Preference</label>
              <select name="trainerPreference" id="trainerPreference" onChange={hanldeChange}>
                <option value="Weight Gain">Weight Gain</option>
                <option value="Weight Loss">Weight Loss</option>
                <option value="Cardio">Cardio</option>
                <option value="Yoga">Yoga</option>
                <option value="Strength Training">Strength Training</option>
              </select>
            </div>

            <div className="pt-field">
              <label htmlFor="slot">Slot</label>
              <select name="slot" id="slot" onChange={hanldeChange}>
                <option value="">Any Available Slot </option>
                <option value="Morning [6-8 AM]">Morning [6-8 AM]</option>
                <option value="Afternoon [12-2 PM]">Afternoon [12-2 PM]</option>
                <option value="Evening [6-8 PM]">Evening [6-8 PM]</option>
                <option value="Night [7-9 PM]">Night [7-9 PM]</option>
              </select>
            </div>

            <div className="pt-field">
              <label htmlFor="goal">Goal</label>
              <input type="text" id='goal' onChange={hanldeChange} placeholder='eg: Weight Loss , Weight Gain' name='goal' />
            </div>

            <button>Submit Request</button>
          </form>
        )
      }

      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Member ID</th>
            <th>Trainer Preference</th>
            <th>Slot</th>
            <th>Goal</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {
            ptRequets.map((p) => {
              return (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.memberId}</td>
                  <td>{p.trainerPreference}</td>
                  <td>{p.slot}</td>
                  <td>{p.goal}</td>
                  <td>{
                    p.status === "PENDING" ? (
                      <>
                        <button onClick={() => handleStatus(p.id, "APPROVED")}>APPROVE</button>
                        <button onClick={() => handleStatus(p.id, "REJECT")}>REJECT</button>
                      </>

                    ) : p.status === "APPROVED" ? (
                      "APPROVED"
                    ) : (
                      "REJECTED"
                    )
                  }</td>
                  <td>{p.date}</td>


                </tr>
              )
            })
          }
        </tbody>
      </table >
    </section >
  )
}

export default PTRequest