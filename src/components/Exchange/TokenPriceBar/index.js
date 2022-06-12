import * as React from 'react';

import {
    Card ,
    CardContent ,

} from '@mui/material' ;

import { TickerTape } from 'react-ts-tradingview-widgets' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        marginTop : theme.spacing(5) ,
        boxShadow: "3px -4px 7px 0px lightblue !important",
        border : "1px solid lightblue !important" ,
        "& .js-copyright-label" : {
            visibility : "hidden !important",
        }
    } ,
}));

const TokenPriceTable = () => {
    const classes = useStyles() ;

    return (
        <Card className={classes.root}>
            <CardContent >
               <TickerTape locale="en"/>
            </CardContent>
        </Card>
       
    );
}

export default TokenPriceTable ;