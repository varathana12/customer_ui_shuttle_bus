import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button'
import ButtonNormal from '../component/button'
import {danger, view} from "../constants/color";

import {connect} from 'react-redux'


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
    },
});

class SimpleTable extends React.Component{

    state={
        open_qr:false,
        cancel_id:0,
        open_cancel:false,
    }
    convert(data) {
        const {ViewBus} = this.props
        const item = [
            {name:'Booking Code', data:data.code},
            {name:'Time', data:data.departure_time},
            {name:'Source', data:data.source_name},
            {name:'Pick-up', data:data.pickup_location},
            {name:'Destination', data:data.destination_name},
            {name:'Drop-off', data:data.drop_off_location},
            {name:'Amount', data:data.number_of_seats},
            {name:'Bus Model', data:data.bus_model?<Button
                    onClick={()=>ViewBus(data)}
                    style={{minHeight:0,padding:0,color:view}}>
                    {data.bus_model}
                </Button>: 'To be decided'},
            {name:'Driver', data:data.diver_name?
                    <Button color="primary" >
                        {data.driver_name}
                    </Button>: 'To be decided'},
        ];
        return item
    }
    handleButton(data){
        const {ViewCancel,ViewQR,status_schedule} = this.props
        if(data.status === 'Cancelled') {
            return(
            <TableRow>
                <TableCell colSpan={2} style={{paddingRight:0}}>
                    <ButtonNormal name={'Cancelled'} status={true} buttonStyle={{width:"100%"}} />
                </TableCell>
            </TableRow>
            )
        }
        else{
            if(status_schedule === "current"){
                return (
                    <TableRow>
                        <TableCell>
                            <ButtonNormal name={'Cancel'}
                                          onClick={()=>ViewCancel(data.id)}
                                          buttonStyle={{float:"left",color:danger}}/>
                        </TableCell>
                        <TableCell style={{paddingRight:0}}>
                            <ButtonNormal name={'QR-Code'}
                                          onClick={()=>ViewQR(data.qr_code)}
                                          buttonStyle={{float:"right",color:view}}/>
                        </TableCell>
                    </TableRow>
                )

            }else{
                return (
                    <TableRow>
                        <TableCell colSpan={2} style={{paddingRight:0}}>
                            <ButtonNormal name={'QR-Code'} onClick={()=>ViewQR(data.qr_code)} buttonStyle={{width:"100%"}} />
                        </TableCell>
                    </TableRow>
                )
            }
        }

    }

    render() {
        const {data} = this.props;
        return (

            <Table className="table_cl">
                <TableBody>
                    {
                        this.convert(data).map((n,index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell><span style={{fontWeight: "bold"}}>{n.name}</span></TableCell>
                                    <TableCell numeric><span
                                        style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>{n.data}
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    }
                    {this.handleButton(data)}
                </TableBody>
            </Table>
        );
    }
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapDispatchToProps = dispatch => {
    return {

    }
}
const mapStateToProps =state =>{
    return {
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SimpleTable));