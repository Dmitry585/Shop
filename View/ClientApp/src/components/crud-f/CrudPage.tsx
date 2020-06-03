import * as React from "react";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../store";
import { ConnectedProps, connect } from "react-redux";

type CrudPageRouterStateType = {
    table: string
}

interface CrudPageProps extends RouteComponentProps<CrudPageRouterStateType>, React.Props<CrudPageRouterStateType> { }

const mapStateToProps = (state: ApplicationState, ownProps: CrudPageProps) => {
    return {
        table: ownProps.match.params.table,
    }
}

const connector = connect(mapStateToProps, {})

type PropsFromRedux = ConnectedProps<typeof connector>

type CrudPagePropsType = PropsFromRedux

class CrudPage extends React.PureComponent<CrudPagePropsType, {}> {
    public state = {
   
    }


    public render() {
        return (
            <div style={{ padding: 20 }}>
                <h1>CrudPage {this.props.table == undefined ? "Пользователи" : this.props.table }</h1>
            </div>
        )
    }
}
export default connector(CrudPage);