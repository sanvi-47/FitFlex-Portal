import React from 'react'
import {PLANS} from '../utils/Plans.js'
console.log(PLANS)

const Card2 = () => {
  return (
    <article className="card2-container">
        <h2>Membership Details</h2>
        <aside className="card2-cards">
            {
                PLANS.map((plan)=>{
                    return(
                        <div className="card">
                            <h2>{plan.name}</h2>
                            <h4> Fee: ₹ {plan.fee}</h4>
                            <ul>
                                {
                                    plan.details.map((item)=>{
                                        return(
                                            <li>{item}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )
                })
            }
        </aside>
    </article>
  )
}

export default Card2