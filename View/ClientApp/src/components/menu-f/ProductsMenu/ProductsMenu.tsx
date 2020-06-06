import * as React from 'react';
import {Link} from "react-router-dom";
import {  MenuList, MenuItem } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import { ApplicationState } from '../../../store/index';
import { connect, ConnectedProps } from 'react-redux';
import { productTypesMenu } from '../../../store/productType/selectors';
import { getProductType } from '../../../store/productType/actions';



type ProductListRouterStateType = {
    productTypeID?: string
}

interface ProductMenuProps extends RouteComponentProps<ProductListRouterStateType>, React.Props<ProductListRouterStateType> { }

const mapStateToProps = (state: ApplicationState, ownProps: ProductMenuProps) => {
    return {
        productTypeId: ownProps.match.params.productTypeID,
        types: productTypesMenu(state)
    }
}

const mapDispatch = {
    getMenu: () => getProductType()
}

const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type ProductMenuPropsType = PropsFromRedux

class ProductsMenu extends React.PureComponent<ProductMenuPropsType, {}> {
    public state = {
    }

    public async componentDidMount() {

        if (this.props.types.length == 1) {
            this.props.getMenu()
        }
    }


    public render() {
        return (
            <MenuList>
                {
                    this.props.types.map(item => {
                        return (
                            <MenuItem component={Link} to={item.productTypeId == 0 ? "/magazine" : `/magazine/${item.productTypeId}`} selected={item.productTypeId === (this.props.productTypeId != undefined ? +this.props.productTypeId : 0)} key={item.productTypeId}>
                               {item.name}
                            </MenuItem>)
                    }
                    )
                }
            </MenuList>
        )
    }


}

export default connector(ProductsMenu)
