import * as React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Theme, createStyles, withStyles } from '@material-ui/core'

import { register, loadMenu } from '../../store/auth/actions';
import { connect, ConnectedProps } from 'react-redux';
import { AuthModalStateType } from "./authModalTypes"

const mapDispatch = {
    register: (login: string, password: string) => register(login, password),
}

const connector = connect(null, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type RegisterStateType = AuthModalStateType & { passwordConfirm: string }

type RegisterPropsType = PropsFromRedux

class RegisterModal extends React.PureComponent<RegisterPropsType, RegisterStateType > {

    public state = {
        modal: false,
        login: "",
        password: "",
        passwordConfirm:""
    };


    public render() {
        return (
            <>
                <Button onClick={this.toggle}>Регистрация</Button>
                <Dialog open={this.state.modal} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">
                        Регистрация
                    </DialogTitle>
                    <DialogContent>
                        <TextField autoFocus fullWidth margin="dense" onChange={this.loginChangeHandler} defaultValue={this.state.login} label="Логин" />
                        <TextField autoFocus fullWidth margin="dense" onChange={this.passwordChangeHandler} defaultValue={this.state.password} type="password" label="Пароль" />
                        <TextField autoFocus fullWidth margin="dense" onChange={this.passwordConfirmChangeHandler} defaultValue={this.state.passwordConfirm} type="password" label="Повторите пароль" />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.register}>Зарегестрироваться</Button>
                        <Button color="primary" onClick={this.toggle}>Отмена</Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }

    private register = () => {
        this.toggle()
        this.props.register(this.state.login, this.state.password)      
        this.setState({
            login: "",
            password: "",
            passwordConfirm:""
        });
    }

    private loginChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            login: event.target.value
        });
    }

    private passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            password: event.target.value
        });
    }

    private passwordConfirmChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            password: event.target.value
        });
    }

    private toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
}

export default connector(RegisterModal)