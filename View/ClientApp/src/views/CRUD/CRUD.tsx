import * as React from "react";
import { Grid } from '@material-ui/core';
import { Route, Switch, Redirect } from 'react-router';
import CrudMenu from "../../components/menu-f/CrudMenu/CrudMenu";
import CrudUser from "../../components/crud-f/CrudUser";
import CrudTypes from "../../components/crud-f/CrudTypes";
import CrudTables from "../../components/crud-f/CrudTables";
import CrudProducts from "../../components/crud-f/CrudProducts";

class CRUD extends React.PureComponent {

    public render() {
        return (
            <div style={{ padding: 20 }}>
                <Grid direction="row" container>
                    <Grid item xs={12} sm={3} md={2}>
                        <Route path="/crud/:table?" component={CrudMenu} />
                    </Grid>
                    <Grid item xs={12} sm={9} md={10}>
                        <Switch>
                            <Route path="/crud/Типы продуктов" component={CrudTypes} />
                            <Route path="/crud/Продукты" component={CrudProducts} />
                            <Route path="/crud/Столы" component={CrudTables} />
                            <Route path="/crud" component={CrudUser} />
                        </Switch>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default CRUD;

