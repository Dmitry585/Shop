import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import Layout from './layouts/Layout';
import Home from './views/home-f/Home';
import Rezerved from './views/rezerved-f/Rezerved';
import { ApplicationState } from './store/index';
import { role, menu } from './store/auth/selectors';
import { connect, ConnectedProps } from 'react-redux';
import { loadMenu } from './store/auth/actions';
import { MenuType } from './store/auth/types';

const mapStateToProps = (state: ApplicationState) => {
    return {
        role: role(state),
        menu: menu(state)
    }
}

const mapDispatch = {
    loadMenu: () => loadMenu()
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
                <Switch>
                    {
                        this.props.menu.map(route => <Route key={route.path} path={route.path} component={route.component} />)
                    }
                    <Redirect from="/" to="/magazine" />
                </Switch>
            </Layout>
        )
    }

}

export default connector(App)
