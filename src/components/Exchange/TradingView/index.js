

import React from 'react' ;

import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets' ;

import {
    Box
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        width : "100%" ,
        borderBottom : "1px solid gray" ,
        paddingBottom : "1px" ,
        height : "calc(50vh - 48px)" ,
        minHeight : "calc(50vh - 48px)"
    } ,
}));

const TradingView = () => {
    
    const classes = useStyles() ;

    return (
        <Box component={"div"} className={classes.root}>
            <AdvancedRealTimeChart
                allow_symbol_change={false}
                symbol="ETH/USDT"
                locale="en"
                width={"100%"}
                height={"100%"}
            />
        </Box>
    )
}

export default TradingView ;