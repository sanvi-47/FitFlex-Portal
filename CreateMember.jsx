import React, { useState } from 'react'
import { PLANS, feeForPlan } from '../utils/Plans'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'

const CreateMember = () => {

    let navigate = useNavigate()
    let [formData, setFormData] = useState({
        memberName: "",
        memberPlan: "Basic",
        amountPaid: ""
    })
    let selectedPlan = feeForPlan(formData.memberPlan)
    console.log(selectedPlan, "Selected Plan")


    let handleChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    let handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let totalFee = feeForPlan(formData.memberPlan);
            let amountPaid = Number(formData.amountPaid);

            console.log(totalFee)
            console.log(amountPaid)

            let newMember = await api.post('/members', {
                memberName: formData.memberName,
                memberPlan: formData.memberPlan,
                totalFee,
                amountPaid,
                joinedOn: new Date().toLocaleDateString()
            })

            if (amountPaid > 0) {
                await api.post('/payments', {
                    memberId: newMember.data.id,
                    memberName: formData.memberName,
                    type: "Payment",
                    description: "Initial Payment",
                    amount: amountPaid,
                    transaction: new Date().toLocaleString()
                })
            }
            toast.success("Member Added")
            setFormData({
                memberName: "",
                memberPlan: "Basic",
                amountPaid: ""
            })

            setTimeout(() => {
                navigate('/members')
            }, 1000)
        } catch (err) {
            console.log(err)
            toast.error("Server Busy")
        }
    }
    return (
        <section className="member-page">
            <form className="member-form" onSubmit={handleSubmit}>
                <h2>Add Member</h2>
                <p className="member-sub">Create a new gym membership</p>

                <label htmlFor="memberName">Member Name</label>
                <input
                    type="text"
                    id="memberName"
                    placeholder="Enter member name"
                    name="memberName"
                    onChange={handleChange}
                    value={formData.memberName}
                />

                <label htmlFor="plan">Membership Plan</label>
                <select
                    name="memberPlan"
                    id="plan"
                    value={formData.memberPlan}
                    onChange={handleChange}
                >
                    {PLANS.map((plan) => (
                        <option key={plan.name} value={plan.name}>
                            {plan.name}
                        </option>
                    ))}
                </select>

                <label htmlFor="totalFee">Total Fee</label>
                <input
                    type="number"
                    id="totalFee"
                    value={selectedPlan}
                    readOnly
                />

                <label htmlFor="amountPaid">Amount Paid</label>
                <input
                    type="number"
                    id="amountPaid"
                    placeholder="Enter paid amount"
                    name="amountPaid"
                    onChange={handleChange}
                    value={formData.amountPaid}
                />

                <button type="submit">Add Member</button>
            </form>
        </section>
    )
}
export default CreateMember;