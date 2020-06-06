import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { AlertProps } from "@material-ui/lab/Alert";
import Layout from './layouts/Layout';
import { ApplicationState } from './store/index';
import { role, menu } from './store/auth/selectors';
import { connect, ConnectedProps } from 'react-redux';
import { loadMenu } from './store/auth/actions';
import { snackBar } from './store/snackBar/selectors';
import { setSnackbar, closeSnackbar } from './store/snackBar/actions';

const mapStateToProps = (state: ApplicationState) => {
    return {
        role: role(state),
        menu: menu(state),
        snackBar:snackBar(state)
    }
}

const mapDispatch = {
    loadMenu: () => loadMenu(),
    openSnack: (text: string, severite?: string) => setSnackbar(text, severite),
    closeSnack: () => closeSnackbar()
}



const connector = connect(mapStateToProps, mapDispatch)


type PropsFromRedux = ConnectedProps<typeof connector>

type AppPropsType = PropsFromRedux

export class App extends React.PureComponent<AppPropsType, {}> {


    public async componentDidMount() {
        await this.props.loadMenu()

    }

    public render() {
        return (
            <Layout>
                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={this.props.snackBar.open} autoHideDuration={this.props.snackBar.time} onClose={this.props.closeSnack}>
                    <Alert severity={this.props.snackBar.severite as "success" | "info" | "warning" | "error" | undefined}>
                        {this.props.snackBar.text}
                    </Alert>
                </Snackbar>
                <Switch>
                    {
                        this.props.menu.map(route => <Route key={route.path} path={route.path} component={route.component} />)
                    }     
                    {
                        this.props.menu.length != 0 && <Redirect from="/" to="/magazine" />
                    }
                    
                </Switch>

            </Layout>
        )
    }

}

export default connector(App)
