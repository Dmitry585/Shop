import * as React from "react";
import MaterialTable, { Column, EditComponentProps } from 'material-table';
import { ConnectedProps, connect } from "react-redux";
import { users } from "../../store/users/selectors";
import { getUsers, editUser, deleteUser } from "../../store/users/actions";
import { ApplicationState } from "../../store/index";
import { PersonType, ModelType } from "../../modelsTypes";
import CrudPage from "./CrudPage";

const mapStateToProps = (state: ApplicationState) => {
    return {
        users: users(state)
    }
}

const mapDispatch = {
    getUsers: () => getUsers(),
    edit: (user: PersonType) => editUser(user),
    delete: (id: number) => deleteUser(id)
}

const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type CrudUserPropsType = PropsFromRedux

class CrudUser extends React.PureComponent<CrudUserPropsType, { columns: Array<Column<PersonType>> }> {
    public state = {
        columns: [
            {
                title: 'Номер',
                field: 'personId',
                editable: "never" as "never",
            },
            {
                title: 'Логин',
                field: 'login'
            },
            {
                title: 'Роль',
                field: 'roleId',
                lookup: { 1: 'Администратор', 2: 'Пользователь' },
            },
        ],
    }

    public async componentDidMount() {
        if (this.props.users.length == 0)
            await this.props.getUsers();
    }

    public delete = (user: ModelType) => {
        var us = user as PersonType
        this.props.delete(us.personId)
    }
    public edit = (user: ModelType) => {
        var us = user as PersonType
        this.props.edit(us)
    }


    public render() {
        return (
            <div style={{ padding: 20 }}>
                <CrudPage title="Пользователи" columns={this.state.columns} data={this.props.users}  delete={this.delete} edit={this.edit} />
            </div>
        )
    }
}
export default connector(CrudUser)