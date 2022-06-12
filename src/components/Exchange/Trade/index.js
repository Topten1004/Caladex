

import React from 'react' ;

import TradeSelectBox from './TradeSelectBox';
import MarketTradeList from './MarketTradeList';

import {
    Box ,
    Grid
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root : {
        height : "calc(50vh - 48px)" ,
        borderLeft : "1px solid gray" ,
        borderBottom : "1px solid gray"
    }
}));

const Trade = (props) => {

    const { tradeToken } = props ;
    
    const classes = useStyles() ;

    return (
        <Box component={"div"} className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <TradeSelectBox 
                        tradeToken={tradeToken}
                    />
                </Grid>
                <Grid item xs={12}>
                    <MarketTradeList 
                        tradeToken={tradeToken}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}


export default Trade ;