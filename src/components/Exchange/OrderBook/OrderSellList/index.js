

import React from 'react' ;

// ____________ hook ______________________
import { useState , useEffect } from 'react' ;

// ____________ action and redux _____________
import { connect } from 'react-redux';
import { GetTokenOrderList } from '../../../../redux/actions/trade';

// ___________ style ___________________
import {
    Box ,
    TableContainer,
    Table,
    TableBody,
    TableRow ,
    TableCell
} from "@mui/material" ;

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles((theme) => ({
    root : {

        '&::-webkit-scrollbar': {
            width: '8px',
            backgroundColor : "lightgray",
            borderRadius : "5px"
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'gray',
            borderRadius : "5px"
        },

        overflow : "hidden" ,
        overflowY : "scroll" ,
        height : props => {
            if(props.orderType === 3) return "calc(50vh - 113.815px)" ;
            if(props.orderType === 2) return "0px" ;
            if(props.orderType === 1) return "calc(100vh - 230px)" ;
        },
        borderBottom : "1px solid gray" ,
        borderTop : "1px solid gray" ,

        "& .MuiTableBody-root" : {
            "& .MuiTableRow-root" : {
                position : "relative" ,
            },
            "& .MuiTableCell-root" : {
                padding : "5px" ,
                fontSize : "10px",
                textAlign : "right" ,
                width : "33.33%" ,
                cursor : "pointer"
            }
        },
    },
    progress : {
        position : "absolute" ,
        backgroundColor : "#f9dadb" ,
        left : 0 ,
        top : 0,
        height : "100%" ,
        width : props => `${props.total * 100 / props.max}%`,
        zIndex : "-1000" ,
    },
    price : {
        color : "#c74a4d !important"
    }
}));

const ProgressBar = ( { children, ...props } ) => {

    const classes = useStyles(props) ;

    return (
        <Box component={"td"} className={classes.progress} />
    )
}

let orderSellListTimer ;

const OrderSellList = (props) => {
    
    const { 
        tradeToken , decimal , orderType , tokenId ,
        handleChangePrice , handleChangeStatus ,
        orderSellList , GetTokenOrderList ,
        setMethodType
    } = props ;

    const classes = useStyles({
        orderType : orderType
    }) ;

    const setOrderSellListTimer = async (tradeToken) => {
        clearInterval(orderSellListTimer) ;

        orderSellListTimer = setInterval(async () => {
            await GetTokenOrderList(tradeToken._id , tradeToken.pair_type , "sell") ;
        } , 15000)  
    }
    useEffect(() => {
    } , [orderType]) ;

    const emitEventToMarketing = (price) => {
        setMethodType(1);
        handleChangePrice(price) ;
        handleChangeStatus("buy") ;
    }

    useEffect(async () => {
        if(tradeToken) {
            await GetTokenOrderList(tradeToken._id , tradeToken.pair_type , "sell") ;
            await setOrderSellListTimer(tradeToken) ;
        }
    } , [tradeToken]) ;

    useEffect(() => {
        return () => {
            clearInterval(orderSellListTimer) ;
        }
    } , [])

    return (
        <Box component={"div"} className={classes.root}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableBody>
                        {
                            orderSellList.length !== 0 ? orderSellList.map((item , index) => {
                                return (
                                    <TableRow key={index} onClick={ () => emitEventToMarketing(item.price) }>
                                        <ProgressBar total={Number(item.price)} max={Number(12312.2312)} />
                                        <TableCell className={classes.price}>{Number(item.price).toFixed(decimal)}</TableCell>
                                        <TableCell>{Number(item.amount).toFixed(6)}</TableCell>
                                        <TableCell>{Number(Number(item.price) * Number(item.amount)).toFixed(6)}</TableCell>
                                    </TableRow>
                                )
                            }) : <>
                            </>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}


const mapStateToProps = state => ({
    orderSellList : state.trade.orderSellList
});

const mapDispatchToProps = {
    GetTokenOrderList 
}

export default connect(mapStateToProps , mapDispatchToProps)(OrderSellList) ;