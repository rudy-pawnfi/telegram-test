import React from 'react'
import HomePage from '../view/home'

export const routerConfig = [
    {
        path: '/',
        // element: <HomePage />
        element: React.lazy(() => import('../view/home'))
    }
]