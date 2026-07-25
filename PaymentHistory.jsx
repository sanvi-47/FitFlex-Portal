import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import api from '../utils/api';

const PaymentHistory = () => {

  let [payments, setPayments] = useState([])
  let [loading, setLoading] = useState(true)
  let [filterData, setFilterData] = useState("All");


  useEffect(() => {
    api.get('/payments')
      .then((res) => {
        setLoading(true)
        setPayments(res.data)
      }).catch(() => {
        toast.error("Server Busy")
      }).finally(() => {
        setLoading(false)
      })
  }, [])


  let filterDataRes = filterData === "All" ? payments : payments.filter((p) => p.type === filterData)


  let totalIncome = payments.filter((p) => p.type === "Payment").reduce((sum, ele) => sum + Number(ele.amount), 0)


  let TotalOutcome = payments.filter((p) => p.type === "Refund").reduce((sum, ele) => sum + Number(ele.amount), 0)
  console.log(totalIncome)
  console.log(TotalOutcome)


  console.log(filterDataRes)
  return (
    <section className="payment-container">
      <h2>Payment History</h2>

      <aside className="payment-summary">

        <div className="payment-card">
          <span className="card-label">Total Income</span>
          <span className="card-value">₹ {totalIncome + TotalOutcome} /-</span>
        </div>
        <div className="payment-card">
          <span className="card-label">Total Refund</span>
          <span className="card-value">₹ {TotalOutcome} /-</span>
        </div>
        <div className="payment-card">
          <span className="card-label">Net Revenue</span>
          <span className="card-value">₹ {totalIncome} /-</span>
        </div>
      </aside>

      <select name="filterData" id="filterData" onChange={(e) => setFilterData(e.target.value)}>
        <option value="All">All</option>
        <option value="Payment">Payments</option>
        <option value="Refund">Refund</option>
      </select>

      <table border={3} cellPadding={10} cellSpacing={10}>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Member Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date and Time</th>
          </tr>
        </thead>

        <tbody>
          {
            loading ? (
              <p className='loading-state'>Loading......</p>
            ) : (
              filterDataRes.map((p) => {
                return (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.memberName}</td>
                    <td>{p.type}</td>
                    <td>{p.description}</td>
                    <td>₹ {p.amount} /-</td>
                    <td>{p.transaction}</td>
                  </tr>
                )
              })
            )
          }
        </tbody>

      </table>
    </section>
  )
}

export default PaymentHistory