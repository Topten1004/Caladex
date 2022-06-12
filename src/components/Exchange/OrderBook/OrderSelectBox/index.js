


import React from 'react' ;

import { useState } from 'react' ;

import OrderTypeBt from './OrderTypeBt';

import clsx from 'clsx';

import {
    Box ,
    Grid ,
    MenuItem ,
    FormControl ,
    Select
} from '@mui/material' ;

import  { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles (() => ({
    root : {
        borderBottom : "2px solid lightgray" ,
        height : "43px" ,
        display: "flex" ,
        alignItems : "center" ,
        "& .MuiSvgIcon-root" : {
            marginLeft : "5px" ,
            marginRight : "5px"
        },
    },
    menuItem : {
        padding:"0px !important" , 
        display:"flex !important" ,
        justifyContent : "center !important"
    },
    flexBox : {
        display : "flex" ,
        alignItems : "center"
    },
    orderLabel : {
        justifyContent : "center" ,
        fontWeight : 'bold'
    },
    orderType : {
        justifyContent : "flex-end" ,
    }
}));

const OrderSelectBox = (props) => {

    const classes = useStyles() ;

    const { 
        handleChangeDecimal, handleChangeOrderType
    } = props ;

    const [decimal, setDecimal] = useState(6);
    const [orderType , setOrderType] = useState(3) ;

    const handleChange = (event) => {

        setDecimal(event.target.value) ;
        handleChangeDecimal(event.target.value) ;

        return ;
    };

    return (
        <Box className={classes.root} component={"div"}>
            <Grid container >
                <Grid item xs={6} className={clsx(classes.flexBox , classes.orderLabel)}>
                    Order Book
                </Grid>
                <Grid item xs={6}>
                    <Box component={"div"} className={clsx( classes.flexBox , classes.orderType )}>
                        <OrderTypeBt 
                            orderType={"sell"}
                            handleChangeOrderType={handleChangeOrderType}
                            isChecked={ orderType === 1 }
                            setOrderType={setOrderType}
                        />
                        <OrderTypeBt
                            orderType={"buy"}
                            handleChangeOrderType={handleChangeOrderType}
                            isChecked={ orderType === 2 }
                            setOrderType={setOrderType}
                        />
                        <OrderTypeBt 
                            orderType={"both"}
                            handleChangeOrderType={handleChangeOrderType}
                            isChecked={ orderType === 3 }
                            setOrderType={setOrderType}
                        />
                        <FormControl variant="standard" sx={{marginLeft : "5px"}}>
                            <Select
                                value={decimal}
                                onChange={handleChange}
                                disableUnderline
                            >
                                <MenuItem value={0} className={classes.menuItem}>0</MenuItem>
                                <MenuItem value={1} className={classes.menuItem}>1</MenuItem>
                                <MenuItem value={2} className={classes.menuItem}>2</MenuItem>
                                <MenuItem value={4} className={classes.menuItem}>4</MenuItem>
                                <MenuItem value={6} className={classes.menuItem}>6</MenuItem>
                                <MenuItem value={8} className={classes.menuItem}>8</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default OrderSelectBox ;