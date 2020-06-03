import * as React from "react";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../store";
import { ConnectedProps, connect } from "react-redux";



class CrudProducts extends React.PureComponent<{}, {}> {
    public state = {
   
    }


    public render() {
        return (
            <div style={{ padding: 20 }}>
                <h1>CrudPage Продукты</h1>
            </div>
        )
    }
}
export default CrudProducts