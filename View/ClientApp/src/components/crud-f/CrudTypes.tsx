import * as React from "react";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../store";
import { ConnectedProps, connect } from "react-redux";



class CrudTypes extends React.PureComponent<{}, {}> {
    public state = {
   
    }


    public render() {
        return (
            <div style={{ padding: 20 }}>
                <h1>CrudPage Типы</h1>
            </div>
        )
    }
}
export default CrudTypes