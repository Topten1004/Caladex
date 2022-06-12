


import React from 'react' ;

import { useEffect } from 'react' ;

import { connect } from 'react-redux';
import { GetExchangeOrderList } from '../../../../redux/actions/order';

import { formatDBDate } from '../../../../utils/helper' ;

import {
    Box,
    TableContainer,
    Table ,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    CircularProgress
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
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
        maxHeight : "calc(50vh - 145px)" ,
        height : "calc(50vh - 145px)" ,

        "& .MuiTableCell-root" :{
            padding : "0px !important",
            textAlign : "center",
            fontSize : "11px" ,
            fontWeight : "bold"
        }
        
    },
 
}));

let currentOrderTimer ;

const RecentSelectBox = (props) => {
    
    const classes = useStyles() ;

    const {
        tradeToken ,
        exchangeOrderList , GetExchangeOrderList
    } = props ;

    const headFields = [
        "DateTime",
        "Pair" ,
        "Side" ,
        "Price" ,
        "Amount" ,
        "Total"
    ]

    const setCurrentOrderTimer = () => {
        clearInterval(currentOrderTimer) ;

        const currentOrderTimer = setTimeout(async () => {
            // await GetOrderHistory()
        } , 15000) ; 
    }

    useEffect(async () => {
        if(tradeToken) {
            await GetExchangeOrderList("2022-01-01" , new Date().toISOString().substring(0,10),  tradeToken._id , tradeToken.pair_type ) ;
            // await GetOrderHistory

            // await setCurrentOrderTimer()
        }
    } , [tradeToken]) ;

    useEffect(() => {
        return () => {
            clearInterval(currentOrderTimer) ;
        }
    } , [])
    return (
        <Box component={"div"} className={classes.root}>
           <TableContainer>
               <Table>
                   <TableHead>
                       <TableRow>
                            {
                                headFields.map((item , index) => {
                                    return (
                                        <TableCell key={index}>
                                            { item }
                                        </TableCell>
                                    )
                                })
                            }
                       </TableRow>
                   </TableHead>
                   <TableBody>
                       {
                           exchangeOrderList !== "No Available Informations." ? 
                           ( exchangeOrderList.length !== 0 ? exchangeOrderList.map( (row , index) => {
                               return (
                                   <TableRow key={index}>
                                       <TableCell sx={{textAlign : "center !important"}}>{formatDBDate(row.time)}</TableCell>
                                       <TableCell>{row.pair_token}</TableCell>
                                       <TableCell>{row.type}</TableCell>
                                       <TableCell sx={{color : row.type === "sell" ? "#c74a4d" : "#3c868f"}}>{row.price}</TableCell>
                                       <TableCell>{row.amount}</TableCell>
                                       <TableCell>{row.amount*row.price}</TableCell>
                                   </TableRow>
                               )
                           }) : <TableRow>
                               <TableCell colSpan={7} >
                                   <CircularProgress size={20}/>
                               </TableCell>    
                           </TableRow> ) : <TableRow>
                               <TableCell colSpan={7} sx={{ textAlign:"center !important"}}>No Available Information</TableCell>
                           </TableRow> 
                       }
                   </TableBody>
               </Table>
           </TableContainer>
        </Box>
    )
}

const mapStateToProps = state => ({
    exchangeOrderList : state.order.exchangeOrderList
})

const mapDispatchToProps = {
    GetExchangeOrderList
}

export default connect(mapStateToProps , mapDispatchToProps)(RecentSelectBox) ;