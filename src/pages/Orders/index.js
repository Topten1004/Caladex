

import React from 'react' ;

import { makeStyles } from '@mui/styles';

import OrdersHistory from '../../components/Orders/OrdersHistory' ;

const useStyles = makeStyles((theme) => ({
    root : {
        marginTop : theme.spacing(4),
        marginLeft : "7%",
        marginRight : "7%" ,
        height : "calc(100vh - 126px)",
    },
}));

const Orders = () => {

    const classes = useStyles() ;

    return (
        <>
            <div className={classes.root}>
               <OrdersHistory />
            </div>
        </>
    )
}

export default Orders ;