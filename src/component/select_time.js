import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl} from 'material-ui/Form';
import Select from 'material-ui/Select';
import {departureTime} from "../actions";
import {disable_select_time,timeFormat,sortTime} from "../init/init_function";
import {danger} from "../constants/color";

class SelectTime extends React.Component {
    state ={
        disable:false
    }

    render() {
        const { classes,marginTop,departure_time,
            departureTime,departure_date,today,list_departure_times } = this.props;



        return (
            <form className={classes.root} autoComplete="off" style={{marginTop:marginTop?-marginTop:0}}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="departure_time_label">departure time</InputLabel>
                    <Select
                        value={departure_time}
                        onChange={(event)=>departureTime(event.target.value)}
                        inputProps={{
                            name: 'departure_time',
                            id: 'departure_time_label',
                        }}
                        className={classes.Select}
                    >
                        {
                            sortTime(list_departure_times).map((item,index)=>{
                                const disable = disable_select_time(departure_date,today,item)


                                return(
                                    <MenuItem disabled={disable}
                                              style={{color:disable?danger:"unset"}}
                                              key={index}
                                              value={item}>{timeFormat(item)}</MenuItem>
                                )
                            })
                        }

                    </Select>
                </FormControl>

            </form>
        );
    }
}
const styles = theme => ({
    button: {
        display: 'block',
        marginTop: theme.spacing.unit * 5,
    },
    formControl: {
        minWidth: "100%",
        marginBottom:10,
        marginTop:10
    },
    Select:{
        lineHeight:"2.5rem"
    }
});

SelectTime.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapDispatchToProps  = dispatch =>{
    return {
        departureTime: data =>(dispatch(departureTime(data))),

    }
}
const mapStateToProps = state =>{
    return {
        departure_time:state.departure_time,
        departure_date:state.date,
        today:state.today,
        list_departure_times:state.list_departure_times
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SelectTime));
