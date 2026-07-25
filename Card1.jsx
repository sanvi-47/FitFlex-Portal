import axios from 'axios'
import React, { useEffect, useState } from 'react'
import api from '../utils/api'

const Card1 = () => {
    let [stats, setStats] = useState({
        membersAvavilable: 0,
        revenue: 0,
        ptRequests: 0
    })

    let loadData = async () => {
        let members = await api.get('/members')
        console.log(members)
        let payments = await api.get('/payments')
        console.log(payments.data)

        let totalIncome = payments.data.filter((p) => p.type === "Payment").reduce((sum, ele) => sum + Number(ele.amount), 0)
        console.log(totalIncome)

        let pendingRequests = await api.get('/ptRequest')
        console.log(pendingRequests)

        let pendingReq = pendingRequests.data.filter((p)=>p.status==="PENDING").length
        console.log(pendingReq)
        // console.log(pendingReq)

        setStats({
            membersAvavilable: members.data.length,
            revenue: totalIncome,
            ptRequests: pendingReq
        })


    }


    useEffect(() => {
        loadData()
    }, [])
    return (
        <div className="card1-container">
            <aside className="cards">
                <h2 className='card-number'>{stats.membersAvavilable}</h2>
                <p className='card-text'>Members</p>
            </aside>
            <aside className="cards">
                <h2 className='card-number'>₹{stats.revenue}</h2>
                <p className='card-text'>Net Revenue</p>
            </aside>
            <aside className="cards">
                <h2 className='card-number'>{stats.ptRequests}</h2>
                <p className='card-text'>PT Requests</p>
            </aside>
        </div>
    )
}

export default Card1