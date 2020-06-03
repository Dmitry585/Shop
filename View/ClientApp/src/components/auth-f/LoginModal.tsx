import * as React from 'react'
import { signIn, loadMenu } from '../../store/auth/actions'
import { connect, ConnectedProps } from 'react-redux'
import { AuthModalStateType} from "./authModalTypes"
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Theme, createStyles, withStyles } from '@material-ui/core'

const mapDispatch = {
    signIn: (login: string, password: string) => signIn(login, password),
}

const useStyles = ({ spacing, shape, palette, breakpoints }: Theme) => createStyles({
    button: {
        marginBottom: spacing(2)
    }
}
)

const connector = connect(null, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type LoginStylePropsType = {
    classes: {
        button:string
    }
}

type LoginPropsType = PropsFromRedux & LoginStylePropsType

class LoginModal extends React.PureComponent<LoginPropsType, AuthModalStateType> {
    public state = {
        modal: false,
        login: "",
        password: "",
    };

    public render() {
        return (
            <>
                <Button onClick={this.toggle}>Войти</Button>
                <Dialog open={this.state.modal} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">
                        Авторизация
                    </DialogTitle>
                    <DialogContent>
                        <TextField autoFocus fullWidth margin="dense" onChange={this.loginChangeHandler} defaultValue={this.state.login}  label="Логин" />
                        <TextField autoFocus fullWidth margin="dense" onChange={this.passwordChangeHandler} defaultValue={this.state.password} type="password" label="Пароль" />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.login}>Войти</Button>
                        <Button color="primary" onClick={this.toggle}>Отмена</Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }


    private login = () => {
        this.toggle()
        this.props.signIn(this.state.login, this.state.password)
        this.setState({
            login: "",
            password: ""
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

    private toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
}

export default withStyles(useStyles)(connector(LoginModal))