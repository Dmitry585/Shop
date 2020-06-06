import * as React from "react";
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { Grid, Card, CardHeader, CardMedia, CardContent, Typography, Box, CardActions, Button } from '@material-ui/core';
import { AlertProps } from "@material-ui/lab/Alert";

import { ProductType } from "../../modelsTypes";
import { addItemInOrder } from "../../store/orders/actions";

import { ConnectedProps, connect } from "react-redux";
import { setSnackbar } from "../../store/snackBar/actions";

const mapDispatch = {
    addItem: (item: ProductType) => addItemInOrder(item),
    openSnack: (text: string, severite?: string) => setSnackbar(text, severite),
}

const connector = connect(null, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type ProductItemOwnProps = {
    item: ProductType
}



const useStyles = ({ }: Theme) => createStyles({
    root: {
        flexDirection: "column",
        width: 345,
        display: "flex",
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    flex: {
        display: "flex",
    },
    grow: {
        flexGrow: 1,
        flexShrink:1
    },
    fullContent: {
        flex: "1"
    },

}
)

type ProductItemStylePropsType = {
    classes: {
        root: string,
        media: string,
        flex: string,
        grow: string,
        fullContent: string
    }
}

type ProductItemPropsType = ProductItemOwnProps & ProductItemStylePropsType & PropsFromRedux

class ProductsItem extends React.PureComponent<ProductItemPropsType, {}> {
    public render() {
        return (
            <Grid className={this.props.classes.flex} item>
                <Card className={this.props.classes.root}>
                    <CardHeader
                        title={
                            <Box className={this.props.classes.flex}>
                                <Typography component="h2" className={this.props.classes.grow}>
                                    {this.props.item.name}
                                </Typography>
                                <Typography component="h1">
                                    {this.props.item.price + "$"}
                                </Typography>
                            </Box>
                        }
                    />
                    <CardMedia
                        image={this.props.item.image}
                        title="Paella dish"
                        className={this.props.classes.media}
                    />
                    <CardContent className={this.props.classes.fullContent}>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {this.props.item.about}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={()=> this.addItem(this.props.item) } disabled={this.props.item.count == 0} fullWidth size="small" color="primary">Купить</Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    }

    private  addItem = async (item: ProductType) => {
        var result = await this.props.addItem(item);
        if ((result as unknown as boolean)) {
            this.props.openSnack("Товар добавлен")
        }
        else {
            this.props.openSnack("Вы достигли лимит товара","error")

        }
        console.log(result)
    }
}
export default connector(withStyles(useStyles)(ProductsItem))
