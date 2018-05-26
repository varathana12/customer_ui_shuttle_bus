import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import BusIcon from '@material-ui/icons/DirectionsBus'
import RequestIcon from '@material-ui/icons/Cached'
import HistoryIcon from '@material-ui/icons/History'
import PeopleIcon from '@material-ui/icons/People'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {chageTitleHeader,hideAppBar} from "../actions";

const styles = {
    root: {
        width: "100%",
        position:"fixed",
        bottom:0,
        boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px " +
        "5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)"
    },
};

class SimpleBottomNavigation extends React.Component {
    state = {
        value: 0
    };

    handleChange = (event, value) => {
        const {changeTitleHeader, hideAppBar} = this.props
        changeTitleHeader(value)
        if(value === 'profile'){
            hideAppBar(true)
        }
        else{
            hideAppBar(false)
        }
        this.props.history.push("/sbs/customer/"+value)
    };

    render() {
        const { classes,nameRoute } = this.props;
        const { value} = this.state;

        return (
                <BottomNavigation
                    value={nameRoute}
                    onChange={this.handleChange}
                    showLabels
                    className={classes.root}
                >
                    <BottomNavigationAction value="booking" label="Booking" icon={<BusIcon />} />
                    <BottomNavigationAction value="request" label="Request" icon={<RequestIcon />} />
                    <BottomNavigationAction value="history" label="History" icon={<HistoryIcon />} />
                    <BottomNavigationAction value="profile" label="Profile" icon={<PeopleIcon />} />
                </BottomNavigation>
        );
    }
}

SimpleBottomNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapDispatchToProps =dispatch =>{
    return {
        changeTitleHeader: nameRoute => (dispatch(chageTitleHeader(nameRoute))),
        hideAppBar :status => (dispatch(hideAppBar(status)))
    }
}
const mapStateToProps =state =>{
    return {
        nameRoute:state.nameRoute
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)((withRouter)(SimpleBottomNavigation)));