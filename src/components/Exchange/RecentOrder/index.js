


import React from 'react' ;

import RecentSelectBox from './RecentSelectBox' ;
import RecentOrderList from './RecentOrderList' ;

import {
    Box,
    Grid
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root : {
        maxHeight : "calc(50vh - 115px)" ,
        height : "calc(50vh - 115px)" ,
    }
}));

const RecentOrder = (props) => {

    const classes = useStyles() ;

    const {
        tradeToken
    } = props ;

    return (
        <Box component={"div"} className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <RecentSelectBox />
                </Grid>
                <Grid item xs={12}>
                    <RecentOrderList 
                        tradeToken={tradeToken}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default RecentOrder ;