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
import {convert_date_fomart} from "../../init/init_function";

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
class RequestConfirm extends React.Component {


    render() {
        const { open,onClose,confirm,data,classes,source_data} = this.props;
        const {destination_id,source_id,dept_date,
            child,adult,provided_time} = data

        return (
            <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title"  className={classes.title}>Booking Confirmation</DialogTitle>
                <DialogContent>
                    <Table className="table_cl table_dl" style={{width:window.outerWidth -110,maxWidth:490}}>
                        <TableBody>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{"Source"}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {id_to_location(source_data,source_id)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{"Pick Up"}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {id_to_pickup(source_data,source_id)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{"Destination"}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {id_to_location(source_data,destination_id)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{"Drop Off"}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {id_to_pickup(source_data,destination_id)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{"Departure"}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {convert_date_fomart(dept_date)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{"Provided Time"}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {provided_time}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{"Travelers"}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    Adult {adult}<span style={{paddingRight:10}}></span>Child {child}
                                </TableCell>
                            </TableRow>

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

RequestConfirm.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.object.isRequired,

};
const mapStateToProps = state =>{
    return {
        source_data:state.source_data,
        request_data: {source:state.source,
            destination:state.destination,
            departure_date:state.date,
            request_time:state.request_time,
            return_time:state.return_time,
            amount_child:state.amount_child,
            amount_adult:state.amount_adult
        },
    }
}


export default connect(mapStateToProps)(withStyles(styles)(RequestConfirm));