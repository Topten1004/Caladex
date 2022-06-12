



import React from 'react' ;

import { useState } from 'react' ;

import {
    Box
} from '@mui/material' ;

import OrderSelectBox from './OrderSelectBox';
import OrderLableBox  from './OrderLableBox';
import OrderSellList from './OrderSellList';
import PriceMean from './PriceMean' ;
import OrderBuyList from './OrderBuyList';

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles(() => ({
    root : {
        paddingLeft : "5px" ,
        paddingRight : "5px" ,
        borderRight : "1px solid gray" ,
        borderLeft : "1px solid lightgray" ,
        borderBottom : "1px solid gray" ,
        minHeight : "calc(100vh - 121px)" ,
    }
}));

const OrderBook = (props) => {
    
    const { 
        tradeToken , tokenId , 
        handleChangePrice , handleChangeStatus  ,
        setMethodType
    } = props ;

    const [ decimal , handleChangeDecimal ] = useState(6) ;
    const [ orderType , handleChangeOrderType ] = useState(3) ;

    const classes = useStyles() ;

    return (
        <Box component={"div"} className={classes.root}>
            
            <OrderSelectBox 
                handleChangeDecimal={handleChangeDecimal}
                handleChangeOrderType={handleChangeOrderType}
            />

            <OrderLableBox 
                tradeToken={ tradeToken }
            />
            
            <OrderSellList 
                tradeToken={ tradeToken }
                decimal={decimal}
                orderType={orderType}
                handleChangePrice={handleChangePrice}
                handleChangeStatus={handleChangeStatus}
                setMethodType={setMethodType}
            />

            <PriceMean />

            <OrderBuyList 
                tradeToken={ tradeToken }
                decimal={decimal}
                orderType={orderType}
                handleChangePrice={handleChangePrice}
                handleChangeStatus={handleChangeStatus}
                setMethodType={setMethodType}
            />

        </Box>
    )
}


export default OrderBook ;