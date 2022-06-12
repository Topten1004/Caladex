import React from 'react' ;

import { useEffect , useState} from 'react';
import { useWeb3React } from '@web3-react/core';

import { connect } from 'react-redux';
import { GetOrderTradeHistory } from '../../../redux/actions/order';

import swal from 'sweetalert' ;

import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Grid, 
    useMediaQuery ,
    Box,
    CircularProgress
}   from '@mui/material' ;

import FindInPageIcon from '@mui/icons-material/FindInPage';

import CustomDatePicker from '../CustomDatePicker';

import { makeStyles } from '@mui/styles';

import axios from 'axios';
import { PRIVATE_CALADEX_API } from '../../../static/constants';
import { formatDBDate } from '../../../utils/helper';

const useStyles = makeStyles((theme) => ({
    root : {
        "& .MuiGrid-container" : {
            display : "flex" ,
            alignItems : "center" 
        },
        "& .MuiTableContainer-root" : {
            marginTop : "25px" ,
            border : "1px solid lightgray"
        },
        "& .MuiTableHead-root" : {
            backgroundColor : "#f2f2f2 !important" ,
            "& .MuiTableCell-root" : {
                backgroundColor : "#f2f2f2 !important" ,
                fontSize : "0.625rem" ,
                color : "black",
                fontWeight : "bold" ,
                textAlign : "right" ,
                padding : "5px",
                textAlign : "right"
            }
        },
        "& .MuiTableBody-root" : {
            "& .MuiTableRow-root:nth-child(even)" : {
                backgroundColor : "#f2f2f2 !important"
            },
            "& .MuiTableCell-root" : {
                fontSize : "0.825rem" ,
                color : "black",
                fontWeight : "bold" ,
                textAlign : "right" ,
                padding : "10px",
                textAlign : "right"
            }
        },
        "& .MuiTablePagination-root" : {
            "& .MuiTablePagination-selectLabel" : {
                margin : "0px !important" ,
                fontWeight : "bold"
            },
            "& .MuiTablePagination-displayedRows" : {
                margin : "0px !important" ,
                fontWeight : "bold"
            }
        }
    } ,
    customLabel : {
        color  : "#206bc4" ,
        fontSize : "14px" ,
        fontFamily : "Inter,-apple-system,BlinkMacSystemFont,San Francisco,Segoe UI,Roboto,Helvetica Neue,sans-serif"
    }
}));

let orderHistoryListTimer ;

