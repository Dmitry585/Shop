import * as React from "react";
import MaterialTable, { Column, MaterialTableProps } from "material-table";
import { ModelType } from "../../modelsTypes";


type CrudPagePropsType = {
    data: Array<ModelType>
    columns: Array<Column<ModelType>>
    title: string
    add?: (item: ModelType) => void
    delete: (id: ModelType) => void
    edit: (item: ModelType) => void
}

class CrudPage extends React.PureComponent<CrudPagePropsType, { editable: any }> {
    public state = {
        editable: {}
    }

    componentDidMount() {
        if (this.props.add) {
            this.setState({
                editable: {
                    onRowAdd: (newData: ModelType) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (this.props.add)
                                    this.props.add(newData)
                            }, 600);
                        }),
                    onRowUpdate: (newData: ModelType, oldData: ModelType) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    this.props.edit(newData)
                                }
                            }, 600);
                        }),
                    onRowDelete: (oldData: ModelType) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                this.props.delete(oldData)
                            }, 600);
                        }),
                }
            })
        }
        else {
            this.setState({
                editable: {
                    onRowUpdate: (newData: ModelType, oldData: ModelType) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    this.props.edit(newData)
                                }
                            }, 600);
                        }),
                    onRowDelete: (oldData: ModelType) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                this.props.delete(oldData)
                            }, 600);
                        }),
                }
            })
        }
    }

    public render() {
        return (
            <MaterialTable
                title={this.props.title}
                columns={this.props.columns}
                data={this.props.data}
                options={{
                    actionsColumnIndex: -1,
                    filtering: true,
                }}
                localization={{
                    pagination: {
                        labelDisplayedRows: '{from}-{to} из {count}',
                        labelRowsSelect: "Строк",
                        previousTooltip: "Назад",
                        nextTooltip: "Далее",
                        firstTooltip: "На первую",
                        lastTooltip: "На последнюю"
                    },
                    toolbar: {
                        nRowsSelected: '{0} строк выбрано',
                        searchTooltip: "Поиск",
                        searchPlaceholder: "Поиск"
                    },
                    header: {
                        actions: 'Действия'
                    },
                    body: {
                        emptyDataSourceMessage: 'Данных не обнаружено',
                        filterRow: {
                            filterTooltip: 'Фильровать'
                        },
                        editRow: {
                            deleteText: "Вы уверены, что хотите удалить данную запись ?",
                            cancelTooltip: "Отмена",
                            saveTooltip: "Применить"
                        },
                        addTooltip: "Добавить",
                        deleteTooltip: "Удалить",
                        editTooltip: "Изменить"
                    }
                }}
                editable={this.state.editable}
            />
        )
    }
}
export default CrudPage