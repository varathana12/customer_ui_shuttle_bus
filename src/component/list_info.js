import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import Exit from '@material-ui/icons/ExitToApp'
import Logout from './dialog/logout'


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

class ListInfo extends React.Component{
    state={
        open:false,
    }
    onConfirm(){
        document.getElementById("logoutForm").submit();
    }
    render(){
        const { classes , data} = this.props;
        const {open} = this.state
        return (
            <div className={classes.root}>
                <List component="nav">
                    <ListItem button>
                        <ListItemIcon>
                            <PhoneIcon />
                        </ListItemIcon>
                        <ListItemText primary="Phone" secondary={data.phone_number}/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <EmailIcon />
                        </ListItemIcon>
                        <ListItemText primary="Email" secondary={data.email}/>
                    </ListItem>
                    <ListItem button onClick={()=>this.setState({open:true})}>
                        <ListItemIcon>
                            <Exit />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
                <Logout open={open} onClose={()=>this.setState({open:false})} onConfirm={()=>this.onConfirm()}/>
            </div>
        );
    }

}

ListInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListInfo);
