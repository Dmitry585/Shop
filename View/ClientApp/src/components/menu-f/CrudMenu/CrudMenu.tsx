import * as React from 'react';
import {Link} from "react-router-dom";
import { MenuList, MenuItem } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import { ApplicationState } from '../../../store/index';
import { connect, ConnectedProps } from 'react-redux';

type CrudMenuMenuType = {
    name: string
    id: string
}


type CrudMenuStateType = {
    items: Array<CrudMenuMenuType>
}


type CrudMenuRouterStateType = {
    table?: string
}

interface CrudMenuProps extends RouteComponentProps<CrudMenuRouterStateType>, React.Props<CrudMenuRouterStateType> { }

const mapStateToProps = (state: ApplicationState, ownProps: CrudMenuProps) => {
    return {
        table: ownProps.match.params.table,
    }
}

const connector = connect(mapStateToProps, {})

type PropsFromRedux = ConnectedProps<typeof connector>

type CrudMenuPropsType = PropsFromRedux

class CrudMenu extends React.PureComponent<CrudMenuPropsType, CrudMenuStateType> {
    public state = {
        items: [{ name: "Пользователи", id: "" }, { name: "Типы продуктов", id: "Типы продуктов" }, { name: "Продукты", id: "Продукты" }, { name: "Столы", id: "Столы" }]
    }

    public async componentDidMount() {

    }


    public render() {
        return (
            <MenuList>
                {
                    this.state.items.map(item => {
                        return (
                            <MenuItem component={Link} to={`/crud/${item.id}`} selected={item.id === (this.props.table != undefined ? this.props.table : "")} key={item.id}>
                                {item.name}
                            </MenuItem>)
                    }
                    )
                }
            </MenuList>
        )
    }


}

export default connector(CrudMenu)
