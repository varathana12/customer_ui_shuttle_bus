import React, { Component } from 'react';
import { Provider } from "react-redux";
import {Main} from './routes'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import {BrowserRouter as Router} from 'react-router-dom'
import SimpleAppBar from './component/navbar'
import SimpleBottomNavigation from './component/bottombar'
import './component/styles.css'
import {danger,success} from "./constants/color";
import store from './store/index'
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: success,
            dark: '#2ecc71',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: danger,
            dark: '#88dba3',
            contrastText: '#88dba3',
        },
    },
    error: {
        "500":danger
    }
});
class App extends Component {

    render() {
        return (

            <Provider store={store}>
                <div>
                    <Router>
                        <MuiThemeProvider theme={theme} >
                            <SimpleAppBar/>
                            <Main/>
                            <SimpleBottomNavigation/>
                        </MuiThemeProvider>
                    </Router>
                </div>

            </Provider>

        );
    }
}

export default App;
