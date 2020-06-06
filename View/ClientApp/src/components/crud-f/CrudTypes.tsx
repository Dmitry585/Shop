import * as React from "react";
import MaterialTable, { Column, EditComponentProps } from 'material-table';
import { ConnectedProps, connect } from "react-redux";
import { ApplicationState } from "../../store/index";
import { productTypes } from "../../store/productType/selectors";
import { getProductType, editProductType, deleteProductType, addProductType } from "../../store/productType/actions";
import { ProductTypeType, ModelType } from "../../modelsTypes";
import CrudPage from "./CrudPage";

const mapStateToProps = (state: ApplicationState) => {
    return {
        productTypes: productTypes(state)
    }
}

const mapDispatch = {
    getProductTypes: () => getProductType(),
    edit: (productType: ProductTypeType) => editProductType(productType),
    delete: (id: number) => deleteProductType(id),
    add: (productType: ProductTypeType) => addProductType(productType),
}

const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type CrudTypePropsType = PropsFromRedux

class CrudTypes extends React.PureComponent<CrudTypePropsType, { columns: Array<Column<ProductTypeType>> }> {
    public state = {
        columns: [
            {
                title: 'Номер',
                field: 'productTypeId',
                editable: "never" as "never",
            },
            {
                title: 'Наименование',
                field: 'name',
            },
        ]
    }

    public componentDidMount() {
        if (this.props.productTypes.length == 0)
            this.props.getProductTypes();
    }

    private validate = (pt: ProductTypeType) => {
        if (!pt.name) pt.name = "Наименование отсутствует"
        return pt
    }

    public delete = (productType: ModelType) => {
        var pt = productType as ProductTypeType
        this.props.delete(pt.productTypeId)
    }
    public edit = (productType: ModelType) => {
        var pt = productType as ProductTypeType
        pt = this.validate(pt);
        this.props.edit(pt)
    }
    public add = (productType: ModelType) => {
        var pt = productType as ProductTypeType
        pt = this.validate(pt);
        this.props.add(pt)
    }

    public render() {
        return (
            <div style={{ padding: 20 }}>
                <CrudPage title="Типы продуктов" columns={this.state.columns} data={this.props.productTypes} delete={this.delete} edit={this.edit} add={this.add} />
            </div>
        )
    }
}
export default connector(CrudTypes)