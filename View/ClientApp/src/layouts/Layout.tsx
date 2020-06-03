import * as React from 'react';
import Header from '../components/menu-f/Header/Header';
import Footer from '../components/menu-f/Footer/Footer';
import { Grid } from '@material-ui/core';

import { connect, ConnectedProps } from 'react-redux';
import { ApplicationState } from '../store/index';
import { getToken } from '../store/auth/selectors';
import setAuthorizationToken from '../axiosOptions';

const mapStateToProps = (state: ApplicationState) => {
    return {
        token: getToken(state)
    }
}

const connector = connect(mapStateToProps, {})

type PropsFromRedux = ConnectedProps<typeof connector>

type LayoutPropsType = PropsFromRedux & { children?: React.ReactNode }

class Layout extends React.PureComponent<LayoutPropsType, {}> {
    componentDidMount() {
        setAuthorizationToken(localStorage.getItem("token"))
    }

    public render() {
        return (
            <React.Fragment>
                <Header />
                {
                    this.props.children
                }
            </React.Fragment>        
        )
    }
}

export default connector(Layout);
