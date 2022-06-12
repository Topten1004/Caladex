

import React, { useEffect } from 'react' ;

import { connect } from 'react-redux' ;
import { GetTokenOrderList } from '../../../../redux/actions/trade';

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
            if(props.orderType === 2) return "calc(100vh - 230px)" ;
            if(props.orderType === 1) return "0px" ;
        },
        borderBottom : "1px solid gray" ,
        borderTop : "1px solid gray" ,

        "& .MuiTableBody-root" : {
            "& .MuiTableRow-root" : {
                position : "relative" ,
                cursor : "pointer"
            },
            "& .MuiTableCell-root" : {
                padding : "5px" ,
                fontSize : "10px",
                textAlign : "right" ,
                width : "33.33%"
            }
        },
    },
    progress : {
        position : "absolute" ,
        backgroundColor : "#d7eaea" ,
        left : 0 ,
        top : 0,
        height : "100%" ,
        width : props => `${props.total * 100 / props.max}%`,
        zIndex : "-1000" ,
    },
    price : {
        color : "#3c868f !important"
    }
}));

const ProgressBar = ( { children, ...props } ) => {

    const classes = useStyles(props) ;

    return (
        <Box component={"td"} className={classes.progress} />
    )
}

let orderBuyListTimer ;

const OrderBuyList = (props) => {
    
    const { 
            tradeToken , decimal , orderType ,
            handleChangePrice , handleChangeStatus ,
            orderBuyList , GetTokenOrderList ,
            setMethodType
    } = props ;
    
    const classes = useStyles({
        orderType : orderType
    }) ;

    const emitEventToMarketing = (price) => {
        setMethodType(1);
        handleChangePrice(price) ;
        handleChangeStatus("sell") ;
    }

    const setOrderBuyListTimer = async (tradeToken) => {
        clearInterval(orderBuyListTimer) ;
    
        orderBuyListTimer = setInterval(async () => {
            await GetTokenOrderList(tradeToken._id , tradeToken.pair_type , "buy") ;
        } , 15000) ;
    }

    useEffect(async () => {
        if(tradeToken) {
            await GetTokenOrderList(tradeToken._id , tradeToken.pair_type , "buy") ;

            await setOrderBuyListTimer(tradeToken) ;
        }
    } , [tradeToken]) ;

    useEffect(() => {
        return () => {
            clearInterval(orderBuyListTimer) ;
        }
    } , []) ;
    
    return (
        <Box component={"div"} className={classes.root}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableBody>
                        {
                            orderBuyList.length !== 0 ? orderBuyList.map((item , index) => {
                                return (
                                    <TableRow key={index} onClick={ () => emitEventToMarketing(Number(item.price)) } >
                                        <ProgressBar total={Number(item.total)} max={Number(76548)} />
                                        <TableCell className={classes.price}>{Number(item.price).toFixed(decimal)}</TableCell>
                                        <TableCell>{Number(item.amount).toFixed(6)}</TableCell>
                                        <TableCell>{Number(Number(item.price) * Number(item.amount)).toFixed(6)}</TableCell>
                                    </TableRow>
                                )
                            }) :<>
                            </>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

const mapStateToProps =  state => ({
    orderBuyList : state.trade.orderBuyList
})

const mapDispatchToProps = {
    GetTokenOrderList 
}

export default connect( mapStateToProps , mapDispatchToProps )(OrderBuyList) ;