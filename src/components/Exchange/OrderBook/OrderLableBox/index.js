


import React, { useEffect } from 'react' ;

import {
    Grid ,
    Box
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        height : "30px",
        display : "flex" ,
        alignItems : "center",
        "& .MuiGrid-item" : {
            color : theme.palette.primary.main ,
            textAlign : "center" ,
            fontSize : "11px" ,
            fontWeight : "bold" ,
            textAlign : "right"
        }
    }
}));

const OrderLableBox = (props) => {

    const { tradeToken } = props ;

    const classes =  useStyles() ;

    useEffect(() => {
        

    } , [tradeToken]) ;
    return (
        <Box component={"div"} className={classes.root}>
            <Grid container>
                <Grid item xs={4}>
                    PRICE({
                        tradeToken ? tradeToken.symbol : "..."
                    })
                </Grid>
                <Grid item xs={4}>
                    AMOUNT({
                        tradeToken ? tradeToken.symbol : "..."
                    })
                </Grid>
                <Grid item xs={4}>
                    TOTAL({
                        tradeToken ? tradeToken.pair_type : "..."
                    })
                </Grid>
            </Grid>
        </Box>
    )
}


export default OrderLableBox ;