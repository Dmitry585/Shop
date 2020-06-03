import * as React from "react";
import { Grid } from '@material-ui/core';
import { Route } from "react-router";
import CrudMenu from "../../components/menu-f/CrudMenu/CrudMenu";
import CrudPage from "../../components/crud-f/CrudPage";

class CRUD extends React.PureComponent {

    public render() {
        return (
            <div style={{ padding: 20 }}>
                <Grid direction="row" container>
                    <Grid item xs={12} sm={3} md={2}>
                        <Route path="/crud/:table?" component={CrudMenu} />
                    </Grid>
                    <Grid item xs={12} sm={9} md={10}>
                        <Route path="/crud/:table?" component={CrudPage} />
                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default CRUD;

