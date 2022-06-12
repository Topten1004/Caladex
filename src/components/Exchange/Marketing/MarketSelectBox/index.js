


import React from 'react' ;

import { useState } from 'react' ;

import {
    Box ,
    Grid ,
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        height : "42px" ,
        paddingLeft : "20px" ,
        fontWeight : "bold" ,
        display : "flex" ,
        alignItems : "flex-end" ,
        borderBottom : "2px solid lightgray",
        "& .MuiGrid-root" : {

        },
        "& .MuiGrid-item" :{
            textAlign : "center" ,
            cursor : "grab"
        }
    } ,
    active : {
        borderBottom : "1px solid blue !important"
    }
}));

const MarketSelectBox = (props) => {
    
    const classes = useStyles() ;

    const {
        handleChangePrice ,
        setMethodType ,
        methodType
    } = props ;

    const emitChangeMethodType = async (methodType) => {
        await handleChangePrice(null) ;

        if(methodType === 1) {
            setMethodType(1) ;
        }
        if(methodType === 2) {
            setMethodType(2)
        }
    }

    return (
        <Box component={"div"} className={classes.root}>
            <Grid container>
                <Grid item xs={4} onClick={() => emitChangeMethodType(1)} className={ methodType === 1 ? classes.active : ""}>
                    Limit
                </Grid>
                <Grid item xs={4} onClick={() => emitChangeMethodType(2)} className={ methodType === 2 ? classes.active : ""}>
                    Market
                </Grid>
            </Grid>
        </Box>
    )
}

export default MarketSelectBox ;