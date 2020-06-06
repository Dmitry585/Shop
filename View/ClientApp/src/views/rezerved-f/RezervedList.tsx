import * as React from "react";
import { ApplicationState } from "../../store";
import { connect, ConnectedProps } from "react-redux";
import { OrderItemType, ModelType, RezervationType } from "../../modelsTypes";
import MaterialTable, { Column, MaterialTableProps } from "material-table";
import { rezervations } from "../../store/orders/selectors";
import { getRezervation } from "../../store/orders/actions";

const mapStateToProps = (state: ApplicationState) => {
    return {
        rezervations: rezervations(state)
    }
}

const mapDispatch = {
    getRezervation: () => getRezervation()
}

const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>


type RezerveListdPropsType = PropsFromRedux

class RezervedList extends React.PureComponent<RezerveListdPropsType, { columns: Array<Column<OrderItemType>> }> {
    public state = {
        columns: [
            {
                title: 'Номер',
                field: 'rezervationId',
            },
            {
                title: 'ФИО',
                field: 'personName',
            },
            {
                title: 'Человек',
                field: 'table.maxPerson',
            },
            {
                title: 'Дата',
                field: 'rezervationDate',
            },
        ]
    }

    async componentDidMount() {
        if (this.props.rezervations.length == 0)
            await this.props.getRezervation()
        console.log(this.props.rezervations)
    }

    public render() {
        return (
            <div style={{ padding: 20 }}>
                <MaterialTable
                    title="Список резервирования"
                    columns={this.state.columns}
                    data={this.props.rezervations}
                    options={{
                        filtering: true,
                    }}
                    detailPanel={rowData => {
                        var columns: Array<Column<OrderItemType>> =
                            [
                                {
                                    title: 'Номер',
                                    field: 'id',
                                },
                                {
                                    title: 'Наименование',
                                    field: 'product.name',
                                },
                                {
                                    title: 'Количество',
                                    field: 'count',
                                },
                            ]
                        return (<div style={{ padding: 20 }}>
                            <MaterialTable
                                title="Товары"
                                columns={columns}
                                data={rowData.items}
                                options={{
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
                                    body: {
                                        emptyDataSourceMessage: 'Данных не обнаружено',
                                        filterRow: {
                                            filterTooltip: 'Фильровать'
                                        },
                                    }
                                }}
                            />
                        </div>

                        )
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
                        body: {
                            emptyDataSourceMessage: 'Данных не обнаружено',
                            filterRow: {
                                filterTooltip: 'Фильровать'
                            },
                        }
                    }}
                />
            </div>
        )
    }

}
export default connector(RezervedList)
