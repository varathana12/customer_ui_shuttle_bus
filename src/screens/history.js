import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Layout from './layout'
import ExpansionPanel, {
    ExpansionPanelDetails,
    ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import {connect} from 'react-redux'
import Qr_code from '../component/qr_code'
import CancelDialog from '../component/dialog/cancel_dialog'
import StatusDialog from '../component/dialog/status_dialog'
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SimpleTable from '../component/table'
import RequestDetail from '../component/request_detail'
import ConfirmRequest from '../component/dialog/request_confirm_booking'
import {history} from "../api";
import {convert_date_fomart} from "../init/init_function";
import {cancel_booking,
    booking_request,cancel_request} from "../api";
import {historyData} from "../actions";
import {danger, success} from "../constants/color";
import BusDetial from '../component/dialog/bus_detail'
const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingTop:10,
        paddingBottom:10,
        marginTop:10,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        color:success
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: success
    },
    Typography_expand:{
        width:"100%"
    },
    cancel_style:{
        //border:"1px solid "+danger
    },
    book_style:{
        //border:"1px solid "+success
    },
    cancel_text:{
        color:danger
    }
});

class History extends React.Component {

    state = {
        expanded: '',
        history_data:{current:[],request:[],history:[]},
        open_qr:false,
        open_cancel:false,
        cancel_id:0,
        qr_data:"",
        open_status:false,
        status:false,
        open_request_confirm:false,
        confirm_data:{},
        open_cancel_request:false,
        bus_data:{},
        open_bus:false

    };
    componentWillMount(){
        const {history_data, HistoryData} =this.props

        if(history_data.length === 0){
            history().then(res=>{
                HistoryData(res)
            })
        }
    }
    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };
    handleCancel(){
        const {cancel_id} = this.state
        cancel_booking(cancel_id).then(res=>{
            this.setState({open_status:true,status:res ==='success'})
        })
    }
    handleCancelRequest(){
        const {cancel_id} = this.state
        const {HistoryData} =this.props
        cancel_request(cancel_id).then(res=>{
            history().then(res=>{
                HistoryData(res)
            })
            this.setState({open_status:true,status:res ==='success'})
        })
    }
    handleRequestBooking(){
        const {HistoryData} =this.props
        const {confirm_data} = this.state
        booking_request(confirm_data.id).then(res=>{
            history().then(res=>{
                HistoryData(res)
            })
            this.setState({open_status:true,status:res ==='success'})
        })

    }
    renderHistory(){
        const { classes,history_data} = this.props;
        const {expanded} = this.state
        let items = {current:[],request:[],history:[]}
        for (var name in history_data){
               items[name]=
                   history_data[name].map(item=> {
                           return (
                               <ExpansionPanel className={item.status === "Cancelled" ? [classes.root, classes.cancel_style]
                                   : [classes.root, classes.book_style]} key={item.id} expanded={expanded === item.id.toString()}
                                               onChange={this.handleChange(item.id.toString())}>
                                   <ExpansionPanelSummary expandIcon={<ExpandMoreIcon
                                       style={{color: item.status === "Cancelled" ? danger : success}}/>}>
                                       <table className="table_expand">
                                           <tbody>
                                           <tr>
                                               <td>
                                                   <Typography className={[classes.heading,
                                                       item.status === "Cancelled" ? classes.cancel_text : ""]}>
                                                       {item.source_name}</Typography>
                                               </td>
                                               <td>
                                                   <Typography className={[classes.secondaryHeading,
                                                       item.status === "Cancelled" ? classes.cancel_text : ""]}>
                                                       {convert_date_fomart(item.departure_date)}
                                                   </Typography>
                                               </td>
                                           </tr>
                                           </tbody>
                                       </table>
                                   </ExpansionPanelSummary>
                                   <ExpansionPanelDetails>
                                       {
                                           name === "request"?
                                               <RequestDetail
                                                   ViewCancelRequest={(cancel_id) => this.setState({
                                                       cancel_id,
                                                       open_cancel_request: true
                                                   })}
                                                            ViewConfirm={(confirm_data)=>
                                                                this.setState({confirm_data,open_request_confirm:true})}
                                                            status_schedule={name} data={item}/>
                                               :
                                               <SimpleTable status_schedule={name} data={item}
                                                            ViewCancel={(cancel_id) => this.setState({
                                                                cancel_id,
                                                                open_cancel: true
                                                            })}
                                                            ViewQR={(qr_data) => this.setState({qr_data, open_qr: true})}
                                                            ViewBus={(bus_data)=>this.setState({bus_data,open_bus:true})}
                                                />
                                       }
                                   </ExpansionPanelDetails>
                               </ExpansionPanel>
                           )
                       }
                   )
        }
        return items
    }
    render() {
        const { classes} = this.props;

        const {open_qr,open_cancel,qr_data,open_status,
            status,open_request_confirm,confirm_data,
            open_cancel_request,bus_data,open_bus} = this.state;

        const items = this.renderHistory()
        return (
            <Layout>
                <div className={classes.root}>
                    {items["request"].length>0?
                        <h2 style={{color:"gray",textAlign:"center",fontWeight:"500"}}>Request Schedule</h2>:null}
                    {items["request"]}

                    {items["current"].length>0?<h2 style={{color:"gray",textAlign:"center",fontWeight:"500"}}>Current Schedule</h2>:null}
                    {items["current"]}


                    {items["history"].length > 0 ? <h2 style={{color: "gray", textAlign: "center", fontWeight: "500"}}>History
                            Schedule</h2> : null}
                    {items["history"]}

                    <Qr_code open={open_qr} id={qr_data} onClose={()=>this.setState({open_qr:false})}/>
                    <CancelDialog open={open_cancel} onConfirm={this.handleCancel.bind(this)}
                                  onClose={()=>this.setState({open_cancel:false})}/>
                    <CancelDialog open={open_cancel_request} onConfirm={this.handleCancelRequest.bind(this)}
                                  onClose={()=>this.setState({open_cancel_request:false})}/>
                    <StatusDialog open={open_status} status={status} onClose={()=>this.setState({open_status:false})}/>
                    <ConfirmRequest open={open_request_confirm}
                                    data={confirm_data}
                                    onClose={()=>this.setState({open_request_confirm:false})}
                                    confirm={()=>{this.handleRequestBooking()}}
                    />
                    <BusDetial data={bus_data} open={open_bus} onClose={()=>this.setState({open_bus:false})}/>
                </div>
            </Layout>
        );
    }
}

History.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapDispatchToProps = dispatch => {
    return {
        HistoryData: data =>dispatch(historyData(data)),
    }
}
const mapStateToProps =state =>{
    return {
        history_data:state.history_data,

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(History));