const OrderHistoryList = (props) => {

    const classes = useStyles() ;

    const { account,  active } = useWeb3React() ;
    const {
        GetOrderTradeHistory ,
        orderTradeHistoryList
    } = props ;

    const isXs = useMediaQuery("(min-width : 800px)") ;
    
    const [ isLoading , setIsLoading ] = useState(false) ;
    const [ symbol , setSymbol ] = useState("") ;
    const [ pair_type , setPairType] = useState("ETH") ;
    const [ start_time , setStartTime ] = useState("2022-01-01") ;
    const [ end_time , setEndTime ] = useState(new Date().toISOString().substring(0,10)) ;
    const [ orderType , setOrderType] = useState("all") ;

    const headFields = [
        "TIME" ,
        "PAIR" ,
        "SIDE" ,
        "PRICE" ,
        "AMOUNT" ,
        "STATUS"
    ]

    const onClickSearch = async () => {
       console.log(symbol , pair_type , start_time , end_time , orderType) ;

       if(symbol === "" || pair_type === "" || start_time === "" || end_time == "" ) {
           swal({
                title : "Warning" ,
                text : "You have to fill in all fields." ,
                icon : "warning" ,
                button : false ,
                timer : 2000
           })

           return ;
       }

       let resId = await axios.post(`${PRIVATE_CALADEX_API}token/getbysymbol` , {
           symbol : symbol
       }) ;

       let token_id = resId.data.data.data._id ;

       GetOrderTradeHistory(account , start_time , end_time , token_id , pair_type , orderType ) ;
    }

    useEffect(() => {
        return () => {
            clearInterval(orderHistoryListTimer) ;
        }
    } , []) ;

    useEffect(async () => {
        if(!isLoading) {
            await GetOrderTradeHistory(account , start_time , end_time)
        }
    } , [isLoading])

    return (
        <div className={classes.root}>
            
            <Grid container>
                <Grid item xs={!isXs ? 12 : 5.5} >
                    <Grid container>
                        <Grid item xs={2} className={classes.customLabel}>
                            Time
                        </Grid>
                        <Grid item xs={4.5} >
                            <CustomDatePicker 
                                setStartTime={setStartTime}
                                id={1}
                            />
                        </Grid>
                        <Grid item xs={1} sx={{display:"flex" , justifyContent : "center"}}>
                            -
                        </Grid>
                        <Grid item xs={4.5} >
                            <CustomDatePicker 
                                setEndTime={setEndTime}
                                id={2}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={!isXs ? 12 : 0.5} sx={{marginTop : isXs ? "0px" : "15px"}}>

                </Grid>

                <Grid item xs={!isXs ? 12 : 2.5} sx={{display:"flex" , justifyContent : "center"}}>
                    <Grid container>
                        <Grid item xs={2} className={classes.customLabel} sx={{textAlign : isXs ? "right" : "left"}}>
                            Pair
                        </Grid>
                        <Grid item xs={4.5}>
                            <Box component={"input"} type="text" className='form-control form-control-sm'  placeholder='Basic Coin' onChange={(e) => setSymbol(e.target.value)}/>
                        </Grid>
                        <Grid item xs={1} sx={{display:"flex" , justifyContent : "center"}}>
                            /
                        </Grid>
                        <Grid item xs={4.5}>
                            {/* <input type="text" className='form-control form-control-sm' placeholder='USDT' onChange={(e) => setPairType(e.target.value)}/> */}
                            <Box component={"select"} className="form-control form-control-sm ml-1" onChange={(e) => setPairType(e.target.value)}>
                                <option value="ETH">ETH</option>
                                <option value="USDT">USDT</option>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={!isXs ? 12 : 3.5} sx={{marginTop : isXs ? "0px" : "15px"}}>
                    <Grid container>
                        <Grid xs={2} item className={classes.customLabel} sx={{textAlign : isXs ? "right" : "left"}}>
                            Side
                        </Grid>
                        <Grid item xs={4.5} sx={{textAlign : isXs ? "center" : "left"}} className={classes.customLabel} >
                            <Box component={"select"} className="form-control form-control-sm ml-1" onChange={(e) => setOrderType(e.target.value)}>
                                <option value="all">ALL</option>
                                <option value="buy">Buy</option>
                                <option value="sell">Sell</option>
                            </Box>
                        </Grid>
                        <Grid item xs={1}>

                        </Grid>
                        <Grid item xs={4.5}>
                            <Box component={"button"} type='button' className='btn btn-primary btn-sm' onClick={() => onClickSearch()}>Search</Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <TableContainer sx={{border : "1px solid red"}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {
                                headFields.map((field, index) => {
                                    return (
                                        <TableCell key={index} sx={{textAlign : index===0 ? "center !important" : ""}}>{field}</TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            orderTradeHistoryList !== "No Available Informations." ? 
                            ( orderTradeHistoryList.length !== 0 ? orderTradeHistoryList.map( (row , index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell sx={{textAlign : "center !important"}}>{formatDBDate(row.time)}</TableCell>
                                        <TableCell>{row.pair_token}</TableCell>
                                        <TableCell>{row.type}</TableCell>
                                        <TableCell>{row.price}</TableCell>
                                        <TableCell>{row.amount}</TableCell>
                                        <TableCell>{row.is_traded ? "Traded" : "On Order"}</TableCell>
                                    </TableRow>
                                )
                            }) : <TableRow>
                                <TableCell colSpan={6} sx={{textAlign : "center !important"}}>
                                    <CircularProgress />
                                </TableCell>    
                            </TableRow> ) : <TableRow>
                                <TableCell colSpan={6} sx={{ textAlign:"center !important"}}>No Available Information</TableCell>
                            </TableRow> 
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

const mapStateToProps = state => ({
    orderTradeHistoryList : state.order.orderTradeHistoryList
})

const mapDispatchToProps = {
    GetOrderTradeHistory
}

export default connect(mapStateToProps , mapDispatchToProps)(OrderHistoryList) ;