import * as React from "react";
import { Paper, withStyles, Theme, createStyles, TextField, Grid, MenuItem, Typography, Button } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import { ApplicationState } from "../../store";
import { currentOrder } from "../../store/orders/selectors";
import { connect, ConnectedProps } from "react-redux";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import CrudPage from "../../components/crud-f/CrudPage";
import { Column } from "material-table";
import { OrderItemType, ModelType, RezervationType } from "../../modelsTypes";
import { productForCombobox, products } from "../../store/products/selectors";
import { init } from "../../store/products/actions";
import { editItemOrder, removeItemFromOrder, editDate, editTable, editName, sendRezervation } from "../../store/orders/actions";
import { tablesForCombobox } from "../../store/table/selectors";
import { getTable } from "../../store/table/actions";

const mapStateToProps = (state: ApplicationState) => {
    return {
        currentOrder: currentOrder(state),
        productForCombobox: productForCombobox(state),
        products: products(state),
        tables: tablesForCombobox(state)
    }
}

const mapDispatch = {
    getProducts: () => init(),
    getTables: () => getTable(),
    edit: (item: OrderItemType) => editItemOrder(item),
    delete: (id: number) => removeItemFromOrder(id),
    editDate: (date: Date) => editDate(date),
    editTable: (id: number) => editTable(id),
    editName: (name: string) => editName(name),
    rezerv: () => sendRezervation()
}

const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

const useStyles = ({ spacing }: Theme) => createStyles({
    grow: {
        flexGrow: 1,
    },
    textField: {
        marginLeft: spacing(1),
        marginRight: spacing(2),
        marginBottom: spacing(1)
    },
}
)

type RezerverStylePropsType = {
    classes: {
        grow: string,
        textField: string
    }
}

type RezervedPropsType = PropsFromRedux & RezerverStylePropsType

class Rezerved extends React.PureComponent<RezervedPropsType, { columns: Array<Column<OrderItemType>> }> {
    public state = {
        columns: [
            {
                title: 'Продукт',
                field: 'productId',
                render: (value: any) => <span >{value.product.name}</span>,
                customFilterAndSearch: (term: string, rowData: any) => rowData.product.name.includes(term),
                editComponent: (props: any) => (
                    <TextField
                        value={props.value.productId}
                        select
                        fullWidth
                        onChange={e => {
                            var item = this.props.products.filter(x => x.productId == +e.target.value)[0]
                            props.onChange(item)
                        }}
                    >
                        {
                            Object.keys(this.props.productForCombobox).filter(x => {
                                let item = this.props.currentOrder.items.filter(it => it.product.productId == +x)
                                if (item.length == 0) return true
                                if (item[0].product.productId == props.value.productId) return true
                                return false
                            })
                                .map(item =>
                                    <MenuItem key={item} value={item}>
                                        {this.props.productForCombobox[+item]}
                                    </MenuItem>)
                        }
                    </TextField>
                )
            },
            {
                title: 'Количество',
                field: 'count',
                editComponent: (props: any) => (
                    <TextField
                        type="number"
                        fullWidth
                        InputProps={{ inputProps: { min: 1, max: props.rowData.product.count } }}
                        value={props.value}
                        onChange={e => { props.onChange(e.target.value) }}
                    />
                )
            },
            {
                title: 'Цена',
                field: 'product.price',
                editable: "never" as "never"
            },

        ]
    }

    async componentDidMount() {
        if (Object.keys(this.props.productForCombobox).length == 0) {
            await this.props.getProducts()
        }
        if (this.props.tables.length == 1) {
            await this.props.getTables();
        }
    }

    public render() {
        return (
            <div style={{ padding: 20 }}>
                <Paper className={this.props.classes.grow}>
                    <Grid container>
                        <Grid container item xs={11} justify="center">
                            <h1>Оформление заказа</h1>
                        </Grid>
                        <Grid container justify="center" direction="row" spacing={2}>
                            <Grid item xs={11} md={5}>
                                <TextField autoFocus fullWidth value={this.props.currentOrder.personName} onChange={this.handelNameChange} className={this.props.classes.textField} label="Имя" />
                            </Grid>
                            <Grid item xs={11} md={5}>
                                <DateTimePicker
                                    autoOk
                                    fullWidth
                                    minDate={new Date()}
                                    maxDate={new Date().setDate(new Date().getDate() + 7)}
                                    format="yyyy/MM/dd HH:mm"
                                    ampm={false}
                                    variant="inline"
                                    label="Время резервирования"
                                    onChange={this.handleDateChange}
                                    value={this.props.currentOrder.rezervationDate}
                                    className={this.props.classes.textField}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid container justify="center" direction="row" spacing={2}>
                                <Grid item xs={11} md={10}>
                                    <TextField select value={this.props.currentOrder.tableId} onChange={this.handleTableChange} fullWidth className={this.props.classes.textField} label="Стол" >
                                        {
                                            this.props.tables.map(item =>
                                                <MenuItem key={item.tableId} value={item.tableId}>
                                                    ({item.maxPerson == 0 ? "Не указывать" : " Стол " + item.maxPerson + " человек"}) 
                                                </MenuItem>)
                                        }
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid container justify="center" direction="row" spacing={2}>
                                <Grid item xs={10}>
                                    <CrudPage title="Товары" columns={this.state.columns} data={this.props.currentOrder.items} delete={this.delete} edit={this.edit} />
                                </Grid>
                                <Grid item xs={10}>
                                    {
                                        this.props.currentOrder.items.length != 0 &&
                                        <Typography>
                                            <span>Сумма: </span>
                                            <span>
                                                {
                                                    this.props.currentOrder.items.reduce(function (acc, obj) {
                                                        acc += +obj.product.price * +obj.count
                                                        return acc
                                                    }, 0)
                                                }
                                            </span>
                                        </Typography>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                        {
                            this.props.currentOrder.items.length != 0 &&
                            <Grid container>
                                <Grid container justify="center" direction="row" spacing={2}>
                                    <Grid item xs={10}>
                                        <Button color="secondary" onClick={this.send} fullWidth>Заказать</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        }

                    </Grid>
                </Paper>
            </div>
        )
    }


    public delete = (item: ModelType) => {
        var ordItem = item as OrderItemType
        this.props.delete(ordItem.id)
    }

    public edit = (item: ModelType) => {
        var ordItem = item as OrderItemType
        if (ordItem.count > ordItem.product.count) ordItem.count = ordItem.product.count
        if (ordItem.count <= 0) ordItem.count = 1
        this.props.edit(ordItem)
    }

    private handleDateChange = (date: MaterialUiPickersDate) => {
        this.props.editDate(date as Date)
    }

    private send = async () => {
        await this.props.rezerv();
        await this.props.getProducts();
    }

    private handleTableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.editTable(+e.target.value)
    }
    private handelNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.editName(e.target.value)
    }

}
export default withStyles(useStyles)(connector(Rezerved))
    ;