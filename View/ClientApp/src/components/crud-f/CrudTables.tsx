import * as React from "react";
import { Column } from 'material-table';
import { TextField } from '@material-ui/core';
import { ConnectedProps, connect } from "react-redux";
import { ApplicationState } from "../../store/index";
import { TableType, ModelType } from "../../modelsTypes";
import CrudPage from "./CrudPage";
import { addTable, deleteTable, editTable, getTable } from "../../store/table/actions";
import { tables } from "../../store/table/selectors";


const mapStateToProps = (state: ApplicationState) => {
    return {
        tables: tables(state),
    }
}

const mapDispatch = {
    getTable: () => getTable(),
    edit: (table: TableType) => editTable(table),
    delete: (id: number) => deleteTable(id),
    add: (table: TableType) => addTable(table),
}

const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type CrudTablesPropsType = PropsFromRedux

class CrudTables extends React.PureComponent<CrudTablesPropsType, { columns: Array<Column<TableType>> }> {
    public state = {
        columns: [
            {
                title: 'Номер',
                field: 'tableId',
                editable: "never" as "never",
            },
            {
                title: 'Количество человек',
                field: 'maxPerson',
                type: 'numeric' as "numeric",
                initialEditValue: 1,
                editComponent: (props: any) => (
                    <TextField
                        type="number"
                        fullWidth
                        InputProps={{ inputProps: { min: 1 } }}
                        value={props.value}
                        onChange={e => { props.onChange(e.target.value) }}
                    />
                )
            },

        ],
    }

    public async componentDidMount() {
        if (this.props.tables.length == 0)
            await this.props.getTable()
        console.log(this.props.tables)
    }

    private validate = (tb: TableType) => {
        if (tb.maxPerson <= 0) tb.maxPerson = 1
        return tb
    }

    public delete = (table: ModelType) => {
        var tb = table as TableType
        this.props.delete(tb.tableId)
    }
    public edit = (table: ModelType) => {
        var tb = table as TableType
        tb = this.validate(tb);
        this.props.edit(tb)
    }
    public add = (table: ModelType) => {
        var tb = table as TableType
        tb = this.validate(tb);
        this.props.add(tb)
    }



    public render() {
        return (
            <div style={{ padding: 20 }}>
                <CrudPage title="Столы" columns={this.state.columns} data={this.props.tables} delete={this.delete} edit={this.edit} add={this.add} />
            </div>
        )
    }
}
export default connector(CrudTables)