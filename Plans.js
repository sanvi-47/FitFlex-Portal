export const PLANS = [
    {
        name: 'Basic',
        fee: 1000,
        details: ['Gym floor access', 'Locker room', '1 group class / week']
    },
    {
        name: 'Premium',
        fee: 2000,
        details: ['Everything in Basic', 'Unlimited group classes', '1 free PT session / month']
    },
    {
        name: 'Elite',
        fee: 3500,
        details: ['Everything in Premium', 'Personal trainer assigned', 'Diet & nutrition plan']
    }
]




export function feeForPlan(planName) {
    let plan = PLANS.find((p) => p.name === planName)
    return plan ? plan.fee : 0;
}