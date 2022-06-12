

import React from 'react' ;

import {AdvancedRealTimeChart , } from 'react-ts-tradingview-widgets' ;

import {
    Card ,
    CardContent
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        marginTop : theme.spacing(3) ,
        boxShadow: "3px -4px 7px 0px lightblue !important",
        border : "1px solid lightblue" ,
        height : "415px" ,
    } ,
}));

const TradingWidget = () => {
    
    const classes = useStyles() ;

    return (
        <>
            <Card className={classes.root}>
                <CardContent>
                    <AdvancedRealTimeChart
                        allow_symbol_change={false}
                        symbol="ETH/USDT"
                        locale="en"
                        autosize
                    />
                </CardContent>
            </Card>

        </>
    )
}

export default TradingWidget ;