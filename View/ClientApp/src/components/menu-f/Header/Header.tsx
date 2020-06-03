import * as React from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { AppBar, Typography, Toolbar, IconButton, Menu, MenuItem, Button, Box, Container, Hidden } from '@material-ui/core';
import { Link } from "react-router-dom";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { connect, ConnectedProps } from 'react-redux';

import RegisterModal from '../../auth-f/RegisterModal';
import LoginModal from '../../auth-f/LoginModal';
import { ApplicationState } from '../../../store/index';
import { isAuth, role, menu } from '../../../store/auth/selectors';
import { signOut } from '../../../store/auth/actions';

const mapStateToProps = (state: ApplicationState) => {
    return {
        isAuth: isAuth(state),
        role: role(state),
        menu: menu(state)
    }
}

const mapDispatch = {
    signOut: () => signOut()
}

const useStyles = ({ spacing, shape, palette, breakpoints }: Theme) => createStyles({
    grow: {
        flexGrow: 1,
    },
    root: {
        '& > * + *': {
            marginLeft: spacing(2)
        }
    },
    menu: {
        marginRight: spacing(2),
        marginLeft: spacing(2),
        width: '100%',
    },
}
)

const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type HeaderStateType = {
    anchorUpMenu: null | HTMLElement
    anchorDownMenu: null | HTMLElement
}

type HeaderStylePropsType = {
    classes: {
        root: string,
        menu: string,
        grow: string,
    }
}


type HeaderPropsType = PropsFromRedux & HeaderStylePropsType

class Header extends React.PureComponent<HeaderPropsType, HeaderStateType> {

    public state = {
        anchorUpMenu: null,
        anchorDownMenu: null,
    }

    public componentDidMount() {
       
    }


    public render() {
        return (
            <div className={this.props.classes.grow}>
                <AppBar color="transparent" position="static">
                    <Container>
                        <Toolbar>
                            <Hidden only="xs" >
                                {
                                    this.props.menu.map((route, i) => {
                                        if (i == this.props.menu.length - 1) {
                                            return (
                                                <Typography key={i} variant="h6" className={`${this.props.classes.root} ${this.props.classes.menu} ${this.props.classes.grow}`}>
                                                    <Button component={Link} to={route.path}>
                                                        {route.name}
                                                    </Button>
                                                </Typography>)
                                        }
                                        return (
                                            <Typography key={i} variant="h6" >
                                                <Button component={Link} to={route.path}>
                                                    {route.name}
                                                </Button>
                                            </Typography>)
                                    })
                                }
                            </Hidden>
                            <Hidden smUp>
                                <div className={this.props.classes.grow}>
                                    <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleUpMenuClick}>
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        anchorEl={this.state.anchorUpMenu}
                                        keepMounted
                                        open={Boolean(this.state.anchorUpMenu)}
                                        onClose={this.handelUpMenuClose}
                                    >
                                        {
                                            this.props.menu.map((route, i) => <MenuItem key={i} component={Link} to={route.path} onClick={this.handelUpMenuClose}>{route.name}</MenuItem>)
                                        }
                                    </Menu>
                                </div>
                            </Hidden>
                            {
                                this.props.isAuth ?
                                    (
                                        <Button onClick={this.logout}>Выйти</Button>
                                    )
                                    :
                                    (
                                        <div>
                                            <Hidden only="xs" >
                                                <Box display="flex">
                                                    <RegisterModal />
                                                    <LoginModal />
                                                </Box>
                                            </Hidden>

                                            <Hidden smUp>
                                                <>
                                                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleDownMenuClick}>
                                                        Авторизация
                                                    </Button>
                                                    <Menu
                                                        anchorEl={this.state.anchorDownMenu}
                                                        keepMounted
                                                        open={Boolean(this.state.anchorDownMenu)}
                                                        onClose={this.handelUpMenuClose}
                                                    >
                                                        <MenuItem onClick={this.handelDownMenuClose}>
                                                            <RegisterModal />
                                                        </MenuItem>
                                                        <MenuItem onClick={this.handelDownMenuClose}>
                                                            <LoginModal />
                                                        </MenuItem>
                                                    </Menu>
                                                </>
                                            </Hidden>
                                        </div>
                                    )
                            }

                        </Toolbar>
                    </Container>
                </AppBar >
            </div>
        );
    }

    private handleUpMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            anchorUpMenu: event.currentTarget
        });
    };

    private handelUpMenuClose = () => {
        this.setState({
            anchorUpMenu: null
        });
    }

    private handleDownMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            anchorDownMenu: event.currentTarget
        });
    };

    private handelDownMenuClose = () => {
        this.setState({
            anchorDownMenu: null
        });
    }

    private logout = () => {
        this.props.signOut();
    }
}

export default withStyles(useStyles)(connector(Header))
