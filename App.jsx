import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import HomePage from './pages/HomePage'
import Members from './pages/Members'
import PTRequest from './pages/PTRequest'
import Login from './Auth/Login'
import Register from './Auth/Register'
import PaymentHistory from './pages/PaymentHistory'
import { ToastContainer } from 'react-toastify'
import CreateMember from './Members/CreateMember'
import PrivateRoute from './utils/PrivateRoute'
import PageNotFound from './pages/PageNotFound'

const App = () => {
    let router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <HomePage />
                },
                {
                    path: "/members",
                    element: (
                        <PrivateRoute>
                            <Members />
                        </PrivateRoute>
                    ),
                    children: [
                        {
                            path: "/members/addMembers",
                            element: <CreateMember />,
                        }
                    ]
                },
                {
                    path: "/payment",
                    element: (
                        <PrivateRoute>
                            <PaymentHistory />
                        </PrivateRoute>
                    )
                },
                {
                    path: "/personTraining",
                    element: (
                        <PrivateRoute>
                            <PTRequest />
                        </PrivateRoute>
                    )
                },
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/register",
                    element: <Register />
                },
                ,
                {
                    path: "/*",
                    element: <PageNotFound />
                },

            ]
        }
    ])
    return (
        <>
            <RouterProvider router={router}>

            </RouterProvider>
            <ToastContainer />
        </>
    )
}
export default App