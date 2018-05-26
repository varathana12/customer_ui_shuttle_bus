import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle,
    DialogContent,DialogActions } from 'material-ui/Dialog';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import {connect} from 'react-redux'
import {success,danger} from "../../constants/color";
import {id_to_location,id_to_pickup} from "../../init/data_fuctions";

const styles = theme => ({
    last_cell:{
        paddingRight:"unset !important"
    },
    title:{
      textAlign:"center"
    },
    okButton:{
        border:"1px solid",
        width:"40%",
        color:success
    },
    cancelButton:{
        border:"1px solid",
        width:"40%",
        float:"left",
        color:danger
    },
    dialogAction:{
        justifyContent:"space-between",
        margin:"0 18px",
        marginBottom:18
    },

});

class ConfirmDialog extends React.Component {


    render() {
        const { open,onClose,confirm,source_data,booking_data,classes} = this.props;
        const {destination,source,departure_date,return_date,choice,
            amount_child,amount_adult,departure_time,return_time} = booking_data
            let dtime = departure_time.split(":")[0]+":"+departure_time.split(":")[1]
            let rtime = return_time.split(":")[0] + ":"+return_time.split(":")[1]
        return (
            <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title"  className={classes.title}>Booking Confirm</DialogTitle>
                <DialogContent>
                    <Table className="table_cl table_dl" style={{width:window.outerWidth -110,maxWidth:490}}>
                        <TableBody>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{"Source"}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {id_to_location(source_data,source)}
                                    </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{"Pick Up"}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {id_to_pickup(source_data,source)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{"Destination"}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {id_to_location(source_data,destination)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{"Drop Off"}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {id_to_pickup(source_data,destination)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{"Travelers"}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    Adult {amount_adult}<span style={{paddingRight:10}}></span>Child {amount_child}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{"Trip"}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {choice === 1 ? "One Way":"Round Way"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{"Departure"}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {departure_date.toLocaleString().split(", ")[0]} {dtime}</TableCell>
                            </TableRow>
                            {
                                choice === 2?
                                    <TableRow>
                                        <TableCell><span style={{fontWeight: "bold"}}>{"Return"}</span></TableCell>
                                        <TableCell className={classes.last_cell}>
                                            <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                            {return_date.toLocaleString().split(", ")[0]} {rtime}</TableCell>
                                    </TableRow>
                                    :<dive></dive>
                            }

                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions className={classes.dialogAction}>
                    <Button onClick={onClose} className={classes.cancelButton}>
                        Cancel
                    </Button>
                    <Button onClick={()=>{onClose();confirm()}} className={classes.okButton}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ConfirmDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.object.isRequired,

};
const mapStateToProps = state =>{
    return {
        source_data:state.source_data,
        booking_data: {source:state.source,
            destination:state.destination,
            departure_date:state.date,
            return_date:state.return_date,
            choice: Number(state.choice),
            departure_time:state.departure_time,
            return_time:state.return_time,
            amount_child:state.amount_child,
            amount_adult:state.amount_adult
        },
    }
}


export default connect(mapStateToProps)(withStyles(styles)(ConfirmDialog));