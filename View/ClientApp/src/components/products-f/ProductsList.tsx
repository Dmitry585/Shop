import * as React from "react";
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { MemoryRouter, Route } from 'react-router';
import { ApplicationState } from "../../store/index";
import { products } from "../../store/products/selectors";
import { connect, ConnectedProps } from "react-redux";
import { init } from "../../store/products/actions";
import ProductsItem from "./ProductItem";
import { RouteComponentProps, withRouter } from "react-router";
import { ProductType } from "../../modelsTypes";
import "./ProductListStyle.css"


const mapDispatch = {
    init: () => init()
}

const useStyles = ({ }: Theme) => createStyles({
    flex: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        width: 'calc(100% + 16px)',
        margin: '-8px',
        "& > * ": {
            padding: 8,
        },

    },
    item: {
        "enter": {
            opacity: 0
        },
        "enter-active": {
            opacity: 1,
            transition: "opacity 500ms ease-in"
        },
        "exit": {
            opacity: 1
        },
        "exit-active": {
            opacity: 0,
            transition: "opacity 500ms ease-in"
        }
    }
}
)

type ProductListStylePropsType = {
    classes: {
        flex: string,
        item: string
    }
}

type ProductListRouterStateType = {
    productTypeID?: string
}

interface ProductListProps extends RouteComponentProps<ProductListRouterStateType>, React.Props<ProductListRouterStateType> { }

const mapStateToProps = (state: ApplicationState, ownProps: ProductListProps) => {
    return {
        productTypeId: ownProps.match.params.productTypeID,
        products: products(state)
    }
}

const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>


type ProductListPropsType = PropsFromRedux & ProductListStylePropsType


class ProductsList extends React.PureComponent<ProductListPropsType, { list: Array<ProductType> }> {

    public state = {
        list: [],
    }
    public async componentDidMount() {
        if (this.props.products.length == 0) {
            await this.props.init()
        }
    }

    public render() {
        return (
            <MemoryRouter initialEntries={['/magazine']} initialIndex={0}>
                <Route>
                    {({ location }) => {
                        const query = new URLSearchParams(location.search);
                        const size = 5;
                        const items = this.props.productTypeId == undefined ? this.props.products : this.props.products.filter(x => x.productTypeId == +(this.props.productTypeId || 0))
                        const count = Math.ceil(items.length / (size))
                        let page = parseInt(query.get('page') || '1');
                        if (count < page) {
                            page = 1
                        }
                        return (
                            <div style={{ paddingLeft: 16, paddingRight: 16 }}>
                                <TransitionGroup className={this.props.classes.flex}>
                                    {
                                        items.length != 0 ?
                                            (items.slice((page - 1) * size, ((page - 1) * size) + (size)).map((item, i) => {
                                                return (
                                                    <CSSTransition classNames="item" key={item.productId} timeout={250} >
                                                        <ProductsItem item={item} />
                                                    </CSSTransition>)
                                            })
                                            )
                                            :
                                            (
                                                <CSSTransition classNames="item" key={1} timeout={250} >
                                                    <h2>
                                                        Товаров в данной категории пока нет
                                                    </h2>    
                                                </CSSTransition>
                                                    )
                                            }
                                </TransitionGroup>
                                                <div style={{ display: "flex", marginTop: 10 }}>
                                                    <Pagination
                                                        style={{ marginLeft: "auto", marginRight: "auto", marginTop: 10 }}
                                                        page={page}
                                                        count={count}
                                                        renderItem={(item) => (
                                                            <PaginationItem
                                                                component={Link}
                                                                to={`/${item.page === 1 ? '' : `?page=${item.page}`}`}
                                                                {...item}
                                                            />
                                                        )}
                                                    />
                                                </div>
                            </div>
                                );
                            }}
                </Route>
            </MemoryRouter >
                )
            }
        }
        export default withStyles(useStyles)(connector(ProductsList));
