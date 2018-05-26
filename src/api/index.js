import axios from "axios/index";


const prefix = "/"
export const profile=()=>axios.get(prefix+'user_info').then(res=>res.data)

export const history=()=>axios.get(prefix+'customer_history_all').then(res=>res.data)

export const source_api=()=>axios.get(prefix+'location_data').then(res=>res.data)
export const submit_booking= booking_data =>axios.post(prefix+'customer_booking',booking_data).then(res=>res.data)

export const submit_request= request_data =>axios.post(prefix+'customer_request_booking',request_data).then(res=>res.data)

export const cancel_booking = id =>axios.post(prefix+'cancel_booking_ticket',{id}).then(res=>res.data)

export const booking_request = id =>axios.post(prefix+'request_book_now',{id}).then(res=>res.data)
export const cancel_request = id =>axios.post(prefix+'cancel_request_booking',{id}).then(res=>res.data)
export const get_today =()=>axios.get(prefix+'today').then(res=>res.data)
export const departure_times =()=>axios.get(prefix+'departure_time_info').then(res=>res.data)
export const universal_time =()=>axios.get('http://worldclockapi.com/api/json/utc/now').then(res=>res.data)