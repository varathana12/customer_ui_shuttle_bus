import React from 'react'
import Home from '../screens/home'
import { Route} from 'react-router-dom'
import History from '../screens/history'
import Profile from '../screens/profile'
import BookingRequest from '../screens/booking_request'

const prefix = "/sbs/"
export const Main = () => (

    <div>
        <Route exact path={prefix+"customer(|/booking)"} component={Home}/>
        <Route exact path={prefix+"customer/history"} component={History}/>
        <Route exact path={prefix+"customer/profile"} component={Profile}/>
        <Route exact path={prefix+"customer/request"} component={BookingRequest}/>
    </div>

)