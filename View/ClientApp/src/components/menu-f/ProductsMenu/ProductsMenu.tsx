import * as React from 'react';
import { ProductTypeType } from '../../../modelsTypes';
import {Link} from "react-router-dom";
import { List, ListItem, ListItemText, MenuList, MenuItem } from '@material-ui/core';
import productType_api from '../../../api/productType';
import { RouteComponentProps } from 'react-router-dom';
import { ApplicationState } from '../../../store/index';
import { connect, ConnectedProps } from 'react-redux';

type ProductMenuStateType = {
    types: Array<ProductTypeType>,
    selected: number
}

type ProductListRouterStateType = {
    productTypeID?: string
}

interface ProductMenuProps extends RouteComponentProps<ProductListRouterStateType>, React.Props<ProductListRouterStateType> { }

const mapStateToProps = (state: ApplicationState, ownProps: ProductMenuProps) => {
    return {
        productTypeId: ownProps.match.params.productTypeID,
    }
}

const connector = connect(mapStateToProps, {})

type PropsFromRedux = ConnectedProps<typeof connector>

type ProductMenuPropsType = PropsFromRedux

class ProductsMenu extends React.PureComponent<ProductMenuPropsType, ProductMenuStateType> {
    public state = {
        types: new Array<ProductTypeType>(),
        selected: 0
    }

    public async componentDidMount() {
        var result = await productType_api.getMenu() ?? []
        result.unshift({
            name: "Все",
            productTypeId: 0,
        })
        this.setState({
            types: result,
            selected : this.props.productTypeId == undefined ? 0 : +this.props.productTypeId
        })
    }


    public render() {
        return (
            <MenuList>
                {
                    this.state.types.map(item => {
                        return (
                            <MenuItem component={Link} to={item.productTypeId == 0 ? "/magazine" : `/magazine/${item.productTypeId}`} selected={item.productTypeId === this.state.selected} onClick={this.selectHandler(item.productTypeId)} key={item.productTypeId}>
                               {item.name}
                            </MenuItem>)
                    }
                    )
                }
            </MenuList>
        )
    }

    public selectHandler = (newSelected: number) => () => {

        this.setState({
            selected: newSelected
        })
    }


}

export default connector(ProductsMenu)
