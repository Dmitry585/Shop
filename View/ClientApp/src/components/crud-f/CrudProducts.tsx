import * as React from "react";
import { Column } from 'material-table';
import { TextField,Button } from '@material-ui/core';
import { ConnectedProps, connect } from "react-redux";
import { ApplicationState } from "../../store/index";
import { filteredProducts } from "../../store/products/selectors";
import { init, editProduct, deleteProduct, addProduct } from "../../store/products/actions";
import { ProductType, ModelType } from "../../modelsTypes";
import CrudPage from "./CrudPage";
import { productTypesForCombobox } from "../../store/productType/selectors";
import product_api from "../../api/product";


const mapStateToProps = (state: ApplicationState) => {
    return {
        products: filteredProducts(state),
        productTypes: productTypesForCombobox(state)
    }
}

const mapDispatch = {
    getProducts: () => init(),
    edit: (product: ProductType) => editProduct(product),
    delete: (id: number) => deleteProduct(id),
    add: (product: ProductType) => addProduct(product),
}

const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type CrudProductPropsType = PropsFromRedux

class CrudProducts extends React.PureComponent<CrudProductPropsType, { columns: Array<Column<ProductType>> }> {
    public state = {
        columns: [
            {
                title: 'Номер',
                field: 'productId',
                editable: "never" as "never",
            },
            {
                title: 'Наиманование',
                field: 'name',
            },
            {
                title: 'Цена',
                field: 'price',
                type: 'numeric' as "numeric",
                initialEditValue: "1",
            },
            {
                title: 'Количество',
                field: 'count',
                type: 'numeric' as "numeric",
                initialEditValue: "1",
            },
            {
                title: 'Ссылка на картинку',
                field: 'image',
                cellStyle: {
                    maxWidth: "100px",
                },
                render: (rowData: any) => <p style={{ wordWrap: "break-word" }} >{rowData.image}</p>,
                editComponent: (props: { value: any; onChange: (arg0: any) => any; }) => (
                    <TextField
                        multiline
                        rowsMax={5}
                        placeholder="Ссылка на изображение"
                        value={props.value}
                        onChange={e => props.onChange(e.target.value)}
                    />)
            },
            {
                title: 'Описание',
                field: 'about',
                cellStyle: {
                    width: "250px",
                },
                editComponent: (props: { value: any; onChange: (arg0: any) => any; }) => (
                    <TextField
                        multiline
                        rowsMax={15}
                        placeholder="Описание"
                        value={props.value}
                        onChange={e => props.onChange(e.target.value)}
                    />)
            },
        ],
    }

    public componentDidMount() {
        if (this.props.products.length == 0)
            this.props.getProducts();
        this.setState({
            columns: [...this.state.columns, {
                title: 'Тип',
                field: 'productTypeId',
                initialEditValue: "1",
                lookup: this.props.productTypes
            },]
        })
    }

    private validate = (pr: ProductType) => {
        if (!pr.about) pr.about = "Описание отстутствует"
        if (!pr.count) pr.count = 0
        if (!pr.image) pr.image = "https://wallbox.ru/wallpapers/main/201141/eda-be6cfc03d3ec.jpg"
        if (!pr.name) pr.name = "Имя отсутствует"
        if (!pr.price) pr.price = "0"
        if (pr.count < 0) pr.count = 0
        if (+pr.price < 0) pr.price = "0"
        return pr
    }

    public delete = (product: ModelType) => {
        var pr = product as ProductType
        this.props.delete(pr.productId)
    }
    public edit = (product: ModelType) => {
        var pr = product as ProductType
        pr = this.validate(pr);
        this.props.edit(pr)
    }
    public add = (product: ModelType) => {
        var pr = product as ProductType
        pr = this.validate(pr);
        this.props.add(pr)
    }

    public downloadXlsx = () => {
        product_api.downloadXlsx();
    }



    public render() {
        return (
            <div style={{ padding: 20 }}>
                <Button onClick={this.downloadXlsx}>Выгрузить XLSX</Button>
                <CrudPage title="Продукты" columns={this.state.columns} data={this.props.products} delete={this.delete} edit={this.edit} add={this.add} />
            </div>
        )
    }
}
export default connector(CrudProducts)