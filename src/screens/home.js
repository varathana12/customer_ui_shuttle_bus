import React from "react"
import {connect} from 'react-redux'
import Layout from './layout'
import SelectSource from '../component/select_source'
import SelectDestination from '../component/select_destination'
import Departure from '../component/departure_date'
import SelectTime from '../component/select_time'
import BookNowButton from '../component/book_now_button'
import SelectNumberTicket from '../component/select_number_ticket'
import RadioButtonsGroup from '../component/radio'
import ReturnDate from '../component/return_date'
import ReturnTime from '../component/return_time'
import ConfirmDialog from '../component/dialog/confirm_dialog'
import StatusDialog from '../component/dialog/status_dialog'
import moment from 'moment-timezone'
import {departure_times, submit_booking,universal_time,history,get_today} from "../api";
import {
    submitBooking, resetState,
    chageTitleHeader,
    toDay,
    selectDepartureDate,
    selectReturnDate,
    listDepartureTimes,
    departureTime,
    historyData
} from "../actions";
import CircularIndeterminate from '../component/circle_progress'
import {init_date, min_date_return,sortTime,fomartUniversal} from "../init/init_function";

class Home extends React.Component{
    state={
        confirm_dialog:false,
        status_dialog:false,
        loading_submit:false,
        style:{},
        status_booking:false
    }
    onSubmit(){
        const {booking_data,submitBooking,return_date_status} = this.props;
        const {source, destination,date,choice,adult,child } = booking_data;
        if(source && destination && date && (child+adult)>0){
            if(choice === 2){
                if(return_date_status){

                    this.setState({confirm_dialog:true})
                }
            }else{
                this.setState({confirm_dialog:true})
            }
        }
        else{
        }
        submitBooking(true)
    }
    submitData(booking_data){
        const {HistoryData} = this.props
        if(!this.state.loading_submit) {
            this.setState({loading_submit: true, style: {opacity: 0.4, pointerEvents: "none"}},()=>{

                const {reset} = this.props
                var {
                    date, return_date, source, destination,
                    time, return_time, child, adult, number_of_seat, choice
                } = booking_data
                var dep = date
                var re = return_date
                date = dep.getFullYear() + "-" + (dep.getMonth() + 1) + "-" + dep.getDate()
                return_date = re.getFullYear() + "-" + (re.getMonth() + 1) + "-" + re.getDate()

                var final_data = [{date, source, destination, time, number_of_seat, adult, child}];
                if (choice === 2) {
                    final_data.push({
                        date: return_date, destination: source,
                        source: destination, child, adult, number_of_seat, time: return_time
                    })
                }
                submit_booking(final_data).then(res => {
                    if (res === "success") {
                        history().then(res=>{
                            HistoryData(res)
                        })
                    }
                    this.setState({loading_submit: false, style: {}})
                    this.setState({status_dialog: true, status_booking: res === "success"})
                }).catch(() => {
                    this.setState({loading_submit: false, style: {}})
                    this.setState({status_dialog: true, status_booking: false})
                })

            })
        }
    }
    componentDidMount(){
        const {toDay,departureDate,returnDate,
            list_departure_times,listDepartureTimes,departureTime} = this.props
        get_today().then(res=>{
            toDay(res)
            if(list_departure_times.length === 0){
                departure_times().then(times=>{
                    listDepartureTimes(times)
                    departureDate(init_date(res,times))
                    returnDate(moment(min_date_return(init_date(res,times))).toDate())
                    departureTime(sortTime(times)[times.length-1])
                })
            }else{
                departureDate(init_date(fomartUniversal(res),list_departure_times))
                returnDate(moment(min_date_return(init_date(res,list_departure_times))).toDate())
            }
        })

    }
    render(){
        const {booking_data,returnDate} = this.props
        const {confirm_dialog,status_dialog,loading_submit,status_booking} = this.state
        return(
            <Layout>
                <CircularIndeterminate hidden={loading_submit}/>
                <div style={this.state.style}>
                    <SelectSource/>
                    <SelectDestination/>
                    <RadioButtonsGroup/>
                    {booking_data.choice === 2?
                    <div>
                        <div style={{display:"flex",flexDirection:"row"}}>
                            <span style={{flex:1,paddingRight:10,width:0}}><Departure/></span>
                            <span style={{flex:1,marginTop:-10}}><SelectTime/></span>
                        </div>

                        <div style={{display:"flex",flexDirection:"row"}}>
                            <span style={{flex:1,paddingRight:10,width:0}}><ReturnDate/></span>
                            <span style={{flex:1,marginTop:-10}}><ReturnTime/></span>
                        </div>
                    </div>
                        :
                        <div>
                            <Departure/>
                            <SelectTime marginTop={10}/>
                        </div>

                        }
                    <SelectNumberTicket/>
                    <BookNowButton name={'Book Now'} onSubmit={()=>this.onSubmit()}/>
                    <ConfirmDialog open={confirm_dialog} onClose={()=>this.setState({confirm_dialog:false})}
                                   confirm={()=>this.submitData(booking_data)}
                    />
                    <StatusDialog open={status_dialog}
                                  status={status_booking}
                                  onClose={()=>this.setState({status_dialog:false})}/>
                </div>
            </Layout>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitBooking: status => (dispatch(submitBooking(status))),
        reset:()=>(dispatch(resetState())),
        title:title=>(dispatch(chageTitleHeader(title))),
        toDay:date=>dispatch(toDay(date)),
        departureDate:date=>dispatch(selectDepartureDate(date)),
        returnDate: date =>(dispatch(selectReturnDate(date))),
        listDepartureTimes :times =>(dispatch(listDepartureTimes(times))),
        departureTime:time=>(dispatch(departureTime(time))),
        HistoryData: data =>dispatch(historyData(data))
    }
}
const mapStateToProps =state =>{
    return {
        booking_data: {source:state.source,
            destination:state.destination,
            date:state.date,
            return_date:state.return_date,
            choice: Number(state.choice),
            time:state.departure_time,
            return_time:state.return_time,
            child:state.amount_child,
            adult:state.amount_adult,
            number_of_seat:state.amount_adult+state.amount_child
        },
        return_date_status:state.return_date_status,
        source_data:state.source_data,
        list_departure_times:state.list_departure_times
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);