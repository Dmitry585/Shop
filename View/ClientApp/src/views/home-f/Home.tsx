import * as React from "react";
import { Grid } from '@material-ui/core';

import { Route } from "react-router";
import ProductsMenu from "../../components/menu-f/ProductsMenu/ProductsMenu";
import ProductsList from "../../components/products-f/ProductsList";

class Home extends React.PureComponent {

    public render() {
        return (
            <div style={{ padding: 20 }}>
                <Grid direction="row" container>
                    <Grid item xs={12} sm={3} md={2}>
                        <Route path="/magazine/:productTypeID?" component={ProductsMenu} />
                    </Grid>
                    <Grid item xs={12} sm={9} md={10}>
                        <Route path="/magazine/:productTypeID?" component={ProductsList} />
                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default Home;