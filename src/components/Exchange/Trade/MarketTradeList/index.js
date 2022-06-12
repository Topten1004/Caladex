

import React, { useEffect } from 'react' ;

import { connect } from 'react-redux';
import { GetTokenTradeList } from '../../../../redux/actions/trade' ;

import { formatDBDate } from '../../../../utils/helper';

import {
    Box ,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

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

        maxHeight : "calc(50vh - 88px)" ,
        height : "calc(50vh - 88px)" ,
        overflow : "hidden" ,
        overflowY : "scroll" ,
        borderBottom : "1px solid gray" ,
        borderTop : "1px solid gray" ,

        "& .MuiTableCell-root" : {
            padding : "5px" ,
            fontSize : "10px",
            textAlign : "right" ,
        },
        "& .MuiTableHead-root" :{
            "& .MuiTableCell-root" : {
                fontWeight : "bold" ,
                color : theme.palette.primary.main ,
                fontSize : "12px"
            },
        }
    }
}));

let tradeListTimer ;

const MarketTradeList = (props) => {

    const classes = useStyles() ;

    const { tradeToken , GetTokenTradeList , orderTradeList } = props ;

    const headFields = [
        "Time" ,
        "Price" ,
        "Amount" ,
        "Total"
    ]

    const setTradeListTimer = async (tradeToken) => {
        clearInterval(tradeListTimer) ;

        tradeListTimer = setInterval(async () => {
            await GetTokenTradeList(tradeToken._id , tradeToken.pair_type) ;
        } , 15000)
    }
    
    useEffect(() => {
        return () => {
            clearInterval(tradeListTimer) ;
        }
    } , []) ;

    useEffect(async () => {
        if(tradeToken) {
            await GetTokenTradeList(tradeToken._id , tradeToken.pair_type) ;

            await setTradeListTimer(tradeToken) ;
        }
    } , [tradeToken]) ;

    return (
        <Box component={"div"} className={classes.root}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {
                                headFields.map(( field , index ) => {
                                    return (
                                        <TableCell key={index}>
                                            { field }
                                        </TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            orderTradeList.length !== 0 ? orderTradeList.map((item , index) => {
                                return (
                                    <TableRow key={index} >
                                        <TableCell>{ formatDBDate(item.time).substr(11,8) }</TableCell>
                                        <TableCell sx={{ color : item.type === "sell" ? "#c74a4d" : "#3c868f"}}>{item.price}</TableCell>
                                        <TableCell>{item.amount}</TableCell>
                                        <TableCell>{ Number(Number(item.price) * Number(item.amount)).toFixed(4) }</TableCell>
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

const mapStateTopProps = state => ({
    orderTradeList : state.trade.orderTradeList
})

const mapDispatchToProps = {
    GetTokenTradeList
}

export default connect(mapStateTopProps , mapDispatchToProps)(MarketTradeList) ;